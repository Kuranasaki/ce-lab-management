export class DateHelper {
  static toISOString(date: Date): string {
    return date.toISOString();
  }

  static fromISOString(dateStr: string): Date {
    return new Date(dateStr);
  }

  static now(): Date {
    return new Date();
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}