export class Guard {
  static againstNullOrUndefined<T>(value: T | null | undefined, name: string): void {
    if (value === null || value === undefined) {
      throw new Error(`${name} cannot be null or undefined`);
    }
  }

  static againstEmpty(value: string, name: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error(`${name} cannot be empty`);
    }
  }

  static againstNegative(value: number, name: string): void {
    if (value < 0) {
      throw new Error(`${name} cannot be negative`);
    }
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}