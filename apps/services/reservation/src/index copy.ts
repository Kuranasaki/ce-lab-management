// import { Elysia } from 'elysia'
// import { MongoClient, ObjectId } from 'mongodb'
// import amqp from 'amqplib'
// import { BaseResponse, Error } from '@ce-lab-mgmt/api-interfaces'
// import {
//   GetAllReservationSchema,
//   GetReservationSchema,
//   RequestReservationFormSchema,
//   PricingDataSchema
// } from '@ce-lab-mgmt/api-interfaces'

// // MongoDB connection
// const MONGO_URL = process.env.RESV_MONGO_URI || 'mongodb://localhost:27017'
// console.log(MONGO_URL)
// const MONGO_DB = process.env.MONGO_DB || 'ce-lab'
// const AMQP_URL = process.env.AMQP_URL || 'amqp://localhost'
// console.log(AMQP_URL)

// class ReservationService {
//   private db!: MongoClient
//   private channel!: amqp.Channel

//   constructor() {
//     this.initializeConnections()
//   }

//   private async initializeConnections() {
//     // Initialize MongoDB
//     this.db = await MongoClient.connect(MONGO_URL)
//     const database = this.db.db(MONGO_DB)

//     // Initialize AMQP
//     const connection = await amqp.connect(AMQP_URL)
//     this.channel = await connection.createChannel()
//     await this.channel.assertQueue('reservation_requests')

//     // Start consuming messages
//     this.channel.consume('reservation_requests', async (msg) => {
//       if (msg) {
//         const reservationData = JSON.parse(msg.content.toString())
//         await this.createReservation(reservationData)
//         this.channel.ack(msg)
//       }
//     })
//   }

//   private async calculatePrice(testInfo: any): Promise<number> {
//     const database = this.db.db(MONGO_DB)
//     const pricingCollection = database.collection('pricing')
//     let totalPrice = 0

//     for (const test of testInfo.testList) {
//       const pricingItem = await pricingCollection.findOne({ id: test.testID })
//       if (pricingItem) {
//         const pricing = pricingItem.pricing[0] // Assuming first pricing tier
//         totalPrice += pricing.price * test.testAmount
//       }
//     }

//     return totalPrice
//   }

//   async createReservation(data: any): Promise<BaseResponse<{ reservationID: string }>> {
//     try {
//       const database = this.db.db(MONGO_DB)
//       const collection = database.collection('reservations')

//       // Calculate total price
//       const totalPrice = await this.calculatePrice(data.testInfo)

//       const reservation = {
//         ...data,
//         Status: 'pending',
//         CreatedOn: new Date(),
//         totalPrice,
//       }

//       const result = await collection.insertOne(reservation)

//       return new BaseResponse({
//         data: { reservationID: result.insertedId.toString() }
//       })
//     } catch (error) {
//       return new BaseResponse({
//         error: new Error(500)
//       })
//     }
//   }

//   async getReservation(id: string): Promise<BaseResponse<typeof GetReservationSchema._type>> {
//     try {
//       const database = this.db.db(MONGO_DB)
//       const collection = database.collection('reservations')

//       const reservation = await collection.findOne({ _id: new ObjectId(id) })

//       if (!reservation) {
//         return new BaseResponse({ error: new Error(404) })
//       }

//       return new BaseResponse({ data: reservation })
//     } catch (error) {
//       return new BaseResponse({ error: new Error(500) })
//     }
//   }

//   async getAllReservations(): Promise<BaseResponse<typeof GetAllReservationSchema._type>> {
//     try {
//       const database = this.db.db(MONGO_DB)
//       const collection = database.collection('reservations')

//       const reservations = await collection.find({}).toArray()

//       return new BaseResponse({ data: reservations })
//     } catch (error) {
//       return new BaseResponse({ error: new Error(500) })
//     }
//   }

//   async updateReservation(id: string, data: any): Promise<BaseResponse<null>> {
//     try {
//       const database = this.db.db(MONGO_DB)
//       const collection = database.collection('reservations')

//       const result = await collection.updateOne(
//         { _id: new ObjectId(id) },
//         { $set: data }
//       )

//       if (result.matchedCount === 0) {
//         return new BaseResponse({ error: new Error(404) })
//       }

//       return new BaseResponse({ data: null })
//     } catch (error) {
//       return new BaseResponse({ error: new Error(500) })
//     }
//   }

//   async deleteReservation(id: string): Promise<BaseResponse<null>> {
//     try {
//       const database = this.db.db(MONGO_DB)
//       const collection = database.collection('reservations')

//       const result = await collection.deleteOne({ _id: new ObjectId(id) })

//       if (result.deletedCount === 0) {
//         return new BaseResponse({ error: new Error(404) })
//       }

//       return new BaseResponse({ data: null })
//     } catch (error) {
//       return new BaseResponse({ error: new Error(500) })
//     }
//   }
// }

// // Create Elysia app with the service
// const reservationService = new ReservationService()

// const app = new Elysia()
//   .post('/reservations', async ({ body }) => {
//     return await reservationService.createReservation(body)
//   }, {
//     body: RequestReservationFormSchema
//   })
//   .get('/reservations/:id', async ({ params: { id } }) => {
//     return await reservationService.getReservation(id)
//   })
//   .get('/reservations', async () => {
//     return await reservationService.getAllReservations()
//   })
//   .put('/reservations/:id', async ({ params: { id }, body }) => {
//     return await reservationService.updateReservation(id, body)
//   })
//   .delete('/reservations/:id', async ({ params: { id } }) => {
//     return await reservationService.deleteReservation(id)
//   })

// export default app
