import { KafkaConsumer } from '@ce-lab-mgmt/infrastructure';
import { KafkaConfig } from 'kafkajs';
import { ExperimentOrderService } from '../../domain/services/order.service';
import { KafkaTopic, Result } from '@ce-lab-mgmt/domain';

interface ReservationApprovedEvent {
  eventType: 'ReservationApproved';
  aggregateId: string; // reservationId
  timestamp: string;
  data: {
    reservationId: string;
    customerId: string;
    testItems: Array<{
      id: string;
      testName: string;
      amount: number;
      details?: string;
      note?: string;
    }>;
  };
}

export class ExperimentEventHandlerService {
  private readonly consumer: KafkaConsumer;

  constructor(
    private readonly experimentService: ExperimentOrderService,
  ) {
    // Initialize Kafka consumer
    const kafkaConfig: KafkaConfig = {
      clientId: 'laboratory-testing-service',
      brokers: process.env.KAFKA_BROKERS?.split(',') ?? ['localhost:9092']
    };

    // Using console logger for now since we don't have the logger injected
    this.consumer = new KafkaConsumer(
      kafkaConfig,
      'laboratory-testing-group',
      console
    );
  }

  async start(): Promise<Result<void>> {
    try {
      const connectResult = await this.consumer.connect();
      if (connectResult.isFailure) {
        return Result.fail(connectResult.error);
      }

      // Subscribe to reservation events
      this.consumer.subscribeToEvent(
        KafkaTopic.Reservation,
        'ReservationApproved',
        this.handleReservationApproved.bind(this)
      );

      const startResult = await this.consumer.startConsuming();
      if (startResult.isFailure) {
        return Result.fail(startResult.error);
      }

      console.info('Started consuming reservation events');
      return Result.ok();
    } catch (error) {
      console.error('Failed to start event handler', { error });
      return Result.fail(error as Error);
    }
  }

  private async handleReservationApproved(event: ReservationApprovedEvent): Promise<void> {
    try {
      console.info('Handling ReservationApproved event', {
        reservationId: event.data.reservationId
      });

      // Create an experiment for each test item in the reservation
      const results = await Promise.all(
        event.data.testItems.map(testItem =>
          this.createExperimentForTestItem(event.data.reservationId, testItem)
        )
      );

      // Check for any failures
      const failures = results.filter(result => result.isFailure);
      if (failures.length > 0) {
        console.error('Some experiments failed to create', {
          reservationId: event.data.reservationId,
          failures: failures.map(f => f.error.message)
        });
      }

      console.info('Successfully processed ReservationApproved event', {
        reservationId: event.data.reservationId,
        createdExperiments: results.length - failures.length,
        failedExperiments: failures.length
      });
    } catch (error) {
      console.error('Failed to handle ReservationApproved event', {
        error,
        reservationId: event.data.reservationId
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
        testNote: testItem.note ?? null
      });

      if (result.isFailure) {
        throw result.error;
      }

      return Result.ok();
    } catch (error) {
      console.error('Failed to create experiment for test item', {
        error,
        reservationId,
        testItemId: testItem.id
      });
      return Result.fail(error as Error);
    }
  }

  async stop(): Promise<void> {
    await this.consumer.disconnect();
  }
}