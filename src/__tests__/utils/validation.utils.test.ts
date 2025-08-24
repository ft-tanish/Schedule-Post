import { ValidationUtils } from '@/utils/validation.utils';

describe('ValidationUtils', () => {
  describe('validatePostContent', () => {
    it('should validate empty content as invalid', () => {
      const result = ValidationUtils.validatePostContent('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Post content is required');
    });

    it('should validate whitespace-only content as invalid', () => {
      const result = ValidationUtils.validatePostContent('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Post content is required');
    });

    it('should validate content exceeding max length as invalid', () => {
      const longContent = 'a'.repeat(281);
      const result = ValidationUtils.validatePostContent(longContent);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot exceed 280 characters');
    });

    it('should validate valid content as valid', () => {
      const result = ValidationUtils.validatePostContent('Valid content');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('validateScheduledTime', () => {
    it('should validate empty time as invalid', () => {
      const result = ValidationUtils.validateScheduledTime('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Scheduled time is required');
    });

    it('should validate invalid date format as invalid', () => {
      const result = ValidationUtils.validateScheduledTime('invalid-date');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid date format');
    });

    it('should validate past date as invalid', () => {
      const pastDate = new Date(Date.now() - 1000 * 60 * 60); // 1 hour ago
      const result = ValidationUtils.validateScheduledTime(
        pastDate.toISOString()
      );
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('future date');
    });

    it('should validate future date as valid', () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now
      const result = ValidationUtils.validateScheduledTime(
        futureDate.toISOString()
      );
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
      expect(result.date).toBeInstanceOf(Date);
    });
  });

  describe('validatePostForm', () => {
    it('should validate complete form with valid data', () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60);
      const result = ValidationUtils.validatePostForm(
        'Valid content',
        futureDate.toISOString()
      );

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
      expect(result.data).toBeDefined();
      expect(result.data?.content).toBe('Valid content');
      expect(result.data?.scheduledTime).toBeInstanceOf(Date);
    });

    it('should validate form with invalid content and time', () => {
      const result = ValidationUtils.validatePostForm('', 'invalid-date');

      expect(result.isValid).toBe(false);
      expect(result.errors.content).toBe('Post content is required');
      expect(result.errors.scheduledTime).toBe('Invalid date format');
      expect(result.data).toBeUndefined();
    });
  });
});
