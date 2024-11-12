import { Guard } from "@ce-lab-mgmt/core-utils"
import { ValueObject, Result } from "@ce-lab-mgmt/domain"
import { Static, t } from "elysia"
import { PricingUnit } from "./pricing-unit.vo"
import { PricingSchema } from "@ce-lab-mgmt/api-interfaces"


export class Pricing extends ValueObject<typeof PricingSchema> {
  protected getSchema() {
    return PricingSchema
  }

  private constructor(props: Static<typeof PricingSchema>) {
    super(props)
  }

  public static create(props: Static<typeof PricingSchema>): Result<Pricing> {
    try {
      Guard.validate(props, PricingSchema)
      return Result.ok(new Pricing(props))
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  get price(): number {
    return this.props.price
  }

  get pricingUnit(): string {
    return this.props.pricingUnit
  }

  get perUnit(): PricingUnit {
    return PricingUnit.create(this.props.perUnit).value
  }
}
