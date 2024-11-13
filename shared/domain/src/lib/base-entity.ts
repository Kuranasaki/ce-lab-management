import { t as Type } from 'elysia'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { ValidationError } from './domain.errors'
import { EntityId, EntityIdSchema } from './base-type'

export abstract class Entity<T extends EntityId = EntityId> {
  private static readonly idValidator = TypeCompiler.Compile(EntityIdSchema)

  protected constructor(protected readonly _id: T) {
    if (!Entity.idValidator.Check(_id)) {
      throw new ValidationError('Invalid entity ID format')
    }
  }

  get id(): T {
    return this._id
  }

  equals(other: Entity<T>): boolean {
    if (!(other instanceof Entity)) return false
    return this._id === other._id
  }
}
