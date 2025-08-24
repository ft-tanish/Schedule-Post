'use client';

import { usePost } from '@/contexts/PostContext';
import { format, formatDistanceToNow } from 'date-fns';
import {
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  MessageSquare,
} from 'lucide-react';
import { clsx } from 'clsx';

export default function Timeline() {
  const { state } = usePost();
  const { posts, currentTime } = state;

  const scheduledPosts = posts.filter((post) => post.status === 'scheduled');
  const publishedPosts = posts.filter((post) => post.status === 'published');

  return (
    <div className='h-full flex flex-col'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3'>
          <Calendar className='w-8 h-8 text-green-600' />
          Your Posts
        </h2>
        <p className='text-slate-600'>
          Track your scheduled and published content.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center py-12'>
            <MessageSquare className='w-16 h-16 text-slate-300 mx-auto mb-4' />
            <h3 className='text-xl font-medium text-slate-500 mb-2'>
              No posts yet
            </h3>
            <p className='text-slate-400'>
              Schedule your first post to see it appear here!
            </p>
          </div>
        </div>
      ) : (
        <div className='flex-1 overflow-y-auto space-y-6'>
          {/* Scheduled Posts */}
          {scheduledPosts.length > 0 && (
            <div>
              <h3 className='text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2'>
                <Clock className='w-5 h-5 text-blue-600' />
                Scheduled ({scheduledPosts.length})
              </h3>
              <div className='space-y-3'>
                {scheduledPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentTime={currentTime}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Published Posts */}
          {publishedPosts.length > 0 && (
            <div>
              <h3 className='text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2'>
                <CheckCircle className='w-5 h-5 text-green-600' />
                Published ({publishedPosts.length})
              </h3>
              <div className='space-y-3'>
                {publishedPosts
                  .sort(
                    (a, b) =>
                      new Date(b.publishedTime!).getTime() -
                      new Date(a.publishedTime!).getTime()
                  )
                  .map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      currentTime={currentTime}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Current Time Display */}
      <div className='mt-6 pt-4 border-t border-slate-200'>
        <div className='text-center text-sm text-slate-500'>
          Current time: {format(currentTime, 'MMM dd, yyyy • HH:mm:ss')}
        </div>
      </div>
    </div>
  );
}

interface PostCardProps {
  post: any;
  currentTime: Date;
}

function PostCard({ post, currentTime }: PostCardProps) {
  const isScheduled = post.status === 'scheduled';
  const timeUntilPost = isScheduled
    ? new Date(post.scheduledTime).getTime() - currentTime.getTime()
    : null;

  const isOverdue = isScheduled && timeUntilPost !== null && timeUntilPost < 0;

  return (
    <div
      className={clsx(
        'p-4 rounded-lg border-2 transition-all duration-200',
        isScheduled
          ? isOverdue
            ? 'border-red-200 bg-red-50'
            : 'border-blue-200 bg-blue-50'
          : 'border-green-200 bg-green-50'
      )}
    >
      <div className='flex items-start gap-3'>
        <div className='flex-shrink-0 mt-1'>
          {isScheduled ? (
            <Circle
              className={clsx(
                'w-5 h-5',
                isOverdue ? 'text-red-500' : 'text-blue-500'
              )}
            />
          ) : (
            <CheckCircle className='w-5 h-5 text-green-500' />
          )}
        </div>

        <div className='flex-1 min-w-0'>
          <p className='text-slate-800 text-sm leading-relaxed mb-3 break-words'>
            {post.content}
          </p>

          <div className='space-y-1 text-xs text-slate-600'>
            {isScheduled ? (
              <>
                <div className='flex items-center gap-1'>
                  <Clock className='w-3 h-3' />
                  <span>
                    Scheduled for{' '}
                    {format(
                      new Date(post.scheduledTime),
                      'MMM dd, yyyy • HH:mm'
                    )}
                  </span>
                </div>
                {timeUntilPost !== null && (
                  <div
                    className={clsx(
                      'font-medium',
                      isOverdue ? 'text-red-600' : 'text-blue-600'
                    )}
                  >
                    {isOverdue
                      ? `Overdue by ${formatDistanceToNow(
                          new Date(post.scheduledTime)
                        )}`
                      : `In ${formatDistanceToNow(
                          new Date(post.scheduledTime)
                        )}`}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className='flex items-center gap-1'>
                  <CheckCircle className='w-3 h-3' />
                  <span>
                    Published{' '}
                    {format(
                      new Date(post.publishedTime!),
                      'MMM dd, yyyy • HH:mm'
                    )}
                  </span>
                </div>
                <div className='text-green-600 font-medium'>
                  {formatDistanceToNow(new Date(post.publishedTime!))} ago
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
