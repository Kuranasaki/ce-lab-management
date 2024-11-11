import { Static, TSchema, Type } from '@sinclair/typebox'

export const OptionalType = <T extends TSchema>(schema: T) => Type.Union([
  schema,
  Type.Undefined(),
  Type.Null()
])

export const NullableType = <T extends TSchema>(schema: T) => Type.Union([
  schema,
  Type.Null()
])

export type Optional<T extends TSchema> = Static<ReturnType<typeof OptionalType<T>>>
export type Nullable<T extends TSchema> = Static<ReturnType<typeof NullableType<T>>>

// Common reusable schemas
export const EmailSchema = Type.String({ format: 'email' })
export const UuidSchema = Type.String({ format: 'uuid' })
export const TimestampSchema = Type.String({ format: 'date-time' })
export const NonEmptyStringSchema = Type.String({ minLength: 1 })
export const PositiveNumberSchema = Type.Number({ minimum: 0 })
export const PositiveIntegerSchema = Type.Integer({ minimum: 0 })

// Pagination schema
export const PaginationParamsSchema = Type.Object({
  page: Type.Integer({ minimum: 1, default: 1 }),
  limit: Type.Integer({ minimum: 1, maximum: 100, default: 10 }),
  sortBy: Type.Optional(Type.String()),
  sortOrder: Type.Optional(Type.Union([
    Type.Literal('asc'),
    Type.Literal('desc')
  ]))
})

export type PaginationParams = Static<typeof PaginationParamsSchema>

// API Response schemas
export const ApiErrorSchema = Type.Object({
  code: Type.String(),
  message: Type.String(),
  details: Type.Optional(Type.Unknown())
})

export const ApiResponseSchema = <T extends TSchema>(dataSchema: T) => Type.Object({
  success: Type.Boolean(),
  data: Type.Optional(dataSchema),
  error: Type.Optional(ApiErrorSchema),
  meta: Type.Optional(Type.Object({
    pagination: Type.Optional(Type.Object({
      total: Type.Integer(),
      page: Type.Integer(),
      limit: Type.Integer(),
      totalPages: Type.Integer()
    }))
  }))
})

export type ApiError = Static<typeof ApiErrorSchema>
export type ApiResponse<T extends TSchema> = Static<ReturnType<typeof ApiResponseSchema<T>>>