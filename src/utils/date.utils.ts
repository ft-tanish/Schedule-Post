import { format, formatDistanceToNow } from 'date-fns';
import { APP_CONFIG } from '@/config/app.config';

export class DateUtils {
  /**
   * Get minimum datetime string for input (current time + minimum minutes)
   * Handles timezone properly for datetime-local inputs
   */
  static getMinDateTime(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() + APP_CONFIG.post.minScheduleMinutes);

    // Ensure we get local timezone for datetime-local input
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  /**
   * Check if a date is in the future
   */
  static isFutureDate(date: Date): boolean {
    return date.getTime() > new Date().getTime();
  }

  /**
   * Format date for display
   */
  static formatDisplay(date: Date): string {
    return format(date, APP_CONFIG.dateFormats.display);
  }

  /**
   * Format date with seconds for display
   */
  static formatDisplayWithSeconds(date: Date): string {
    return format(date, APP_CONFIG.dateFormats.displayWithSeconds);
  }

  /**
   * Get time distance to now
   */
  static getTimeDistance(date: Date): string {
    return formatDistanceToNow(date);
  }

  /**
   * Check if post is overdue
   */
  static isOverdue(scheduledTime: Date, currentTime: Date): boolean {
    return scheduledTime.getTime() < currentTime.getTime();
  }

  /**
   * Get time until post should be published
   */
  static getTimeUntilPost(scheduledTime: Date, currentTime: Date): number {
    return scheduledTime.getTime() - currentTime.getTime();
  }
}
