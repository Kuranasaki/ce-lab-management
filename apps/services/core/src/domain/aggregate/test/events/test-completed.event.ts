import { IdGenerator } from "@ce-lab-mgmt/core-utils";
import { DomainEvent, EntityId } from "@ce-lab-mgmt/domain";
import { TestData } from "../../../valueObject/test-data.vo";

export class TestCompletedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventType: string = 'TestCompleted';
  public readonly timestamp: Date;

  constructor(
    public readonly aggregateId: EntityId,
    public readonly data: {
      professorId: string;
      completedAt: Date;
      testData: TestData;
      passed: boolean;
    }
  ) {
    this.eventId = IdGenerator.generate();
    this.timestamp = new Date();
  }
}
