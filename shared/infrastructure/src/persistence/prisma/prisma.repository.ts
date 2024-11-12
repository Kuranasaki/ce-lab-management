import { PrismaClient } from '@prisma/client';
import { Entity, EntityId, Result } from '@ce-lab-mgmt/domain';
import { PrismaService } from './prisma.service';

export abstract class PrismaRepository<
  TEntity extends Entity,
  TModel extends Record<string, any>
> {
  protected readonly prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaService.getInstance();
  }

  protected abstract toDomain(model: TModel): TEntity;
  protected abstract toPersistence(entity: TEntity): Omit<TModel, 'id'>;

  /**
   * Find entity by ID
   */
  async findById(id: EntityId): Promise<Result<TEntity | null>> {
    try {
      const model = await this.findModel(id);
      if (!model) {
        return Result.ok(null);
      }
      return Result.ok(this.toDomain(model));
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  /**
   * Save entity (create or update)
   */
  async save(entity: TEntity): Promise<Result<TEntity>> {
    try {
      const data = this.toPersistence(entity);
      const model = await this.saveModel(entity.id, data);
      return Result.ok(this.toDomain(model));
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  /**
   * Delete entity by ID
   */
  async delete(id: EntityId): Promise<Result<boolean>> {
    try {
      await this.deleteModel(id);
      return Result.ok(true);
    } catch (error) {
      if ((error as any).code === 'P2025') {
        // Prisma not found error
        return Result.ok(false);
      }
      return Result.fail(error as Error);
    }
  }

  /**
   * Check if entity exists
   */
  async exists(id: EntityId): Promise<Result<boolean>> {
    try {
      const exists = await this.existsModel(id);
      return Result.ok(exists);
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  /**
   * Abstract methods to be implemented by concrete repositories
   */
  protected abstract findModel(id: EntityId): Promise<TModel | null>;
  protected abstract saveModel(
    id: EntityId,
    data: Omit<TModel, 'id'>
  ): Promise<TModel>;
  protected abstract deleteModel(id: EntityId): Promise<boolean>;

  protected async existsModel(id: EntityId): Promise<boolean> {
    const model = await this.findModel(id);
    return model !== null;
  }
}
