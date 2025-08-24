import React, { memo } from 'react';
import { MessageSquare } from 'lucide-react';
import { Typography, Box } from '@mui/material';
import { APP_CONFIG } from '@/config/app.config';

const PostFormHeader = memo(() => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <MessageSquare style={{ fontSize: '2rem', color: 'primary.main' }} />
        {APP_CONFIG.content.headings.postForm}
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        {APP_CONFIG.content.descriptions.postForm}
      </Typography>
    </Box>
  );
});

PostFormHeader.displayName = 'PostFormHeader';

export default PostFormHeader;
