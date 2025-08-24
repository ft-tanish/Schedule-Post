import { useState, useCallback, useMemo } from 'react';
import { ValidationUtils } from '@/utils/validation.utils';
import { useDebounce } from './useDebounce';

interface FormData {
  content: string;
  scheduledTime: string;
}

interface FormErrors {
  content?: string;
  scheduledTime?: string;
}

interface UseFormValidationReturn {
  formData: FormData;
  errors: FormErrors;
  isValid: boolean;
  isSubmitting: boolean;
  updateField: (field: keyof FormData, value: string) => void;
  resetForm: () => void;
  setSubmitting: (submitting: boolean) => void;
  validateForm: () => boolean;
}

/**
 * Custom hook for form validation with debounced validation
 */
export function useFormValidation(
  initialData: FormData = { content: '', scheduledTime: '' }
): UseFormValidationReturn {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounce form data to avoid excessive validation
  const debouncedFormData = useDebounce(formData, 300);

  // Update field value
  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setIsSubmitting(false);
  }, [initialData]);

  // Set submitting state
  const setSubmitting = useCallback((submitting: boolean) => {
    setIsSubmitting(submitting);
  }, []);

  // Validate form and return if valid
  const validateForm = useCallback((): boolean => {
    const validation = ValidationUtils.validatePostForm(
      formData.content,
      formData.scheduledTime
    );

    setErrors(validation.errors);
    return validation.isValid;
  }, [formData]);

  // Compute if form is valid (for real-time feedback)
  const isValid = useMemo(() => {
    const validation = ValidationUtils.validatePostForm(
      debouncedFormData.content,
      debouncedFormData.scheduledTime
    );
    return validation.isValid;
  }, [debouncedFormData]);

  return {
    formData,
    errors,
    isValid,
    isSubmitting,
    updateField,
    resetForm,
    setSubmitting,
    validateForm,
  };
}
