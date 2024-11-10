import { Entity } from "./base-entity";
import { DomainEvent, EntityId } from "./base-type";

export abstract class AggregateRoot<T extends EntityId = EntityId> extends Entity<T> {
  private _version = 0;
  private _events: DomainEvent[] = [];

  get version(): number {
    return this._version;
  }

  get events(): DomainEvent[] {
    return [...this._events];
  }

  protected addEvent(event: DomainEvent): void {
    this._events.push(event);
  }

  clearEvents(): void {
    this._events = [];
  }

  incrementVersion(): void {
    this._version++;
  }
}