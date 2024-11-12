// apps/laboratory-testing/src/application/events/reservation-event.handler.ts
import { KafkaConsumer } from '@ce-lab-mgmt/infrastructure';
import { KafkaConfig } from 'kafkajs';
import {
  Result,
  KafkaTopic,
  ReservationApprovedEvent,
} from '@ce-lab-mgmt/domain';
import { ExperimentOrderService } from '../../domain/services/order.service';
import { Logger } from 'kafkajs';

export class ReservationEventHandler {
  private readonly consumer: KafkaConsumer;

  constructor(
    private readonly experimentService: ExperimentOrderService,

    consumer: KafkaConsumer,
    private readonly logger: Logger | Console
  ) {
    // const kafkaConfig: KafkaConfig = {
    //   clientId: 'laboratory-testing-service',
    //   brokers: process.env.KAFKA_BROKERS?.split(',') ?? ['localhost:9092']
    // };

    // this.consumer = new KafkaConsumer(kafkaConfig, 'laboratory-testing-group', logger);
    this.consumer = consumer;
  }

  async start(): Promise<Result<void>> {
    try {
      const connectResult = await this.consumer.connect();
      if (connectResult.isFailure) {
        return Result.fail(connectResult.error);
      }

      // Only subscribe to the events we need from reservation service
      this.consumer.subscribeToEvent<
        KafkaTopic.Reservation,
        ReservationApprovedEvent
      >(
        KafkaTopic.Reservation,
        'ReservationApproved',
        this.handleReservationApproved.bind(this)
      );

      const startResult = await this.consumer.startConsuming();
      if (startResult.isFailure) {
        return Result.fail(startResult.error);
      }

      this.logger.info('Started consuming reservation events');
      return Result.ok();
    } catch (error) {
      this.logger.error('Failed to start reservation event handler', { error });
      return Result.fail(error as Error);
    }
  }

  private async handleReservationApproved(
    event: ReservationApprovedEvent
  ): Promise<void> {
    try {
      this.logger.info('Processing ReservationApproved event', {
        reservationId: event.data.reservationId,
      });

      // Create an experiment for each test item in the reservation
      const results = await Promise.all(
        event.data.testItems.map((testItem) =>
          this.createExperimentForTestItem(event.data.reservationId, testItem)
        )
      );

      // Check for any failures
      const failures = results.filter((result) => result.isFailure);
      if (failures.length > 0) {
        this.logger.error('Some experiments failed to create', {
          reservationId: event.data.reservationId,
          failures: failures.map((f) => f.error.message),
        });
      }

      this.logger.info('Completed processing ReservationApproved event', {
        reservationId: event.data.reservationId,
        createdExperiments: results.length - failures.length,
        failedExperiments: failures.length,
      });
    } catch (error) {
      this.logger.error('Failed to handle ReservationApproved event', {
        error,
        reservationId: event.data.reservationId,
        eventId: event.eventId,
      });
    }
  }

  private async createExperimentForTestItem(
    reservationId: string,
    testItem: {
      id: string;
      testName: string;
      amount: number;
      details?: string;
      note?: string;
    }
  ): Promise<Result<void>> {
    try {
      const result = await this.experimentService.createExperiment({
        reservationID: reservationId,
        testItemID: testItem.id,
        testName: testItem.testName,
        testAmount: testItem.amount,
        testDetails: testItem.details ?? null,
        testNote: testItem.note ?? null,
      });

      if (result.isFailure) {
        throw result.error;
      }

      return Result.ok();
    } catch (error) {
      this.logger.error('Failed to create experiment for test item', {
        error,
        reservationId,
        testItemId: testItem.id,
      });
      return Result.fail(error as Error);
    }
  }

  async stop(): Promise<void> {
    await this.consumer.disconnect();
  }
}
