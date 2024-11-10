import { Elysia } from 'elysia';
import { MongoClient, ObjectId } from 'mongodb';
import amqp from 'amqplib';
import { BaseResponse, Error } from '@ce-lab-mgmt/api-interfaces';
import {
  GetAllReservationSchema,
  GetReservationSchema,
  RequestReservationFormSchema,
  PricingDataSchema,
} from '@ce-lab-mgmt/api-interfaces';
import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';

// MongoDB connection
const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'ce-lab';
const AMQP_URL = process.env.AMQP_URL || 'amqp://localhost';

class ReservationService {
  private db!: MongoClient;
  private channel!: amqp.Channel;

  constructor() {
    this.initializeConnections();
  }

  private async initializeConnections() {
    // Initialize MongoDB
    this.db = await MongoClient.connect(MONGO_URL);
    const database = this.db.db(MONGO_DB);

    // Initialize AMQP
    const connection = await amqp.connect(AMQP_URL);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue('reservation_requests');

    // Start consuming messages
    this.channel.consume('reservation_requests', async (msg) => {
      if (msg) {
        const reservationData = JSON.parse(msg.content.toString());
        console.log('Received reservation request:', reservationData);
        await this.createReservation(reservationData);
        this.channel.ack(msg);
      }
    });
  }

  private async calculatePrice(testInfo: any): Promise<number> {
    const database = this.db.db(MONGO_DB);
    const pricingCollection = database.collection('pricing');
    let totalPrice = 0;

    for (const test of testInfo.testList) {
      const pricingItem = await pricingCollection.findOne({ id: test.testID });
      if (pricingItem) {
        const pricing = pricingItem.pricing[0]; // Assuming first pricing tier
        totalPrice += pricing.price * test.testAmount;
      }
    }

    return totalPrice;
  }

  async createReservation(
    data: any
  ): Promise<BaseResponse<{ reservationID: string }>> {
    try {
      const database = this.db.db(MONGO_DB);
      const collection = database.collection('reservations');
      console.log(data);

      // Calculate total price
      const totalPrice = await this.calculatePrice(data.testInfo);

      const reservation = {
        ...data,
        testInfo: {
          ...data.testInfo,
          testList: data.testInfo.testList.map((test: any) => ({
            ...test,
            testID: new ObjectId(),
          })),
        },
        Status: 'pending',
        CreatedOn: new Date(),
        totalPrice,
      };
      console.log(reservation);
      const result = await collection.insertOne(reservation);

      return new BaseResponse({
        data: { reservationID: result.insertedId.toString() },
      });
    } catch (error) {
      return new BaseResponse({
        error: new Error(500),
      });
    }
  }

  async getReservation(
    id: string
  ): Promise<BaseResponse<typeof GetReservationSchema._type>> {
    try {
      const database = this.db.db(MONGO_DB);
      const collection = database.collection('reservations');

      if (!ObjectId.isValid(id)) {
        return new BaseResponse({ error: new Error(400) });
      }

      const reservation = await collection.findOne({ _id: new ObjectId(id) });

      if (!reservation) {
        return new BaseResponse({ error: new Error(404) });
      }

      const formattedReservation = {
        id: reservation._id.toString(),
        orgInfo: reservation.orgInfo,
        testInfo: reservation.testInfo,
        Status: reservation.Status,
        totalPrice: reservation.totalPrice,
        CreatedOn: reservation.CreatedOn,
      };

      return new BaseResponse({ data: formattedReservation });
    } catch (error: any) {
      console.log(error.message);
      return new BaseResponse({ error: new Error(500) });
    }
  }

  async getAllReservations(): Promise<
    BaseResponse<typeof GetAllReservationSchema._type>
  > {
    try {
      const database = this.db.db(MONGO_DB);
      const collection = database.collection('reservations');

      const reservations = await collection.find({}).toArray();
      const formattedReservations = reservations.map((reservation) => ({
        id: reservation._id.toString(),
        orgInfo: reservation.orgInfo,
        testInfo: {
          ...reservation.testInfo,
          testList: reservation.testInfo.testList.map((test: any) => ({
            ...test,
            testID: test.testID.toString(),
          })),
        },
        Status: reservation.Status,
        CreatedOn: reservation.CreatedOn,
        totalPrice: reservation.totalPrice,
      }));

      console.log(formattedReservations);
      return new BaseResponse({ data: formattedReservations });
    } catch (error) {
      return new BaseResponse({ error: new Error(500) });
    }
  }

  async updateReservation(id: string, data: any): Promise<BaseResponse<null>> {
    try {
      const database = this.db.db(MONGO_DB);
      const collection = database.collection('reservations');

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );

      if (result.matchedCount === 0) {
        return new BaseResponse({ error: new Error(404) });
      }

      return new BaseResponse({ data: null });
    } catch (error) {
      return new BaseResponse({ error: new Error(500) });
    }
  }

  async deleteReservation(id: string): Promise<BaseResponse<null>> {
    try {
      const database = this.db.db(MONGO_DB);
      const collection = database.collection('reservations');

      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return new BaseResponse({ error: new Error(404) });
      }

      return new BaseResponse({ data: null });
    } catch (error) {
      return new BaseResponse({ error: new Error(500) });
    }
  }
}

// Create Elysia app with the service
const reservationService = new ReservationService();

const app = new Elysia()
  .post(
    '/reservations',
    async ({ body }) => {
      return await reservationService.createReservation(body);
    },
    {
      body: RequestReservationFormSchema,
    }
  )
  .get('/reservations/:id', async ({ params: { id } }) => {
    return (await reservationService.getReservation(id)).toJSON();
  })
  .get('/reservations', async () => {
    return (await reservationService.getAllReservations()).toJSON();
  })
  .put('/reservations/:id', async ({ params: { id }, body }) => {
    return (await reservationService.updateReservation(id, body)).toJSON();
  })
  .delete('/reservations/:id', async ({ params: { id } }) => {
    return (await reservationService.deleteReservation(id)).toJSON();
  })
  .use(cors())
  .use(
    swagger({
      provider: 'scalar',
      path: '/swagger',
      documentation: {
        info: {
          title: 'CE Lab API Documentation',
          version: '1.0.0',
        },
        tags: [{ name: 'Pricing', description: 'Pricing endpoints' }],
      },
    })
  )
  .listen(3000)
  .use(cors());

export default app;

export type ReservationServiceType = typeof app;
