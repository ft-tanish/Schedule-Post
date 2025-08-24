'use client';

import React, { memo } from 'react';
import { MessageSquare } from 'lucide-react';
import { usePost } from '@/contexts/PostContext.optimized';
import TimelineHeader from './timeline/TimelineHeader';
import PostSection from './timeline/PostSection';
import CurrentTimeDisplay from './timeline/CurrentTimeDisplay';
import EmptyState from './ui/EmptyState';
import { UI_CONFIG, APP_CONFIG } from '@/config';

const Timeline = memo(() => {
  const { state, scheduledPosts, publishedPosts, isLoading } = usePost();

  const { currentTime } = state;
  const hasNoPosts = scheduledPosts.length === 0 && publishedPosts.length === 0;

  if (isLoading) {
    return (
      <div className={`${UI_CONFIG.layout.flex.center} h-full`}>
        <div className={UI_CONFIG.animations.spin} />
      </div>
    );
  }

  return (
    <div className={`${UI_CONFIG.layout.flex.column} h-full`}>
      <TimelineHeader />

      {hasNoPosts ? (
        <EmptyState
          icon={<MessageSquare className={UI_CONFIG.icons.xxlarge} />}
          title={APP_CONFIG.content.messages.noPostsYet}
          description={APP_CONFIG.content.messages.noPostsDescription}
        />
      ) : (
        <div className={`flex-1 overflow-y-auto space-y-6`}>
          <PostSection
            title={APP_CONFIG.content.sections.scheduled(scheduledPosts.length)}
            posts={scheduledPosts}
            currentTime={currentTime}
            variant='scheduled'
          />

          <PostSection
            title={APP_CONFIG.content.sections.published(publishedPosts.length)}
            posts={publishedPosts}
            currentTime={currentTime}
            variant='published'
          />
        </div>
      )}

      <CurrentTimeDisplay currentTime={currentTime} />
    </div>
  );
});

Timeline.displayName = 'Timeline';

export default Timeline;
