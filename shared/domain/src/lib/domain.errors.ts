import { Type, Static } from '@sinclair/typebox'

export const ErrorSchema = Type.Object({
  name: Type.String(),
  message: Type.String(),
  stack: Type.Optional(Type.String()),
  code: Type.Optional(Type.String())
})

export type ErrorType = Static<typeof ErrorSchema>

export class DomainError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message)
    this.name = 'DomainError'
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends DomainError {
  constructor(entity: string, id: string) {
    super(`${entity} with id ${id} not found`, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message = 'Unauthorized') {
    super(message, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

export class ConcurrencyError extends DomainError {
  constructor(entity: string, id: string) {
    super(
      `Concurrency conflict detected for ${entity} with id ${id}`, 
      'CONCURRENCY_ERROR'
    )
    this.name = 'ConcurrencyError'
  }
}