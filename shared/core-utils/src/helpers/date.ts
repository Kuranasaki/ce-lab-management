import { Type } from '@sinclair/typebox'
import { Guard } from './guard'

export const DateSchema = Type.Object({
  value: Type.String({ format: 'date-time' })
})

export class DateHelper {
  static toISOString(date: Date): string {
    return date.toISOString()
  }

  static fromISOString(dateStr: string): Date {
    Guard.validate(dateStr, Type.String({ format: 'date-time' }))
    return new Date(dateStr)
  }

  static now(): Date {
    return new Date()
  }

  static addDays(date: Date, days: number): Date {
    Guard.againstNullOrUndefined(date, 'date')
    Guard.validate(days, Type.Number())
    
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  static formatDate(date: Date, format: 'short' | 'long' | 'iso'): string {
    Guard.againstNullOrUndefined(date, 'date')

    switch (format) {
      case 'short':
        return date.toLocaleDateString()
      case 'long':
        return date.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      case 'iso':
        return date.toISOString()
    }
  }

  static compareDate(date1: Date, date2: Date): -1 | 0 | 1 {
    Guard.againstNullOrUndefined(date1, 'date1')
    Guard.againstNullOrUndefined(date2, 'date2')

    const time1 = date1.getTime()
    const time2 = date2.getTime()

    if (time1 < time2) return -1
    if (time1 > time2) return 1
    return 0
  }
}