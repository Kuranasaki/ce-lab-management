import { Guard, IdGenerator,ValidationError } from "@ce-lab-mgmt/core-utils";
import { EntityId, Result } from "@ce-lab-mgmt/domain";
import { aggregation } from "@ce-lab-mgmt/domain";
import { BasePricing } from "../../valueObject/pricing/base-pricing.vo";
import { TestCategory } from "../../valueObject/test-category.vo";
import { TestCriteria } from "../../valueObject/test-criteria.vo";
import { TestData } from "../../valueObject/test-data.vo";
import { TestCompletedEvent } from "./events/test-completed.event";
import { TestStartedEvent } from "./events/test-started.event";
import { TestStatus } from "./test-status.enum";

var AggregateRoot = aggregation.AggregateRoot;

interface TestProps {
  id: EntityId;
  name: string;
  description?: string;
  category?: TestCategory;
  criteria: TestCriteria[];
  pricing: BasePricing;
  status: TestStatus;
  professorId?: string;
  reservationId: string;
  testData?: TestData;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export class Test extends AggregateRoot {
  private constructor(private readonly props: TestProps) {
    super(props.id);
  }

  public static create(
    name: string,
    criteria: TestCriteria[],
    pricing: BasePricing,
    reservationId: string,
    category?: TestCategory
  ): Result<Test> {
    try {
      Guard.againstNullOrUndefined(name, 'name');
      Guard.againstEmpty(name, 'name');
      Guard.againstNullOrUndefined(criteria, 'criteria');
      Guard.againstNullOrUndefined(pricing, 'pricing');
      Guard.againstNullOrUndefined(reservationId, 'reservationId');

      if (criteria.length === 0) {
        throw new ValidationError('Test must have at least one criterion');
      }

      const test = new Test({
        id: IdGenerator.generate(),
        name,
        criteria,
        pricing,
        category,
        status: TestStatus.PENDING,
        reservationId,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
      });

      return Result.ok(test);
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  public static reconstitute(props: TestProps): Test {
    return new Test(props);
  }

  public startTest(professorId: string): Result<void> {
    try {
      Guard.againstNullOrUndefined(professorId, 'professorId');

      if (this.props.status !== TestStatus.PENDING) {
        throw new ValidationError('Test can only be started when in PENDING status');
      }

      this.props.status = TestStatus.IN_PROGRESS;
      this.props.professorId = professorId;
      this.props.updatedAt = new Date();

      this.addEvent(
        new TestStartedEvent(this.id, {
          professorId,
          startedAt: this.props.updatedAt
        })
      );

      return Result.ok();
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  public completeTest(testData: TestData): Result<void> {
    try {
      Guard.againstNullOrUndefined(testData, 'testData');

      if (this.props.status !== TestStatus.IN_PROGRESS) {
        throw new ValidationError('Test can only be completed when in IN_PROGRESS status');
      }

      const passed = this.evaluateTestResults(testData);
      this.props.status = passed ? TestStatus.COMPLETED : TestStatus.FAILED;
      this.props.testData = testData;
      this.props.updatedAt = new Date();

      this.addEvent(
        new TestCompletedEvent(this.id, {
          professorId: this.props.professorId!,
          completedAt: this.props.updatedAt,
          testData,
          passed
        })
      );

      return Result.ok();
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  public cancelTest(): Result<void> {
    try {
      if (![TestStatus.PENDING, TestStatus.IN_PROGRESS].includes(this.props.status)) {
        throw new ValidationError('Only pending or in-progress tests can be cancelled');
      }

      this.props.status = TestStatus.CANCELLED;
      this.props.updatedAt = new Date();

      return Result.ok();
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  private evaluateTestResults(testData: TestData): boolean {
    for (const criterion of this.props.criteria) {
      const actualValue = testData.parameters[criterion.name];
      if (actualValue === undefined || !criterion.isWithinTolerance(actualValue)) {
        return false;
      }
    }
    return true;
  }

  // Getters
  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get category(): TestCategory | undefined {
    return this.props.category;
  }

  get criteria(): TestCriteria[] {
    return [...this.props.criteria];
  }

  get pricing(): BasePricing {
    return this.props.pricing;
  }

  get status(): TestStatus {
    return this.props.status;
  }

  get professorId(): string | undefined {
    return this.props.professorId;
  }

  get reservationId(): string {
    return this.props.reservationId;
  }

  get testData(): TestData | undefined {
    return this.props.testData;
  }

  get createdAt(): Date {
    return new Date(this.props.createdAt);
  }

  get updatedAt(): Date {
    return new Date(this.props.updatedAt);
  }

  get version(): number {
    return this.props.version;
  }
}