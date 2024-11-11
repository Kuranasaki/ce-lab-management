import { Guard } from '@ce-lab-mgmt/core-utils'
import { Type, Static } from '@sinclair/typebox'
import { ValueObject } from '../../../../../../shared/domain/src/lib/base-valueObject'
import { Result } from '../../../../../../shared/domain/src/lib/result'

const TestDataProperties = {
  rawData: Type.Record(Type.String(), Type.Union([
    Type.String(),
    Type.Number(),
    Type.Boolean()
  ])),
  measuredAt: Type.String({ format: 'date-time' }),
  equipment: Type.Optional(Type.Object({
    id: Type.String(),
    name: Type.String()
  }))
} as const

export const TestDataSchema = Type.Object(TestDataProperties)
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