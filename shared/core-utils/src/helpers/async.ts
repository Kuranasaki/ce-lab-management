import { Type } from "@sinclair/typebox"
import { Guard } from "./guard"
import { Result } from "@ce-lab-mgmt/domain"

export class AsyncHelper {
  static async withRetry<T>(
    operation: () => Promise<T>,
    retries = 3,
    delay = 1000
  ): Promise<Result<T>> {
    Guard.validate(retries, Type.Number({ minimum: 0 }))
    Guard.validate(delay, Type.Number({ minimum: 0 }))

    for (let i = 0; i < retries; i++) {
      try {
        const result = await operation()
        return Result.ok(result)
      } catch (error) {
        if (i === retries - 1) {
          return Result.fail(error as Error)
        }
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    return Result.fail(new Error('All retries failed'))
  }

  static async timeout<T>(
    promise: Promise<T>,
    ms: number
  ): Promise<Result<T>> {
    Guard.validate(ms, Type.Number({ minimum: 0 }))

    try {
      const result = await Promise.race([
        promise,
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Operation timed out')), ms)
        )
      ])
      return Result.ok(result)
    } catch (error) {
      return Result.fail(error as Error)
    }
  }
}