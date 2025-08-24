'use client';

import React, { memo, useCallback } from 'react';
import { usePost } from '@/contexts/PostContext.optimized';
import { useFormValidation } from '@/hooks/useFormValidation';
import { ValidationUtils } from '@/utils/validation.utils';
import PostFormHeader from './post/PostFormHeader';
import PostContentInput from './post/PostContentInput';
import ScheduleTimeInput from './post/ScheduleTimeInput';
import SubmitButton from './post/SubmitButton';
import { UI_CONFIG, APP_CONFIG } from '@/config';

const PostForm = memo(() => {
  const { addPost, isLoading } = usePost();
  const {
    formData,
    errors,
    isValid,
    isSubmitting,
    updateField,
    resetForm,
    setSubmitting,
    validateForm,
  } = useFormValidation();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      const validation = ValidationUtils.validatePostForm(
        formData.content,
        formData.scheduledTime
      );

      if (!validation.isValid || !validation.data) {
        return;
      }

      setSubmitting(true);

      try {
        addPost(validation.data.content, validation.data.scheduledTime);
        resetForm();
      } catch (error) {
        console.error('Failed to schedule post:', error);
        // In a real app, you might want to show a toast notification here
      } finally {
        setSubmitting(false);
      }
    },
    [formData, validateForm, setSubmitting, addPost, resetForm]
  );

  const handleContentChange = useCallback(
    (value: string) => {
      updateField('content', value);
    },
    [updateField]
  );

  const handleTimeChange = useCallback(
    (value: string) => {
      updateField('scheduledTime', value);
    },
    [updateField]
  );

  if (isLoading) {
    return (
      <div className={`${UI_CONFIG.layout.flex.center} h-full`}>
        <div className={UI_CONFIG.animations.spin} />
      </div>
    );
  }

  return (
    <div className={`${UI_CONFIG.layout.flex.column} h-full`}>
      <PostFormHeader />

      <form
        onSubmit={handleSubmit}
        className={`${UI_CONFIG.layout.flex.column} flex-1 ${UI_CONFIG.spacing.gap.large}`}
        noValidate
      >
        <PostContentInput
          value={formData.content}
          onChange={handleContentChange}
          error={errors.content}
          disabled={isSubmitting}
        />

        <ScheduleTimeInput
          value={formData.scheduledTime}
          onChange={handleTimeChange}
          error={errors.scheduledTime}
          disabled={isSubmitting}
        />

        <SubmitButton isValid={isValid} isSubmitting={isSubmitting} />
      </form>
    </div>
  );
});

PostForm.displayName = 'PostForm';

export default PostForm;
