import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a date string or Date object to a consistent YYYY-MM-DD format
 * in the local timezone to avoid timezone offset issues
 */
export function formatToLocalDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

/**
 * Creates a Date object that represents midnight in UTC for the given date
 * to avoid timezone offset issues when storing in the database
 */
export function createUTCDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

/**
 * Compares two dates by converting them to YYYY-MM-DD format first
 * to avoid timezone comparison issues
 */
export function isSameDate(date1: Date | string, date2: Date | string): boolean {
  const d1 = formatToLocalDate(typeof date1 === 'string' ? new Date(date1) : date1)
  const d2 = formatToLocalDate(typeof date2 === 'string' ? new Date(date2) : date2)
  return d1 === d2
}