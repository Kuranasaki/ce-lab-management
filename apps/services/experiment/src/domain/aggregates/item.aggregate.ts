import { aggregation, Result } from '@ce-lab-mgmt/domain';
import { TExperimentItem, TPricing, TTags } from '@ce-lab-mgmt/api-interfaces';
import { Tags } from '../value-object/tags.vo';
import { IdGenerator } from '@ce-lab-mgmt/core-utils';
import { Pricing } from '../value-object/pricing.vo';
const { AggregateRoot } = aggregation;

type ExperimentItemProps = TExperimentItem;

export class ExperimentItem extends AggregateRoot {
  private readonly _name: string
  private readonly _tags: Tags
  private readonly _pricing: Pricing[]
  private readonly _description: string

  private constructor(props: ExperimentItemProps) {
    super(props.id)
    this._name = props.name
    this._tags = Tags.create(props.tags).value
    this._pricing = props.pricing.map(p => Pricing.create(p).value)
    this._description = props.description
  }

  public static create(props: Omit<ExperimentItemProps, 'id'>): Result<TExperimentItem> {
    try {
      const id = IdGenerator.generate()
      const item = new ExperimentItem({ ...props, id })

      return Result.ok(item)
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  public static reconstitute(props: ExperimentItemProps): Result<TExperimentItem> {
    try {
      return Result.ok(new ExperimentItem(props))
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  get name(): string {
    return this._name
  }

  get tags(): Tags {
    return this._tags
  }

  get pricing(): Pricing[] {
    return [...this._pricing]
  }

  get description(): string {
    return this._description
  }

  toPrimitives(): ExperimentItemProps {
    return {
      id: this.id,
      name: this._name,
      tags: {
        category: this._tags.category,
        subcategory: this._tags.subcategory,
        type: this._tags.type
      },
      pricing: this._pricing.map(p => ({
        price: p.price,
        pricingUnit: p.pricingUnit,
        perUnit: {
          quantity: p.perUnit.quantity,
          unit: p.perUnit.unit
        }
      })),
      description: this._description
    }
  }
}
