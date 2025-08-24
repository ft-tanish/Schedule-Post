'use client';

import { useState, FormEvent } from 'react';
import { usePost } from '@/contexts/PostContext';
import { format } from 'date-fns';
import { Send, Clock, MessageSquare } from 'lucide-react';

export default function PostForm() {
  const { addPost } = usePost();
  const [content, setContent] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get minimum datetime (current time + 1 minute)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    return format(now, "yyyy-MM-dd'T'HH:mm");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!content.trim() || !scheduledTime) {
      return;
    }

    const scheduledDate = new Date(scheduledTime);
    const now = new Date();

    if (scheduledDate <= now) {
      // In tests, we'll handle this differently
      if (typeof window !== 'undefined') {
        alert('Please select a future date and time');
      }
      return;
    }

    setIsSubmitting(true);

    try {
      addPost(content.trim(), scheduledDate);
      setContent('');
      setScheduledTime('');
    } catch (error) {
      console.error('Failed to schedule post:', error);
      alert('Failed to schedule post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3'>
          <MessageSquare className='w-8 h-8 text-blue-600' />
          What's on your mind?
        </h1>
        <p className='text-slate-600'>
          Schedule your thoughts to be shared at the perfect moment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='flex-1 flex flex-col gap-6'>
        <div className='flex-1'>
          <label
            htmlFor='content'
            className='block text-sm font-medium text-slate-700 mb-2'
          >
            Your Post
          </label>
          <textarea
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Share your thoughts...'
            className='w-full h-full min-h-[200px] p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-slate-800 placeholder-slate-400'
            maxLength={280}
            required
          />
          <div className='mt-2 flex justify-between items-center text-sm'>
            <span className='text-slate-500'>
              {content.length}/280 characters
            </span>
            {content.length > 250 && (
              <span className='text-orange-600 font-medium'>
                {280 - content.length} remaining
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor='scheduledTime'
            className='block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2'
          >
            <Clock className='w-4 h-4' />
            Schedule for
          </label>
          <input
            type='datetime-local'
            id='scheduledTime'
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            min={getMinDateTime()}
            className='w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            required
          />
        </div>

        <button
          type='submit'
          disabled={!content.trim() || !scheduledTime || isSubmitting}
          className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none'
        >
          {isSubmitting ? (
            <>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              Scheduling...
            </>
          ) : (
            <>
              <Send className='w-4 h-4' />
              Schedule Post
            </>
          )}
        </button>
      </form>
    </div>
  );
}
