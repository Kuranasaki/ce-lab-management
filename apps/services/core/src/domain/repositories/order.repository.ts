import { TExperimentOrder, ExperimentStatus } from "@ce-lab-mgmt/api-interfaces";
import { Guard } from "@ce-lab-mgmt/core-utils";
import { Result } from "@ce-lab-mgmt/domain";
import { MongoRepository } from "@ce-lab-mgmt/infrastructure";
import { ObjectId } from "mongodb";
import { ExperimentOrder } from "../aggregates/order.aggregate";


interface ExperimentOrderDocument extends Omit<TExperimentOrder, 'id' | 'assignedAt' | 'markedAsDoneAt' | 'certificateUploadedAt'> {
  _id: ObjectId;
  assignedAt: Date;
  markedAsDoneAt: Date | null;
  certificateUploadedAt: Date | null;
}

export class ExperimentOrderRepository extends MongoRepository<ExperimentOrder> {
  constructor() {
    super('experiment_orders');
  }

  protected toDomain(doc: ExperimentOrderDocument): ExperimentOrder {
    return ExperimentOrder.reconstitute({
      ...doc,
      id: doc._id.toHexString(),
      assignedAt: doc.assignedAt,
      markedAsDoneAt: doc.markedAsDoneAt,
      certificateUploadedAt: doc.certificateUploadedAt
    });
  }

  protected toPersistence(entity: ExperimentOrder): Omit<ExperimentOrderDocument, '_id'> {
    const props = entity.self;
    return {
      reservationID: props.reservationID,
      testItemID: props.testItemID,
      testName: props.testName,
      testAmount: props.testAmount,
      testDetails: props.testDetails,
      testNote: props.testNote,
      assignedProfessorID: props.assignedProfessorID,
      assignedProfessorName: props.assignedProfessorName,
      assignedAt: props.assignedAt,
      testFormURL: props.testFormURL,
      markedAsDone: props.markedAsDone,
      markedAsDoneAt: props.markedAsDoneAt,
      certificateURL: props.certificateURL,
      certificateUploadedAt: props.certificateUploadedAt,
      status: props.status
    };
  }

  async findByReservationId(reservationId: string): Promise<Result<ExperimentOrder[]>> {
    try {
      Guard.againstNullOrUndefined(reservationId, 'reservationId');
      
      const docs = await this.collection
        .find({ reservationID: reservationId })
        .sort({ assignedAt: -1 })
        .toArray();
      
      return Result.ok(
        docs.map(doc => this.toDomain(doc as ExperimentOrderDocument))
      );
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async findByProfessorId(professorId: string): Promise<Result<ExperimentOrder[]>> {
    try {
      Guard.againstNullOrUndefined(professorId, 'professorId');
      
      const docs = await this.collection
        .find({ assignedProfessorID: professorId })
        .sort({ assignedAt: -1 })
        .toArray();
      
      return Result.ok(
        docs.map(doc => this.toDomain(doc as ExperimentOrderDocument))
      );
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async findByStatus(status: ExperimentStatus): Promise<Result<ExperimentOrder[]>> {
    try {
      const docs = await this.collection
        .find({ status })
        .sort({ assignedAt: -1 })
        .toArray();
      
      return Result.ok(
        docs.map(doc => this.toDomain(doc as ExperimentOrderDocument))
      );
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async updateStatus(
    id: string, 
    status: ExperimentStatus
  ): Promise<Result<void>> {
    try {
      Guard.againstNullOrUndefined(id, 'id');
      
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );

      if (result.matchedCount === 0) {
        throw new Error(`ExperimentOrder with id ${id} not found`);
      }

      return Result.ok();
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async markAsDone(id: string): Promise<Result<void>> {
    try {
      Guard.againstNullOrUndefined(id, 'id');
      
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            markedAsDone: true,
            markedAsDoneAt: new Date(),
            status: ExperimentStatus.DONE
          } 
        }
      );

      if (result.matchedCount === 0) {
        throw new Error(`ExperimentOrder with id ${id} not found`);
      }

      return Result.ok();
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async updateCertificateUrl(
    id: string, 
    certificateUrl: string
  ): Promise<Result<void>> {
    try {
      Guard.againstNullOrUndefined(id, 'id');
      Guard.againstNullOrUndefined(certificateUrl, 'certificateUrl');
      
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            certificateURL: certificateUrl,
            certificateUploadedAt: new Date()
          } 
        }
      );

      if (result.matchedCount === 0) {
        throw new Error(`ExperimentOrder with id ${id} not found`);
      }

      return Result.ok();
    } catch (error) {
      return Result.fail(error as Error);
    }
  }
}