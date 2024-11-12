import { TExperimentOrder, ExperimentStatus } from "@ce-lab-mgmt/api-interfaces";
import { IdGenerator, Guard } from "@ce-lab-mgmt/core-utils";
import { KafkaTopic, Result } from "@ce-lab-mgmt/domain";
import { KafkaProducer } from "@ce-lab-mgmt/infrastructure";
import { Kafka, Logger } from "kafkajs";
import { ExperimentOrder } from "../aggregates/order.aggregate";
import { ExperimentOrderRepository } from "../repositories/order.repository";

export class ExperimentOrderService {
  constructor(
    private readonly repository: ExperimentOrderRepository,
    private readonly kafkaProducer: KafkaProducer,
    private readonly logger: Logger
  ) {}

  async createExperiment(
    experimentData: Omit<TExperimentOrder, 'id' | 'status' | 'assignedProfessorID' | 'assignedProfessorName' | 'assignedAt' | 'testFormURL' | 'markedAsDone' | 'markedAsDoneAt' | 'certificateURL' | 'certificateUploadedAt'>
  ): Promise<Result<ExperimentOrder>> {
    try {
      const experiment = ExperimentOrder.create({
        ...experimentData,
        id: IdGenerator.generate(),
        status: ExperimentStatus.PENDING,
        assignedProfessorID: null,
        assignedProfessorName: null,
        assignedAt: new Date(),
        testFormURL: null,
        markedAsDone: false,
        markedAsDoneAt: null,
        certificateURL: null,
        certificateUploadedAt: null
      });

      const savedExperiment = await this.repository.save(experiment);
      if (savedExperiment.isFailure) {
        throw savedExperiment.error;
      }

      await this.kafkaProducer.publishEvent<KafkaTopic.Experiment>(KafkaTopic.Experiment, {
        eventId: IdGenerator.generate(),
        eventType: 'ReservationApproved' ,
        aggregateId: experiment.id,
        timestamp: new Date().toISOString(),
        data: experiment.self
      });

      return Result.ok(savedExperiment.value);
    } catch (error) {
      this.logger.error('Failed to create experiment', { error });
      return Result.fail(error as Error);
    }
  }

  async assignProfessor(
    experimentId: string,
    professorId: string,
    professorName: string
  ): Promise<Result<void>> {
    try {
      Guard.againstNullOrUndefined(experimentId, 'experimentId');
      Guard.againstNullOrUndefined(professorId, 'professorId');
      Guard.againstNullOrUndefined(professorName, 'professorName');

      const experimentResult = await this.repository.findById(experimentId);
      if (experimentResult.isFailure) {
        throw experimentResult.error;
      }

      const experiment = experimentResult.value;
      if (!experiment) {
        throw new Error(`Experiment with id ${experimentId} not found`);
      }

      experiment.assignProfessor(professorId);
      const updatedExperiment = await this.repository.save(experiment);
      
      if (updatedExperiment.isFailure) {
        throw updatedExperiment.error;
      }

      await this.kafkaProducer.publishEvent('experiment-events', {
        eventId: IdGenerator.generate(),
        eventType: 'ProfessorAssigned',
        aggregateId: experimentId,
        timestamp: new Date().toISOString(),
        data: {
          experimentId,
          professorId,
          professorName
        }
      });

      return Result.ok();
    } catch (error) {
      this.logger.error('Failed to assign professor', { experimentId, professorId, error });
      return Result.fail(error as Error);
    }
  }

  async updateStatus(
    experimentId: string,
    status: ExperimentStatus
  ): Promise<Result<void>> {
    try {
      Guard.againstNullOrUndefined(experimentId, 'experimentId');

      const result = await this.repository.updateStatus(experimentId, status);
      if (result.isFailure) {
        throw result.error;
      }

      await this.kafkaProducer.publishEvent('experiment-events', {
        eventId: IdGenerator.generate(),
        eventType: 'ExperimentStatusUpdated',
        aggregateId: experimentId,
        timestamp: new Date().toISOString(),
        data: { experimentId, status }
      });

      return Result.ok();
    } catch (error) {
      this.logger.error('Failed to update experiment status', { experimentId, status, error });
      return Result.fail(error as Error);
    }
  }

  async uploadTestForm(
    experimentId: string,
    formUrl: string
  ): Promise<Result<void>> {
    try {
      Guard.againstNullOrUndefined(experimentId, 'experimentId');
      Guard.againstNullOrUndefined(formUrl, 'formUrl');

      const experimentResult = await this.repository.findById(experimentId);
      if (experimentResult.isFailure) {
        throw experimentResult.error;
      }

      const experiment = experimentResult.value;
      if (!experiment) {
        throw new Error(`Experiment with id ${experimentId} not found`);
      }

      // Update the test form URL and status
      const result = await this.repository.save(
        ExperimentOrder.reconstitute({
          ...experiment.self,
          testFormURL: formUrl,
          status: ExperimentStatus.IN_PROGRESS
        })
      );

      if (result.isFailure) {
        throw result.error;
      }

      await this.kafkaProducer.publishEvent('experiment-events', {
        eventId: IdGenerator.generate(),
        eventType: 'TestFormUploaded',
        aggregateId: experimentId,
        timestamp: new Date().toISOString(),
        data: { experimentId, formUrl }
      });

      return Result.ok();
    } catch (error) {
      this.logger.error('Failed to upload test form', { experimentId, formUrl, error });
      return Result.fail(error as Error);
    }
  }

  async uploadCertificate(
    experimentId: string,
    certificateUrl: string
  ): Promise<Result<void>> {
    try {
      Guard.againstNullOrUndefined(experimentId, 'experimentId');
      Guard.againstNullOrUndefined(certificateUrl, 'certificateUrl');

      const result = await this.repository.updateCertificateUrl(experimentId, certificateUrl);
      if (result.isFailure) {
        throw result.error;
      }

      await this.kafkaProducer.publishEvent('experiment-events', {
        eventId: IdGenerator.generate(),
        eventType: 'CertificateUploaded',
        aggregateId: experimentId,
        timestamp: new Date().toISOString(),
        data: { experimentId, certificateUrl }
      });

      return Result.ok();
    } catch (error) {
      this.logger.error('Failed to upload certificate', { experimentId, certificateUrl, error });
      return Result.fail(error as Error);
    }
  }

  async markExperimentAsDone(experimentId: string): Promise<Result<void>> {
    try {
      Guard.againstNullOrUndefined(experimentId, 'experimentId');

      const result = await this.repository.markAsDone(experimentId);
      if (result.isFailure) {
        throw result.error;
      }

      await this.kafkaProducer.publishEvent('experiment-events', {
        eventId: IdGenerator.generate(),
        eventType: 'ExperimentCompleted',
        aggregateId: experimentId,
        timestamp: new Date().toISOString(),
        data: { experimentId }
      });

      return Result.ok();
    } catch (error) {
      this.logger.error('Failed to mark experiment as done', { experimentId, error });
      return Result.fail(error as Error);
    }
  }

  // Query methods
  async getExperimentById(id: string): Promise<Result<ExperimentOrder | null>> {
    try {
      Guard.againstNullOrUndefined(id, 'id');
      return await this.repository.findById(id);
    } catch (error) {
      this.logger.error('Failed to get experiment by id', { id, error });
      return Result.fail(error as Error);
    }
  }

  async getExperimentsByReservation(reservationId: string): Promise<Result<ExperimentOrder[]>> {
    try {
      Guard.againstNullOrUndefined(reservationId, 'reservationId');
      return await this.repository.findByReservationId(reservationId);
    } catch (error) {
      this.logger.error('Failed to get experiments by reservation', { reservationId, error });
      return Result.fail(error as Error);
    }
  }

  async getExperimentsByProfessor(professorId: string): Promise<Result<ExperimentOrder[]>> {
    try {
      Guard.againstNullOrUndefined(professorId, 'professorId');
      return await this.repository.findByProfessorId(professorId);
    } catch (error) {
      this.logger.error('Failed to get experiments by professor', { professorId, error });
      return Result.fail(error as Error);
    }
  }

  async getExperimentsByStatus(status: ExperimentStatus): Promise<Result<ExperimentOrder[]>> {
    try {
      return await this.repository.findByStatus(status);
    } catch (error) {
      this.logger.error('Failed to get experiments by status', { status, error });
      return Result.fail(error as Error);
    }
  }
}