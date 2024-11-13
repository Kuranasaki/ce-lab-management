export class Result<T, E extends Error = Error> {
  // Private constructor prevents direct instantiation
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _value?: T,
    private readonly _error?: E
  ) {}

  public get isSuccess(): boolean {
    return this._isSuccess;
  }

  public get isFailure(): boolean {
    return !this._isSuccess;
  }

  public get value(): T {
    if (this.isFailure) {
      throw new Error('Cannot get value of a failed result');
    }
    return this._value as T;
  }

  public get error(): E {
    if (this.isSuccess) {
      throw new Error('Cannot get error of a successful result');
    }
    return this._error as E;
  }

  public static ok<T, E extends Error = Error>(value?: T): Result<T, E> {
    return new Result<T, E>(true, value);
  }

  public static fail<T, E extends Error>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }

  // Fixed map method with proper typing
  public map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.isSuccess) {
      try {
        return Result.ok<U, E>(fn(this.value));
      } catch (error) {
        // Handle potential errors during mapping
        return Result.fail(error instanceof Error ? error as E : new Error(String(error)) as E);
      }
    }
    return Result.fail<U, E>(this.error);
  }

  // Fixed mapError method with proper typing
  public mapError<F extends Error>(fn: (error: E) => F): Result<T, F> {
    if (this.isFailure) {
      return Result.fail<T, F>(fn(this.error));
    }
    return Result.ok<T, F>(this.value);
  }

  // Additional utility methods
  public andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this.isSuccess) {
      return fn(this.value);
    }
    return Result.fail<U, E>(this.error);
  }

  // Utility method to convert to another error type
  public withErrorType<F extends Error>(): Result<T, F> {
    if (this.isSuccess) {
      return Result.ok<T, F>(this.value);
    }
    return Result.fail<T, F>(this.error as unknown as F);
  }
}