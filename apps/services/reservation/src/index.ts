// apps/reservation/src/index.ts
import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { KafkaProducer } from '@ce-lab-mgmt/infrastructure'
// apps/reservation/src/config/env.ts
import { PrismaUnitOfWork } from 'shared/infrastructure/src/persistence'
import { KafkaConfig } from 'kafkajs'
import { ReservationController } from './app/http/reservation.controller'
import { ReservationRepository } from './domain/repository/reservation.repository'
import { ReservationService } from './domain/services/reservation.service'

// Initialize Kafka config
const kafkaConfig: KafkaConfig = {
  clientId: 'reservation-service',
  brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092']
}

// Initialize dependencies
const unitOfWork = new PrismaUnitOfWork()
const kafkaProducer = new KafkaProducer(kafkaConfig)
const reservationRepo = new ReservationRepository()

// Initialize service
const reservationService = new ReservationService(
  reservationRepo,
  kafkaProducer,
  unitOfWork
)

// Initialize controller
const reservationController = new ReservationController(reservationService)

// Create Elysia app
const app = new Elysia()
  .use(swagger({
    path: '/docs',
    documentation: {
      info: {
        title: 'Reservation Service API',
        version: '1.0.0'
      }
    }
  }))
  .use(cors())
  .get('/', () => ({ message: 'Reservation service is running' }))
  .group('/api/v1', app => app.use(reservationController.getApp()))
  .onError(({ code, error, set }) => {
    console.error(`Error occurred: ${code}`, error)
    // consolr
    set.status = code === 'NOT_FOUND' ? 404 : 
                 code === 'VALIDATION' ? 400 : 500
                //  code === 'INVALID_COOKIE_SIGNATURE' ? 401 : 500

    return {
      success: false,
      error: {
        code,
        message: error.message
      }
    }
  })
  .onStart(async () => {
    try {
      // Connect to Kafka
      await kafkaProducer.connect()
      console.log('✅ Kafka connected')
    } catch (error) {
      console.error('Failed to connect to Kafka:', error)
      process.exit(1)
    }
  })
  .onStop(async () => {
    try {
      await kafkaProducer.disconnect()
      console.log('Kafka disconnected')
    } catch (error) {
      console.error('Error during shutdown:', error)
    }
  })
  .listen(process.env.PORT || 3000)

console.log(
  `🚀 Reservation service is running at ${app.server?.hostname}:${app.server?.port}`
)

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down...')
  await app.stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down...')
  await app.stop()
  process.exit(0)
})

// Export for testing
export type App = typeof app
export { app }



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
