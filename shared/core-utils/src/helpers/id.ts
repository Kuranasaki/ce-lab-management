import { v4 as uuidv4 } from 'uuid'
import { Guard } from './guard'
import { t as Type } from 'elysia'

export class IdGenerator {
  static generate(): string {
    const id = uuidv4()
    // Validate the generated UUID just to be safe
    Guard.validate(id, Type.String({ format: 'uuid' }))
    return id
  }

  static isValid(id: string): boolean {
    return Guard.isValidUuid(id)
  }
}