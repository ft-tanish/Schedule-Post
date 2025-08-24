import React, { memo, useMemo } from 'react';
import { Clock, CheckCircle, Circle } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '@/components/ui/Card';
import { Post } from '@/types';
import { DateUtils } from '@/utils/date.utils';
import { UI_CONFIG, APP_CONFIG } from '@/config';

interface PostCardProps {
  post: Post;
  currentTime: Date;
}

const PostCard = memo<PostCardProps>(({ post, currentTime }) => {
  const postData = useMemo(() => {
    const isScheduled = post.status === 'scheduled';
    const timeUntilPost = isScheduled
      ? DateUtils.getTimeUntilPost(new Date(post.scheduledTime), currentTime)
      : null;
    const isOverdue =
      isScheduled && timeUntilPost !== null && timeUntilPost < 0;

    return {
      isScheduled,
      isOverdue,
      timeUntilPost,
    };
  }, [post, currentTime]);

  const { isScheduled, isOverdue } = postData;

  const cardVariant = useMemo(() => {
    if (isScheduled) {
      return isOverdue ? 'scheduledOverdue' : 'scheduled';
    }
    return 'published';
  }, [isScheduled, isOverdue]);

  const statusIcon = useMemo(() => {
    if (isScheduled) {
      return (
        <Circle
          className={clsx(
            UI_CONFIG.icons.large,
            isOverdue
              ? UI_CONFIG.colors.error[500]
              : UI_CONFIG.colors.primary.text
          )}
        />
      );
    }
    return (
      <CheckCircle
        className={`${UI_CONFIG.icons.large} ${UI_CONFIG.colors.success.text}`}
      />
    );
  }, [isScheduled, isOverdue]);

  const timeInfo = useMemo(() => {
    if (isScheduled) {
      const scheduledTimeStr = DateUtils.formatDisplay(
        new Date(post.scheduledTime)
      );
      const timeDistance = DateUtils.getTimeDistance(
        new Date(post.scheduledTime)
      );

      return {
        label: APP_CONFIG.content.messages.scheduledFor,
        time: scheduledTimeStr,
        distance: isOverdue
          ? APP_CONFIG.content.messages.overdueBy(timeDistance)
          : APP_CONFIG.content.messages.publishesIn(timeDistance),
        distanceColor: isOverdue
          ? UI_CONFIG.colors.error[600]
          : UI_CONFIG.colors.primary.textDark,
      };
    } else {
      const publishedTimeStr = DateUtils.formatDisplay(
        new Date(post.publishedTime!)
      );
      const timeDistance = DateUtils.getTimeDistance(
        new Date(post.publishedTime!)
      );

      return {
        label: APP_CONFIG.content.messages.published,
        time: publishedTimeStr,
        distance: APP_CONFIG.content.messages.publishedAgo(timeDistance),
        distanceColor: UI_CONFIG.colors.success.text,
      };
    }
  }, [post, isScheduled, isOverdue]);

  return (
    <Card variant={cardVariant}>
      <div
        className={`${UI_CONFIG.layout.flex.row} items-start ${UI_CONFIG.spacing.gap.medium}`}
      >
        <div className='flex-shrink-0 mt-1'>{statusIcon}</div>

        <div className='flex-1 min-w-0'>
          <p
            className={`${UI_CONFIG.colors.neutral[800]} ${UI_CONFIG.typography.body.primary} mb-3 break-words`}
          >
            {post.content}
          </p>

          <div
            className={`space-y-1 ${UI_CONFIG.typography.body.secondary} ${UI_CONFIG.colors.neutral[600]}`}
          >
            <div
              className={`${UI_CONFIG.layout.flex.row} ${UI_CONFIG.spacing.gap.small}`}
            >
              {isScheduled ? (
                <Clock className={UI_CONFIG.icons.small} />
              ) : (
                <CheckCircle className={UI_CONFIG.icons.small} />
              )}
              <span>
                {timeInfo.label} {timeInfo.time}
              </span>
            </div>

            <div className={clsx('font-medium', timeInfo.distanceColor)}>
              {timeInfo.distance}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});

PostCard.displayName = 'PostCard';

export default PostCard;
