import { render, screen } from '@testing-library/react';
import Timeline from '@/components/Timeline';
import { PostProvider } from '@/contexts/PostContext';
import { Post } from '@/types';
import React from 'react';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <PostProvider>{children}</PostProvider>
);

describe('Timeline', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders timeline header correctly', () => {
    render(
      <TestWrapper>
        <Timeline />
      </TestWrapper>
    );

    expect(screen.getByText('Your Posts')).toBeInTheDocument();
    expect(
      screen.getByText('Track your scheduled and published content.')
    ).toBeInTheDocument();
  });

  it('shows empty state when no posts exist', () => {
    render(
      <TestWrapper>
        <Timeline />
      </TestWrapper>
    );

    expect(screen.getByText('No posts yet')).toBeInTheDocument();
    expect(
      screen.getByText('Schedule your first post to see it appear here!')
    ).toBeInTheDocument();
  });

  it('shows current time', () => {
    render(
      <TestWrapper>
        <Timeline />
      </TestWrapper>
    );

    expect(screen.getByText(/Current time:/)).toBeInTheDocument();
  });
});
