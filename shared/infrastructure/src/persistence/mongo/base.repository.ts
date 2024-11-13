import { Entity, EntityId, Result } from '@ce-lab-mgmt/domain';
import { Collection, ObjectId } from 'mongodb';
import { IRepository } from '../interface';
import { MongoService } from './mongo.service';

export abstract class MongoRepository<T extends Entity> implements IRepository<T> {
  protected readonly collection: Collection;

  constructor(protected readonly collectionName: string) {
    this.collection = MongoService.getDb().collection(collectionName);
  }

  protected abstract toDomain(doc: Record<string, any>): T;
  protected abstract toPersistence(entity: T): Record<string, any>;

  async findById(id: EntityId): Promise<Result<T | null>> {
    try {
      const doc = await this.collection.findOne({ _id: new ObjectId(id) });
      if (!doc) {
        return Result.ok(null);
      }
      return Result.ok(this.toDomain(doc));
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async save(entity: T): Promise<Result<T>> {
    try {
      const doc = this.toPersistence(entity);
      await this.collection.updateOne(
        { _id: new ObjectId(entity.id) },
        { $set: doc },
        { upsert: true }
      );
      return Result.ok(entity);
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async delete(id: EntityId): Promise<Result<boolean>> {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return Result.ok(result.deletedCount > 0);
    } catch (error) {
      return Result.fail(error as Error);
    }
  }
}
