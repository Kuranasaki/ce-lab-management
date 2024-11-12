import { ValidationError } from "./domain.errors"
import { Entity } from "./base-entity"
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { EntityId, AggregateRootSchema, DomainEventSchema,  } from "./base-type"
import { DomainEvent } from "./events"


export abstract class AggregateRoot<T extends EntityId = EntityId> extends Entity<T> {
  private static readonly aggregateValidator = TypeCompiler.Compile(AggregateRootSchema)
  private static readonly eventValidator = TypeCompiler.Compile(DomainEventSchema)

  private _version = 0
  private _events: DomainEvent[] = []

  protected constructor(id: T) {
    super(id)
    if (!AggregateRoot.aggregateValidator.Check({ id, version: this._version })) {
      throw new ValidationError('Invalid aggregate root state')
    }
  }

  get version(): number {
    return this._version
  }

  get events(): DomainEvent[] {
    return [...this._events]
  }

  protected addEvent(event: DomainEvent): void {
    if (!AggregateRoot.eventValidator.Check(event)) {
      throw new ValidationError('Invalid domain event format')
    }
    this._events.push(event)
  }

  clearEvents(): void {
    this._events = []
  }

  incrementVersion(): void {
    this._version++
  }
}