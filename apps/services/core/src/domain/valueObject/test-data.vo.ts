import { Guard } from '@ce-lab-mgmt/core-utils'
import { t, Static } from 'elysia'
import { ValueObject, Result } from '@ce-lab-mgmt/domain'

const TestDataProperties = {
  rawData: t.Record(t.String(), t.Union([
    t.String(),
    t.Number(),
    t.Boolean()
  ])),
  measuredAt: t.String({ format: 'date-time' }),
  equipment: t.Optional(t.Object({
    id: t.String(),
    name: t.String()
  }))
} as const

export const TestDataSchema = t.Object(TestDataProperties)
export type TestDataProps = Static<typeof TestDataSchema>

export class TestData extends ValueObject<typeof TestDataProperties> {
  protected getSchema() {
    return TestDataSchema
  }

  private constructor(props: TestDataProps) {
    super(props)
  }

  public static create(props: TestDataProps) {
    try {
      Guard.validate(props, TestDataSchema)
      return Result.ok(new TestData(props))
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  get rawData() {
    return this.props.rawData
  }

  get measuredAt() {
    return new Date(this.props.measuredAt)
  }

  get equipment() {
    return this.props.equipment
  }
}