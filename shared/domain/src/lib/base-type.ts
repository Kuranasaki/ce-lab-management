export type EntityId = string;

export interface DomainEvent {
  eventId: string;
  eventType: string;
  aggregateId: EntityId;
  timestamp: Date;
  data: unknown;
}

export interface AggregateRoot {
  id: EntityId;
  version: number;
}