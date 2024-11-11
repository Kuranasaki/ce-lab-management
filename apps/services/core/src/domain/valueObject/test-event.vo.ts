import { Type, Static } from '@sinclair/typebox'
import { DomainEvent, EntityId } from '@ce-lab-mgmt/domain'
import { IdGenerator } from '@ce-lab-mgmt/core-utils'

export const TestStartedEventSchema = Type.Object({
  testId: Type.String(),
  professorId: Type.String(),
  startedAt: Type.String({ format: 'date-time' })
})

export type TestStartedEvent = Static<typeof TestStartedEventSchema>

export class TestStartedDomainEvent implements DomainEvent {
  public readonly eventId: string
  public readonly eventType: string = 'TEST_STARTED'
  public readonly timestamp: string

  constructor(
    public readonly aggregateId: EntityId,
    public readonly data: TestStartedEvent
  ) {
    this.eventId = IdGenerator.generate()
    this.timestamp = new Date().toISOString()
  }
}

export const TestCompletedEventSchema = Type.Object({
  testId: Type.String(),
  professorId: Type.String(),
  completedAt: Type.String({ format: 'date-time' }),
  result: Type.Union([
    Type.Literal('PASS'),
    Type.Literal('FAIL'),
    Type.Literal('INCONCLUSIVE')
  ])
})

export type TestCompletedEvent = Static<typeof TestCompletedEventSchema>

export class TestCompletedDomainEvent implements DomainEvent {
  public readonly eventId: string
  public readonly eventType: string = 'TEST_COMPLETED'
  public readonly timestamp: string

  constructor(
    public readonly aggregateId: EntityId,
    public readonly data: TestCompletedEvent
  ) {
    this.eventId = IdGenerator.generate()
    this.timestamp = new Date().toISOString()
  }
}
