export const UI_CONFIG = {
  // Theme colors
  colors: {
    primary: {
      50: 'bg-blue-50',
      100: 'bg-blue-100',
      500: 'bg-blue-500',
      600: 'bg-blue-600',
      700: 'bg-blue-700',
      text: 'text-blue-600',
      textDark: 'text-blue-700',
      border: 'border-blue-200',
    },
    success: {
      50: 'bg-green-50',
      500: 'bg-green-500',
      600: 'bg-green-600',
      text: 'text-green-600',
      border: 'border-green-200',
    },
    warning: {
      50: 'bg-orange-50',
      600: 'text-orange-600',
    },
    error: {
      50: 'bg-red-50',
      500: 'text-red-500',
      600: 'text-red-600',
      border: 'border-red-200',
    },
    neutral: {
      50: 'bg-slate-50',
      100: 'bg-slate-100',
      200: 'border-slate-200',
      300: 'border-slate-300',
      400: 'text-slate-400',
      500: 'text-slate-500',
      600: 'text-slate-600',
      700: 'text-slate-700',
      800: 'text-slate-800',
    },
  },

  // Typography
  typography: {
    heading: {
      primary: 'text-3xl font-bold mb-2 flex items-center gap-3',
      secondary: 'text-lg font-semibold mb-4 flex items-center gap-2',
      tertiary: 'text-xl font-medium mb-2',
    },
    body: {
      primary: 'text-sm leading-relaxed',
      secondary: 'text-xs',
    },
  },

  // Spacing
  spacing: {
    section: 'mb-8',
    element: 'mb-4',
    small: 'mb-2',
    gap: {
      small: 'gap-2',
      medium: 'gap-3',
      large: 'gap-6',
    },
    padding: {
      small: 'p-3',
      medium: 'p-4',
      large: 'p-6 md:p-8',
    },
  },

  // Layout
  layout: {
    container: 'max-w-7xl mx-auto h-full',
    grid: 'grid grid-cols-1 lg:grid-cols-2 gap-0 h-full min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)]',
    flex: {
      column: 'flex flex-col',
      row: 'flex items-center',
      center: 'flex items-center justify-center',
      between: 'flex justify-between items-center',
    },
  },

  // Form elements
  form: {
    input:
      'w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
    textarea:
      'w-full h-full min-h-[200px] p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-slate-800 placeholder-slate-400',
    label: 'block text-sm font-medium text-slate-700 mb-2',
    button: {
      primary:
        'w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none',
    },
  },

  // Cards and containers
  card: {
    base: 'p-4 rounded-lg border-2 transition-all duration-200',
    scheduled: 'border-blue-200 bg-blue-50',
    scheduledOverdue: 'border-red-200 bg-red-50',
    published: 'border-green-200 bg-green-50',
    white: 'bg-white',
  },

  // Animations
  animations: {
    spin: 'w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin',
    transition: 'transition-all duration-200',
  },

  // Icons sizes
  icons: {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
    xlarge: 'w-8 h-8',
    xxlarge: 'w-16 h-16',
  },
} as const;
