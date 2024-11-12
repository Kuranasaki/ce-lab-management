import { aggregation } from '@ce-lab-mgmt/domain';
import { TExperimentItem, TPricing, TTags } from '@ce-lab-mgmt/api-interfaces';
const { AggregateRoot } = aggregation;

type ExperimentItemProps = TExperimentItem;

export class ExperimentItem extends AggregateRoot {
  private constructor(private readonly props: ExperimentItemProps) {
    super(props.id);
  }

  public static create(props: ExperimentItemProps): ExperimentItem {
    console.warn('ExperimentItem.create() is not implemented');
    return new ExperimentItem(props);
  }

  public static reconstitute(props: ExperimentItemProps): ExperimentItem {
    return new ExperimentItem(props);
  }

  public update(props: ExperimentItemProps): void {
    console.warn('ExperimentItem.update() is not implemented');
  }

  public delete(): void {
    console.warn('ExperimentItem.delete() is not implemented');
  }

  get self(): TExperimentItem {
    return this.props;
  }

  get pricing(): Array<TPricing> {
    return this.props.pricing;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get tags(): TTags {
    return this.props.tags;
  }

  

}
