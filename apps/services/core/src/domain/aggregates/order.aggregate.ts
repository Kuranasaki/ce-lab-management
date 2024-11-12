import { aggregation, Result } from '@ce-lab-mgmt/domain';
import {
  ExperimentStatus,
  TExperimentOrder,
  TPricing,
  TTags,
} from '@ce-lab-mgmt/api-interfaces';
import { IdGenerator } from '@ce-lab-mgmt/core-utils';
const { AggregateRoot } = aggregation;

type ExperimentOrderProps = TExperimentOrder;

export class ExperimentOrder extends AggregateRoot {
  private constructor(private readonly props: ExperimentOrderProps) {
    super(props.id);
  }

  public static create(props: ExperimentOrderProps): ExperimentOrder {
    console.warn('ExperimentOrder.create() is not implemented');
    return new ExperimentOrder(props);
  }

  public static reconstitute(props: ExperimentOrderProps): ExperimentOrder {
    return new ExperimentOrder(props);
  }

  public assignProfessor(professorId: string): Result<void> {
    this.props.assignedProfessorID = professorId;
    this.props.status = ExperimentStatus.ASSIGNED;

    this.addEvent({
      eventId: IdGenerator.generate(),
      eventType: 'ProfessorAssigned',
      aggregateId: this.id,
      timestamp: new Date().toISOString(),
      data: { professorId, experimentId: this.id },
    });

    return Result.ok();
  }

  get self(): TExperimentOrder {
    return this.props;
  }

  get id(): string {
    return this.props.id;
  }

  get testName(): string {
    return this.props.testName;
  }

  get dataUrl(): string | null {
    return this.props.testFormURL;
  }
}
