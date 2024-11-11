import { IdGenerator } from "@ce-lab-mgmt/core-utils";
import { DomainEvent, EntityId } from "@ce-lab-mgmt/domain";

export class TestStartedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventType: string = 'TestStarted';
  public readonly timestamp: string;

  constructor(
    public readonly aggregateId: EntityId,
    public readonly data: {
      professorId: string;
      startedAt: Date;
    }
  ) {
    this.eventId = IdGenerator.generate();
    this.timestamp = (new Date()).toISOString();
  }
}
