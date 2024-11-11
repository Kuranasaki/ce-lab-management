import { Static, TObject, Type } from '@sinclair/typebox'
import { EntityId, EntityIdSchema } from '../base-type'
import { ValueObject } from '../base-valueObject'
import { ValidationError } from '../domain.errors'
import { Result } from '../result'

const TestCategoryProperties = {
  id: EntityIdSchema,
  name: Type.String({ minLength: 1 }),
  parentId: Type.Optional(EntityIdSchema),
  level: Type.Integer({ minimum: 0 }),
  pricingType: Type.Union([
    Type.Literal('per_piece'),
    Type.Literal('by_weight'),
    Type.Literal('by_size'),
    Type.Literal('by_count')
  ]),
  pricingConfig: Type.Object({
    basePrice: Type.Number({ minimum: 0 }),
    weightRanges: Type.Optional(Type.Array(Type.Object({
      minWeight: Type.Number({ minimum: 0 }),
      maxWeight: Type.Number(),
      priceMultiplier: Type.Number({ minimum: 0 })
    }))),
    sizeRanges: Type.Optional(Type.Array(Type.Object({
      minSize: Type.Number({ minimum: 0 }),
      maxSize: Type.Number(),
      priceMultiplier: Type.Number({ minimum: 0 })
    }))),
    countRanges: Type.Optional(Type.Array(Type.Object({
      minCount: Type.Integer({ minimum: 0 }),
      maxCount: Type.Integer(),
      priceMultiplier: Type.Number({ minimum: 0 })
    })))
  })
} as const

export const TestCategorySchema = Type.Object(TestCategoryProperties)

export type TestCategoryProps = Static<typeof TestCategorySchema>

export class TestCategory extends ValueObject<typeof TestCategoryProperties> {
  protected getSchema(): TObject<typeof TestCategoryProperties> {
    return TestCategorySchema
  }

  private constructor(props: TestCategoryProps) {
    super(props)
  }

  public static create(props: TestCategoryProps): Result<TestCategory> {
    try {
      return Result.ok(new TestCategory(props))
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  get name(): string {
    return this.props.name
  }

  get level(): number {
    return this.props.level
  }

  get parentId(): EntityId | undefined {
    return this.props.parentId
  }

  get pricingType(): TestCategoryProps['pricingType'] {
    return this.props.pricingType
  }

  calculatePrice(params: {
    weight?: number,
    size?: number,
    count?: number
  }): Result<number> {
    try {
      const { pricingType, pricingConfig } = this.props
      const { basePrice } = pricingConfig

      switch (pricingType) {
        case 'per_piece':
          return Result.ok(basePrice)

        case 'by_weight': {
          if (!params.weight || !pricingConfig.weightRanges) {
            throw new ValidationError('Weight parameter required for by_weight pricing')
          }
          return Result.ok(this.calculateRangeBasedPrice(
            params.weight,
            pricingConfig.weightRanges,
            basePrice,
            'weight'
          ))
        }

        case 'by_size': {
          if (!params.size || !pricingConfig.sizeRanges) {
            throw new ValidationError('Size parameter required for by_size pricing')
          }
          return Result.ok(this.calculateRangeBasedPrice(
            params.size,
            pricingConfig.sizeRanges,
            basePrice,
            'size'
          ))
        }

        case 'by_count': {
          if (!params.count || !pricingConfig.countRanges) {
            throw new ValidationError('Count parameter required for by_count pricing')
          }
          return Result.ok(this.calculateRangeBasedPrice(
            params.count,
            pricingConfig.countRanges,
            basePrice,
            'count'
          ))
        }

        default:
          throw new ValidationError('Invalid pricing type')
      }
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  private calculateRangeBasedPrice<T extends { priceMultiplier: number }>(
    value: number,
    ranges: T[],
    basePrice: number,
    type: 'weight' | 'size' | 'count'
  ): number {
    const range = ranges.find(r => {
      const min = (r as any)[`min${type.charAt(0).toUpperCase()}${type.slice(1)}`] ?? 0
      const max = (r as any)[`max${type.charAt(0).toUpperCase()}${type.slice(1)}`] ?? Infinity
      return value >= min && value < max
    })

    if (!range) {
      throw new ValidationError(`Value ${value} out of defined ranges for ${type}`)
    }

    return basePrice * range.priceMultiplier
  }
}
