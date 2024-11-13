// import { Entity, EntityId, Result } from '@ce-lab-mgmt/domain';
import { Entity, EntityId, Result } from '@ce-lab-mgmt/domain';
export interface IRepository<T extends Entity> {
  findById(id: EntityId): Promise<Result<T | null>>;
  save(entity: T): Promise<Result<T>>;
  delete(id: EntityId): Promise<Result<boolean>>;
}

export interface IUnitOfWork {
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
}