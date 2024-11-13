// apps/reservation/src/index.ts
import { KafkaProducer } from '@ce-lab-mgmt/infrastructure';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia, t } from 'elysia';
// apps/reservation/src/config/env.ts
import {
  BaseResponse,
  BaseResponseSchemaFn,
  GetAllReservationSchema,
  GetReservationResponse,
  GetReservationResponseSchema,
  RequestReservationFormSchema,
  ReservationQuerySchema,
} from '@ce-lab-mgmt/api-interfaces';
import { createAuthMiddleware } from '@ce-lab-mgmt/infrastructure';
import { KafkaConfig } from 'kafkajs';
import { PrismaUnitOfWork } from 'shared/infrastructure/src/persistence';
import { UpdateReservationSchema } from './app/http/reservation.schema';
import { ReservationRepository } from './domain/repository/reservation.repository';
import { ReservationService } from './domain/services/reservation.service';

// Initialize Kafka config
const kafkaConfig: KafkaConfig = {
  clientId: 'reservation-service',
  brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
};

// Initialize dependencies
const unitOfWork = new PrismaUnitOfWork();
const kafkaProducer = new KafkaProducer(kafkaConfig);
const reservationRepo = new ReservationRepository();

// Initialize service
const reservationService = new ReservationService(
  reservationRepo,
  kafkaProducer,
  unitOfWork
);

// Initialize controller
class UserData {
  uid: string;
  roles: string[];
  constructor() {
    this.uid = '';
    this.roles = [];
  }
}
// Create Elysia app
const app = new Elysia()
  .use(
    swagger({
      path: '/docs',
      documentation: {
        info: {
          title: 'Reservation Service API',
          version: '1.0.0',
        },
      },
    })
  )
  .use(cors())
  .get('/', () => ({ message: 'Reservation service is running' }))
  .group('/api/v1', (app) =>
    app.group('/reservations', (app) =>
      app.decorate('userData', new UserData()).guard(
        {
          beforeHandle: [createAuthMiddleware(['customer'])],
        },
        (app) =>
          app
            .get(
              '/',
              async ({ userData, query, headers, set }) => {
                const result = await reservationService.getReservations({
                  customerId: userData.uid,
                  page: query.page || 1,
                  limit: query.limit || 10,
                  status: query.status,
                  fromDate: query.fromDate
                    ? new Date(query.fromDate)
                    : undefined,
                  toDate: query.toDate ? new Date(query.toDate) : undefined,
                });
                return {
                  success: result.isSuccess,
                  data: result.value.items.map((r) => r.self),

                  error: result.isFailure ? result.error : undefined,
                };
              },
              {
                query: ReservationQuerySchema,
                response: BaseResponseSchemaFn(GetAllReservationSchema),
              }
            )
            .get(
              '/:id',
              async ({ userData, params }) => {
                const result = await reservationService.getReservation(
                  params.id,
                  userData.uid
                );

                const response = {
                  success: true,
                  data: {
                    reservationID: result.value.self.id,
                    orgInfo: result.value.orgData,
                    testInfo: result.value.testList,
                    status: result.value.self.status,
                    totalPrice: result.value.self.totalPrice,
                    createdOn: result.value.createdAt,
                  },
                } as BaseResponse<GetReservationResponse>;
                return response;
              },
              {
                params: t.Object({
                  id: t.String({ format: 'uuid' }),
                }),
                response: BaseResponseSchemaFn(GetReservationResponseSchema),
              }
            )
            .post(
              '/',
              async ({ userData, body, headers, set }) => {
                const result = await reservationService.createReservation(
                  { uid: userData.uid },
                  body
                );
                return {
                  success: result.isSuccess,
                  data: result.value.self,

                  error: result.isFailure ? result.error : undefined,
                };
              },
              {
                body: RequestReservationFormSchema,
              }
            )
            .patch(
              '/:id',
              async ({ userData, body, params, set }) => {
                const uid = userData.uid;
                const result = await reservationService.updateReservation(
                  params.id,
                  uid,
                  body
                );
                return {
                  success: result.isSuccess,
                  data: result.value.self,

                  error: result.isFailure ? result.error : undefined,
                };
              },
              {
                params: t.Object({
                  id: t.String({ format: 'uuid' }),
                }),
                body: UpdateReservationSchema,
              }
            )
      )
    )
  )
  .onError(({ code, error, set }) => {
    console.error(`Error occurred: ${code}`, error);
    // consolr
    set.status = code === 'NOT_FOUND' ? 404 : code === 'VALIDATION' ? 400 : 500;
    //  code === 'INVALID_COOKIE_SIGNATURE' ? 401 : 500

    return {
      success: false,
      error: {
        code,
        message: error.message,
      },
    };
  })
  .onStart(async () => {
    try {
      // Connect to Kafka
      await kafkaProducer.connect();
      console.log('✅ Kafka connected');
    } catch (error) {
      console.error('Failed to connect to Kafka:', error);
      process.exit(1);
    }
  })
  .onStop(async () => {
    try {
      await kafkaProducer.disconnect();
      console.log('Kafka disconnected');
    } catch (error) {
      console.error('Error during shutdown:', error);
    }
  })
  .use(cors())
  .listen(process.env.PORT || 3000);

console.log(
  `🚀 Reservation service is running at ${app.server?.hostname}:${app.server?.port}`
);

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down...');
  await app.stop();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down...');
  await app.stop();
  process.exit(0);
});

// Export for testing
export type App = typeof app;
export { app };

// const envSchema = z.object({
//   NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
//   PORT: z.string().transform(Number).default('3000'),
//   DATABASE_URL: z.string(),
//   KAFKA_BROKERS: z.string(),
//   // Add other environment variables as needed
// })

// export const validateEnv = () => {
//   const parsed = envSchema.safeParse(process.env)

//   if (!parsed.success) {
//     console.error('❌ Invalid environment variables:', parsed.error.format())
//     process.exit(1)
//   }

//   return parsed.data
// }
