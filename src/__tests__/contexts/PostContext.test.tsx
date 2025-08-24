import { renderHook, act } from '@testing-library/react';
import { PostProvider, usePost } from '@/contexts/PostContext';
import { ReactNode } from 'react';

// Mock localStorage - will use the global mock from jest.setup.js

// Mock uuid
jest.mock('uuid', () => ({
  v4: () => 'mock-uuid',
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <PostProvider>{children}</PostProvider>
);

describe('PostContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
  });

  it('provides initial state correctly', () => {
    const { result } = renderHook(() => usePost(), { wrapper });

    expect(result.current.state.posts).toEqual([]);
    expect(result.current.state.currentTime).toBeInstanceOf(Date);
  });

  it('adds a new post correctly', () => {
    const { result } = renderHook(() => usePost(), { wrapper });

    act(() => {
      result.current.addPost('Test post', new Date('2025-01-01T12:00:00Z'));
    });

    expect(result.current.state.posts).toHaveLength(1);
    expect(result.current.state.posts[0]).toMatchObject({
      id: 'mock-uuid',
      content: 'Test post',
      status: 'scheduled',
    });
  });

  it('sorts posts by scheduled time', () => {
    const { result } = renderHook(() => usePost(), { wrapper });

    act(() => {
      result.current.addPost('Later post', new Date('2025-01-02T12:00:00Z'));
      result.current.addPost('Earlier post', new Date('2025-01-01T12:00:00Z'));
    });

    expect(result.current.state.posts[0].content).toBe('Earlier post');
    expect(result.current.state.posts[1].content).toBe('Later post');
  });

  it('publishes due posts automatically', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => usePost(), { wrapper });

    // Add a post scheduled for the past
    act(() => {
      result.current.addPost('Past post', new Date('2020-01-01T12:00:00Z'));
    });

    // Fast-forward time to trigger the effect
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.state.posts[0].status).toBe('published');
    expect(result.current.state.posts[0].publishedTime).toBeInstanceOf(Date);

    jest.useRealTimers();
  });

  it('loads posts from localStorage on mount', () => {
    const savedPosts = JSON.stringify([
      {
        id: '1',
        content: 'Saved post',
        scheduledTime: '2025-01-01T12:00:00Z',
        status: 'scheduled',
        createdAt: '2024-01-01T10:00:00Z',
      },
    ]);

    (localStorage.getItem as jest.Mock).mockReturnValue(savedPosts);

    const { result } = renderHook(() => usePost(), { wrapper });

    // Wait for the effect to run
    act(() => {});

    expect(result.current.state.posts).toHaveLength(1);
    expect(result.current.state.posts[0].content).toBe('Saved post');
  });

  it('saves posts to localStorage when posts change', () => {
    const { result } = renderHook(() => usePost(), { wrapper });

    act(() => {
      result.current.addPost('Test post', new Date('2025-01-01T12:00:00Z'));
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'scheduledPosts',
      expect.stringContaining('Test post')
    );
  });

  it('throws error when used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      renderHook(() => usePost());
    }).toThrow('usePost must be used within a PostProvider');

    consoleError.mockRestore();
  });
});
