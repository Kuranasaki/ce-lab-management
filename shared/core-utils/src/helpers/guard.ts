import { Type, TSchema, Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { ValidationError } from '../errors'

export class Guard {
  private static readonly emailSchema = Type.String({ format: 'email' })
  private static readonly emailValidator = TypeCompiler.Compile(Guard.emailSchema)

  private static readonly uuidSchema = Type.String({ format: 'uuid' })
  private static readonly uuidValidator = TypeCompiler.Compile(Guard.uuidSchema)

  private static readonly nonEmptyStringSchema = Type.String({ minLength: 1 })
  private static readonly nonEmptyStringValidator = TypeCompiler.Compile(Guard.nonEmptyStringSchema)

  private static readonly positiveNumberSchema = Type.Number({ minimum: 0 })
  private static readonly positiveNumberValidator = TypeCompiler.Compile(Guard.positiveNumberSchema)

  private static readonly dateStringSchema = Type.String({ format: 'date-time' })
  private static readonly dateStringValidator = TypeCompiler.Compile(Guard.dateStringSchema)

  static validate<T extends TSchema>(value: unknown, schema: T): Static<T> {
    const validator = TypeCompiler.Compile(schema)
    if (!validator.Check(value)) {
      throw new ValidationError(
        `Validation failed for ${schema.description || 'value'}: ${JSON.stringify(validator.Errors(value))}`
      )
    }
    return value as Static<T>
  }

  static againstNullOrUndefined(value: unknown, name: string): void {
    if (value === null || value === undefined) {
      throw new ValidationError(`${name} cannot be null or undefined`)
    }
  }

  static againstEmpty(value: string, name: string): void {
    if (!Guard.nonEmptyStringValidator.Check(value)) {
      throw new ValidationError(`${name} cannot be empty`)
    }
  }

  static againstNegative(value: number, name: string): void {
    if (!Guard.positiveNumberValidator.Check(value)) {
      throw new ValidationError(`${name} cannot be negative`)
    }
  }

  static isValidEmail(email: string): boolean {
    return Guard.emailValidator.Check(email)
  }

  static isValidUuid(uuid: string): boolean {
    return Guard.uuidValidator.Check(uuid)
  }

  static isValidDateString(date: string): boolean {
    return Guard.dateStringValidator.Check(date)
  }

  static isValidObject<T extends TSchema>(value: unknown, schema: T): value is Static<T> {
    const validator = TypeCompiler.Compile(schema)
    return validator.Check(value)
  }
}