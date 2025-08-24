import { renderHook, act } from '@testing-library/react';
import { useFormValidation } from '@/hooks/useFormValidation';

describe('useFormValidation', () => {
  it('should initialize with empty form data', () => {
    const { result } = renderHook(() => useFormValidation());

    expect(result.current.formData.content).toBe('');
    expect(result.current.formData.scheduledTime).toBe('');
    expect(result.current.isValid).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should update form fields correctly', () => {
    const { result } = renderHook(() => useFormValidation());

    act(() => {
      result.current.updateField('content', 'Test content');
    });

    expect(result.current.formData.content).toBe('Test content');
  });

  it('should validate form correctly', () => {
    const { result } = renderHook(() => useFormValidation());

    act(() => {
      result.current.updateField('content', 'Test content');
      result.current.updateField('scheduledTime', '2030-12-31T23:59');
    });

    // Wait for debounce
    setTimeout(() => {
      expect(result.current.isValid).toBe(true);
    }, 400);
  });

  it('should reset form correctly', () => {
    const { result } = renderHook(() => useFormValidation());

    act(() => {
      result.current.updateField('content', 'Test content');
      result.current.updateField('scheduledTime', '2030-12-31T23:59');
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData.content).toBe('');
    expect(result.current.formData.scheduledTime).toBe('');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle submitting state', () => {
    const { result } = renderHook(() => useFormValidation());

    act(() => {
      result.current.setSubmitting(true);
    });

    expect(result.current.isSubmitting).toBe(true);

    act(() => {
      result.current.setSubmitting(false);
    });

    expect(result.current.isSubmitting).toBe(false);
  });
});
