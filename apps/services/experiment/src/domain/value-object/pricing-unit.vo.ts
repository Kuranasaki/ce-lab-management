import { Static } from 'elysia'
import { Result, ValueObject } from '@ce-lab-mgmt/domain'
import { Guard } from '@ce-lab-mgmt/core-utils'
import { PricingUnitSchema } from '@ce-lab-mgmt/api-interfaces'


export class PricingUnit extends ValueObject<typeof PricingUnitSchema> {
  protected getSchema() {
    return PricingUnitSchema
  }

  private constructor(props: Static<typeof PricingUnitSchema>) {
    super(props)
  }

  public static create(props: Static<typeof PricingUnitSchema>): Result<PricingUnit> {
    try {
      Guard.validate(props, PricingUnitSchema)
      return Result.ok(new PricingUnit(props))
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  get quantity(): number {
    return this.props.quantity
  }

  get unit(): string {
    return this.props.unit
  }
}