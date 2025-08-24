import React, { memo, useCallback } from 'react';
import { TextField } from '@mui/material';
import { APP_CONFIG } from '@/config/app.config';

interface PostContentInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const PostContentInput = memo<PostContentInputProps>(
  ({ value, onChange, error, disabled = false }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    return (
      <div className='flex-1'>
        <TextField
          label={APP_CONFIG.content.labels.postContent}
          value={value}
          onChange={handleChange}
          placeholder={APP_CONFIG.content.placeholders.postContent}
          inputProps={{
            maxLength: APP_CONFIG.post.maxLength,
          }}
          error={!!error}
          helperText={
            error || `${value.length}/${APP_CONFIG.post.maxLength} characters`
          }
          disabled={disabled}
          required
          fullWidth
          multiline
          rows={4}
          variant='outlined'
          size='medium'
        />
      </div>
    );
  }
);

PostContentInput.displayName = 'PostContentInput';

export default PostContentInput;
