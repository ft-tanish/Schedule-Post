import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';
import { PostProvider } from '@/contexts/PostContext.optimized';

// localStorage is mocked globally in jest.setup.js

// Mock uuid
jest.mock('uuid', () => ({
  v4: () => `mock-uuid-${Date.now()}`,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <PostProvider>{children}</PostProvider>
);

describe('App Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    localStorage.clear();
  });

  it('allows user to create and view a scheduled post', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    // Verify initial empty state
    expect(screen.getByText('No posts yet')).toBeInTheDocument();

    // Fill out the form
    const textarea = screen.getByPlaceholderText('Share your thoughts...');
    const datetimeInput = screen.getByLabelText('Schedule for');
    const submitButton = screen.getByText('Schedule Post');

    await user.type(textarea, 'My first scheduled post!');
    await user.type(datetimeInput, '2025-12-31T23:59');

    // Submit the form
    await user.click(submitButton);

    // Verify the post appears in the timeline
    await waitFor(() => {
      expect(screen.getByText('My first scheduled post!')).toBeInTheDocument();
      expect(screen.getByText('Scheduled (1)')).toBeInTheDocument();
    });

    // Verify form is cleared
    expect(textarea).toHaveValue('');
    expect(datetimeInput).toHaveValue('');
  });

  it('shows multiple posts in correct order', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    // Add first post (later date)
    const textarea = screen.getByPlaceholderText('Share your thoughts...');
    const datetimeInput = screen.getByLabelText('Schedule for');
    const submitButton = screen.getByText('Schedule Post');

    await user.type(textarea, 'Later post');
    await user.type(datetimeInput, '2025-12-31T23:59');
    await user.click(submitButton);

    // Add second post (earlier date)
    await user.type(textarea, 'Earlier post');
    await user.clear(datetimeInput);
    await user.type(datetimeInput, '2025-06-15T12:00');
    await user.click(submitButton);

    // Verify posts are shown in chronological order
    await waitFor(() => {
      const posts = screen.getAllByText(/post/);
      const postTexts = posts.map((el) => el.textContent);
      expect(postTexts.indexOf('Earlier post')).toBeLessThan(
        postTexts.indexOf('Later post')
      );
    });
  });

  it('validates form inputs correctly', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    const submitButton = screen.getByText('Schedule Post');

    // Button should be disabled initially
    expect(submitButton).toBeDisabled();

    // Add content but no date
    const textarea = screen.getByPlaceholderText('Share your thoughts...');
    await user.type(textarea, 'Test content');
    expect(submitButton).toBeDisabled();

    // Add date
    const datetimeInput = screen.getByLabelText('Schedule for');
    await user.type(datetimeInput, '2025-12-31T23:59');
    expect(submitButton).toBeEnabled();

    // Clear content
    await user.clear(textarea);
    expect(submitButton).toBeDisabled();
  });

  it('handles character limit correctly', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    const textarea = screen.getByPlaceholderText('Share your thoughts...');

    // Type exactly 280 characters
    const longText = 'a'.repeat(280);
    await user.type(textarea, longText);

    expect(screen.getByText('280/280 characters')).toBeInTheDocument();
    expect(screen.getByText('0 remaining')).toBeInTheDocument();

    // Try to type more (should be prevented by maxLength)
    await user.type(textarea, 'b');
    expect(textarea).toHaveValue(longText); // Should still be 280 chars
  });

  it('displays current time and updates', async () => {
    jest.useFakeTimers();

    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    // Check that current time is displayed
    expect(screen.getByText(/Current time:/)).toBeInTheDocument();

    // Advance time and check it updates
    const initialTimeText = screen.getByText(/Current time:/).textContent;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      const newTimeText = screen.getByText(/Current time:/).textContent;
      expect(newTimeText).not.toBe(initialTimeText);
    });

    jest.useRealTimers();
  });
});
