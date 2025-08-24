import React, { memo } from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import PostCard from './PostCard';
import { Post } from '@/types';
import { UI_CONFIG, APP_CONFIG } from '@/config';

interface PostSectionProps {
  title: string;
  posts: Post[];
  currentTime: Date;
  variant: 'scheduled' | 'published';
}

const PostSection = memo<PostSectionProps>(
  ({ title, posts, currentTime, variant }) => {
    if (posts.length === 0) {
      return null;
    }

    const icon =
      variant === 'scheduled' ? (
        <Clock
          className={`${UI_CONFIG.icons.large} ${UI_CONFIG.colors.primary.text}`}
        />
      ) : (
        <CheckCircle
          className={`${UI_CONFIG.icons.large} ${UI_CONFIG.colors.success.text}`}
        />
      );

    const sortedPosts =
      variant === 'published'
        ? [...posts].sort(
            (a, b) =>
              new Date(b.publishedTime!).getTime() -
              new Date(a.publishedTime!).getTime()
          )
        : posts;

    return (
      <div>
        <h3
          className={`${UI_CONFIG.typography.heading.secondary} ${UI_CONFIG.colors.neutral[700]}`}
        >
          {icon}
          {title}
        </h3>
        <div className={`space-y-3`}>
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} currentTime={currentTime} />
          ))}
        </div>
      </div>
    );
  }
);

PostSection.displayName = 'PostSection';

export default PostSection;
