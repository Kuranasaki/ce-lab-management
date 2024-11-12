import { TagsSchema } from "@ce-lab-mgmt/api-interfaces"
import { Guard } from "@ce-lab-mgmt/core-utils"
import { ValueObject, Result } from "@ce-lab-mgmt/domain"
import { Static } from "elysia"

export class Tags extends ValueObject<typeof TagsSchema> {
  protected getSchema() {
    return TagsSchema
  }

  private constructor(props: Static<typeof TagsSchema>) {
    super(props)
  }

  public static create(props: Static<typeof TagsSchema>): Result<Tags> {
    try {
      Guard.validate(props, TagsSchema)
      return Result.ok(new Tags(props))
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  get category(): string | undefined {
    return this.props.category
  }

  get subcategory(): string | undefined {
    return this.props.subcategory
  }

  get type(): string {
    return this.props.type
  }
}
