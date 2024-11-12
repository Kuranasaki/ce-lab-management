import { Type, type Static } from '@sinclair/typebox'

export const EntityIdSchema = Type.String({
  format: 'uuid',
  description: 'Unique identifier for domain entities'
})

export const DomainEventSchema = Type.Object({
  eventId: Type.String({ format: 'uuid' }),
  eventType: Type.String(),
  aggregateId: EntityIdSchema,
  timestamp: Type.String({ format: 'date-time' }),
  data: Type.Unknown()
})

export const AggregateRootSchema = Type.Object({
  id: EntityIdSchema,
  version: Type.Integer({ minimum: 0 })
})

export type EntityId = Static<typeof EntityIdSchema>
// export type DomainEvent = Static<typeof DomainEventSchema>
export type AggregateRoot = Static<typeof AggregateRootSchema>