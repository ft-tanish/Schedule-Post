import { APP_CONFIG } from '@/config/app.config';
import { DateUtils } from './date.utils';

export class ValidationUtils {
  /**
   * Validate post content
   */
  static validatePostContent(content: string): {
    isValid: boolean;
    error?: string;
  } {
    if (!content || !content.trim()) {
      return {
        isValid: false,
        error: 'Post content is required',
      };
    }

    if (content.length > APP_CONFIG.post.maxLength) {
      return {
        isValid: false,
        error: `Post content cannot exceed ${APP_CONFIG.post.maxLength} characters`,
      };
    }

    return { isValid: true };
  }

  /**
   * Validate scheduled time
   */
  static validateScheduledTime(scheduledTime: string): {
    isValid: boolean;
    error?: string;
    date?: Date;
  } {
    if (!scheduledTime) {
      return {
        isValid: false,
        error: 'Scheduled time is required',
      };
    }

    const date = new Date(scheduledTime);

    if (isNaN(date.getTime())) {
      return {
        isValid: false,
        error: 'Invalid date format',
      };
    }

    if (!DateUtils.isFutureDate(date)) {
      return {
        isValid: false,
        error: APP_CONFIG.content.messages.futureDateError,
      };
    }

    return {
      isValid: true,
      date,
    };
  }

  /**
   * Validate complete post form
   */
  static validatePostForm(
    content: string,
    scheduledTime: string
  ): {
    isValid: boolean;
    errors: {
      content?: string;
      scheduledTime?: string;
    };
    data?: {
      content: string;
      scheduledTime: Date;
    };
  } {
    const contentValidation = this.validatePostContent(content);
    const timeValidation = this.validateScheduledTime(scheduledTime);

    const errors: { content?: string; scheduledTime?: string } = {};

    if (!contentValidation.isValid) {
      errors.content = contentValidation.error;
    }

    if (!timeValidation.isValid) {
      errors.scheduledTime = timeValidation.error;
    }

    const isValid = contentValidation.isValid && timeValidation.isValid;

    return {
      isValid,
      errors,
      data: isValid
        ? {
            content: content.trim(),
            scheduledTime: timeValidation.date!,
          }
        : undefined,
    };
  }
}
