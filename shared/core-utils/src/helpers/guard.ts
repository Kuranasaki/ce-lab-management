import { ValidationError } from '@ce-lab-mgmt/domain'
import { TSchema } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { t } from 'elysia'

export class Guard {
  // Define schemas using Elysia's t
  private static readonly emailSchema = t.String({ format: 'email' }) as unknown as TSchema
  private static readonly uuidSchema = t.String({ format: 'uuid' }) as unknown as TSchema
  private static readonly nonEmptyStringSchema = t.String({ minLength: 1 }) as unknown as TSchema
  private static readonly positiveNumberSchema = t.Number({ minimum: 0 }) as unknown as TSchema
  private static readonly dateStringSchema = t.String({ format: 'date-time' }) as unknown as TSchema

  // Compile validators once
  private static readonly emailValidator = TypeCompiler.Compile(Guard.emailSchema)
  private static readonly uuidValidator = TypeCompiler.Compile(Guard.uuidSchema)
  private static readonly nonEmptyStringValidator = TypeCompiler.Compile(Guard.nonEmptyStringSchema)
  private static readonly positiveNumberValidator = TypeCompiler.Compile(Guard.positiveNumberSchema)
  private static readonly dateStringValidator = TypeCompiler.Compile(Guard.dateStringSchema)

  static validate<T>(value: unknown, schema: TSchema): T {
    const typebox = schema as unknown as TSchema
    const validator = TypeCompiler.Compile(typebox)

    if (!validator.Check(value)) {
      throw new ValidationError(
        `Validation failed for ${typebox.description || 'value'}: ${JSON.stringify(validator.Errors(value))}`
      )
    }

    return value as T
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

  static isValidObject<T>(value: unknown, schema: TSchema): value is T {
    const typebox = schema as unknown as TSchema
    const validator = TypeCompiler.Compile(typebox)
    return validator.Check(value)
  }
}