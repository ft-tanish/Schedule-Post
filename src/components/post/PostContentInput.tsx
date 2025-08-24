import React, { memo, useCallback } from 'react';
import Textarea from '@/components/ui/Textarea';
import CharacterCounter from './CharacterCounter';
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
        <Textarea
          label={APP_CONFIG.content.labels.postContent}
          value={value}
          onChange={handleChange}
          placeholder={APP_CONFIG.content.placeholders.postContent}
          maxLength={APP_CONFIG.post.maxLength}
          showCharCount={true}
          error={error}
          disabled={disabled}
          required
        />
      </div>
    );
  }
);

PostContentInput.displayName = 'PostContentInput';

export default PostContentInput;
