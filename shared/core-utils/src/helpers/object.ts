import { Type, TSchema, Static } from '@sinclair/typebox'
import { Guard } from './guard'

export class ObjectHelper {
  static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
  }

  static pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key]
      }
    })
    return result
  }

  static omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj }
    keys.forEach(key => delete result[key])
    return result
  }

  static merge<T extends object>(target: T, source: Partial<T>): T {
    return { ...target, ...source }
  }

  static validateSchema<T extends TSchema>(
    value: unknown, 
    schema: T
  ): Static<T> {
    return Guard.validate(value, schema)
  }
}