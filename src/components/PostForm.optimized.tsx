'use client';

import React, { memo, useCallback } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { usePost } from '@/contexts/PostContext.optimized';
import { useFormValidation } from '@/hooks/useFormValidation';
import { ValidationUtils } from '@/utils/validation.utils';
import PostFormHeader from './post/PostFormHeader';
import PostContentInput from './post/PostContentInput';
import ScheduleTimeInput from './post/ScheduleTimeInput';
import SubmitButton from './post/SubmitButton';

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PostFormHeader />

      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: 3,
        }}
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
      </Box>
    </Box>
  );
});

PostForm.displayName = 'PostForm';

export default PostForm;
