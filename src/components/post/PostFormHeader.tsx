import React, { memo } from 'react';
import { MessageSquare } from 'lucide-react';
import { UI_CONFIG, APP_CONFIG } from '@/config';

const PostFormHeader = memo(() => {
  return (
    <div className={UI_CONFIG.spacing.section}>
      <h1
        className={`${UI_CONFIG.typography.heading.primary} ${UI_CONFIG.colors.neutral[800]}`}
      >
        <MessageSquare
          className={`${UI_CONFIG.icons.xlarge} ${UI_CONFIG.colors.primary.text}`}
        />
        {APP_CONFIG.content.headings.postForm}
      </h1>
      <p className={UI_CONFIG.colors.neutral[600]}>
        {APP_CONFIG.content.descriptions.postForm}
      </p>
    </div>
  );
});

PostFormHeader.displayName = 'PostFormHeader';

export default PostFormHeader;
