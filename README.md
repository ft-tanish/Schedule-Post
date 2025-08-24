# Social Media Scheduler

A beautiful, mobile-friendly social media scheduling application built with Next.js, TypeScript, and Tailwind CSS.

## Features

### ✨ Core Functionality
- **Split Layout Design**: Clean two-panel interface with clipped border decorations
- **Post Scheduling**: Schedule posts for future publishing with date/time picker
- **Auto-Publishing**: Posts automatically publish when their scheduled time arrives
- **Timeline View**: Visual timeline showing scheduled and published posts
- **Real-time Updates**: Current time display with live updates

### 🎨 User Experience
- **Mobile-First Design**: Fully responsive layout that works on all devices
- **Character Limit**: 280-character limit with live counter and warnings
- **Form Validation**: Prevents scheduling posts in the past
- **Loading States**: Visual feedback during form submission
- **Persistent Storage**: Posts saved to localStorage and restored on reload

### 🧪 Quality Assurance
- **Comprehensive Testing**: 21 tests covering all components and functionality
- **TypeScript**: Full type safety throughout the application
- **Modern React**: Uses React 19 with hooks and context for state management
- **Performance**: Optimized with Next.js 15 and Turbopack

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── Layout.tsx         # Split layout with clipped borders
│   ├── PostForm.tsx       # Left side form component
│   └── Timeline.tsx       # Right side timeline component
├── contexts/              # React context providers
│   └── PostContext.tsx    # Post state management
├── types/                 # TypeScript type definitions
│   └── index.ts           # App-wide types
└── __tests__/             # Test files
    ├── components/        # Component tests
    ├── contexts/          # Context tests
    └── integration/       # Integration tests
```

## Architecture

### State Management
The app uses React Context with useReducer for state management:
- **Posts**: Array of scheduled and published posts
- **Current Time**: Live updating current time for auto-publishing
- **Actions**: Add posts, publish posts, update time, load from storage

### Data Flow
1. User creates a post with content and scheduled time
2. Post is stored in context state and localStorage
3. Timer checks every second for posts due to publish
4. Due posts are automatically moved to "published" status
5. Timeline updates in real-time to show current state

### Testing Strategy
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Full app workflows
- **Context Tests**: State management logic
- **Mocking**: localStorage, timers, and external dependencies

## Design Decisions

### Mobile-First Approach
- Uses CSS Grid for responsive layout
- Stacks vertically on mobile, side-by-side on desktop
- Touch-friendly form controls and spacing

### Clipped Border Design
- Custom CSS decorations with rotated squares
- Different implementations for mobile vs desktop
- Maintains visual continuity across screen sizes

### Auto-Publishing Logic
- Uses setInterval to check for due posts every second
- Simulates cron job behavior in the browser
- Graceful handling of browser sleep/wake cycles

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **Date Handling**: date-fns
- **State**: React Context + useReducer
- **Storage**: localStorage API

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run the test suite: `npm test`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).