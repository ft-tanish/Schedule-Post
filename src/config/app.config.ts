export const APP_CONFIG = {
  // App metadata
  app: {
    name: 'Social Scheduler',
    description:
      'Schedule and manage your social media posts with our intuitive timeline interface',
    version: '1.0.0',
  },

  // Post configuration
  post: {
    maxLength: 280,
    warningThreshold: 250,
    minScheduleMinutes: 1, // Minimum minutes in the future
  },

  // Timing configuration
  timing: {
    updateInterval: 1000, // 1 second
    autoPublishCheckInterval: 1000, // 1 second
  },

  // Storage configuration
  storage: {
    keys: {
      posts: 'scheduledPosts',
      userPreferences: 'userPreferences',
    },
    version: '1.0',
  },

  // UI text content
  content: {
    headings: {
      postForm: "What's on your mind?",
      timeline: 'Your Posts',
    },
    descriptions: {
      postForm: 'Schedule your thoughts to be shared at the perfect moment.',
      timeline: 'Track your scheduled and published content.',
    },
    labels: {
      postContent: 'Your Post',
      scheduleTime: 'Schedule for',
      submitButton: 'Schedule Post',
      submitting: 'Scheduling...',
    },
    placeholders: {
      postContent: 'Share your thoughts...',
    },
    messages: {
      noPostsYet: 'No posts yet',
      noPostsDescription: 'Schedule your first post to see it appear here!',
      characterCount: (current: number, max: number) =>
        `${current}/${max} characters`,
      charactersRemaining: (remaining: number) => `${remaining} remaining`,
      scheduledFor: 'Scheduled for',
      published: 'Published',
      currentTime: 'Current time:',
      overdueBy: (time: string) => `Overdue by ${time}`,
      publishesIn: (time: string) => `In ${time}`,
      publishedAgo: (time: string) => `${time} ago`,
      futureDateError: 'Please select a future date and time',
    },
    sections: {
      scheduled: (count: number) => `Scheduled (${count})`,
      published: (count: number) => `Published (${count})`,
    },
  },

  // Date format patterns
  dateFormats: {
    display: 'MMM dd, yyyy • HH:mm',
    displayWithSeconds: 'MMM dd, yyyy • HH:mm:ss',
    input: "yyyy-MM-dd'T'HH:mm",
  },

  // Performance configuration
  performance: {
    debounceMs: 300,
    memoizationKeys: {
      posts: 'posts',
      currentTime: 'currentTime',
    },
  },
} as const;
