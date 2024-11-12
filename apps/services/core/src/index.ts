import { Elysia } from 'elysia';
import { KafkaConsumer, KafkaProducer, MongoService } from '@ce-lab-mgmt/infrastructure';
// import { ExperimentOrderController } from './experiment-order.controller';
import { ExperimentOrderService } from './domain/services/order.service';
import { ExperimentOrderRepository } from './domain/repositories/order.repository';
import { ReservationEventHandler } from './app/messages/reservation.handler';
import { KafkaConfig } from 'kafkajs';

async function createKafkaProducer(): Promise<[KafkaProducer, KafkaConsumer]> {
  const kafkaConfig: KafkaConfig = {
    clientId: 'celab-service',
    brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092']
  }

  const producer = new KafkaProducer(kafkaConfig, console);
  const consumer = new KafkaConsumer(
    kafkaConfig,
    'laboratory-testing-group',
    console
  );
  const result = await Promise.all([producer.connect(), consumer.connect()]);

  result.forEach((r) => {
    if (r.isFailure) {
      throw r.error;
    }
  })
  // return [producer, null];
  return [producer, consumer];
}

async function bootstrap() {
  try {
    // Initialize Logger
    const logger = console;

    await MongoService.connect(process.env.MONGODB_URI ?? '', process.env.MONGO_DB ?? '');

    // Initialize infrastructure
    const experimentRepository = new ExperimentOrderRepository();
    const [kafkaProducer, kafkaConsumer] = await createKafkaProducer();

    // Initialize service
    // const experimentService = new ExperimentOrderService(
    //   experimentRepository,
    //   kafkaProducer,
    //   console
    // );

    // // Initialize event handler
    // const reservationEventHandler = new ReservationEventHandler(
    //   experimentService,
    //   kafkaConsumer,
    //   logger
    // );
    // const eventHandlerResult = await reservationEventHandler.start();
    // if (eventHandlerResult.isFailure) {
    //   throw eventHandlerResult.error;
    // }

    // Initialize HTTP server
    const app = new Elysia()
      .get('/', () => ({ message: 'Laboratory Testing Service is running' }))
      // .use(new ExperimentOrderController(experimentService).routes())
      .listen(process.env.PORT ?? 3000);

    logger.info(
      `🚀 Laboratory Testing Service is running at ${app.server?.hostname}:${app.server?.port}`
    );

    // Handle shutdown gracefully
    const shutdown = async () => {
      logger.info('Shutting down...');

      // Stop accepting new requests
      await app.stop();

      // Stop event handler
      // await reservationEventHandler.stop();

      // Disconnect Kafka producer
      await kafkaProducer.disconnect();
      await kafkaConsumer.disconnect();

      logger.info('Shutdown complete');
      process.exit(0);
    };

    // Handle shutdown signals
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Failed to start Laboratory Testing Service', error);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

bootstrap();
