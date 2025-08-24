import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostForm from '@/components/PostForm';
import { PostProvider } from '@/contexts/PostContext';
import { format } from 'date-fns';

// Mock date-fns to have consistent test behavior
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  format: jest.fn(),
}));

const MockedFormat = format as jest.MockedFunction<typeof format>;

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <PostProvider>{children}</PostProvider>
);

describe('PostForm', () => {
  beforeEach(() => {
    MockedFormat.mockImplementation((date, formatStr) => {
      if (formatStr === "yyyy-MM-dd'T'HH:mm") {
        return '2024-01-01T12:00';
      }
      return 'mocked-date';
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    render(
      <TestWrapper>
        <PostForm />
      </TestWrapper>
    );

    expect(screen.getByText("What's on your mind?")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Share your thoughts...')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Schedule for')).toBeInTheDocument();
    expect(screen.getByText('Schedule Post')).toBeInTheDocument();
  });

  it('updates character count as user types', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <PostForm />
      </TestWrapper>
    );

    const textarea = screen.getByPlaceholderText('Share your thoughts...');
    await user.type(textarea, 'Hello world!');

    expect(screen.getByText('12/280 characters')).toBeInTheDocument();
  });

  it('shows warning when approaching character limit', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <PostForm />
      </TestWrapper>
    );

    const textarea = screen.getByPlaceholderText('Share your thoughts...');
    const longText = 'a'.repeat(251);
    await user.type(textarea, longText);

    expect(screen.getByText('29 remaining')).toBeInTheDocument();
  });

  it('disables submit button when form is invalid', () => {
    render(
      <TestWrapper>
        <PostForm />
      </TestWrapper>
    );

    const submitButton = screen.getByText('Schedule Post');
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when form is valid', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <PostForm />
      </TestWrapper>
    );

    const textarea = screen.getByPlaceholderText('Share your thoughts...');
    const datetimeInput = screen.getByLabelText('Schedule for');
    const submitButton = screen.getByText('Schedule Post');

    await user.type(textarea, 'Test post');
    await user.type(datetimeInput, '2025-01-01T12:00');

    expect(submitButton).toBeEnabled();
  });

  it('clears form after successful submission', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <PostForm />
      </TestWrapper>
    );

    const textarea = screen.getByPlaceholderText('Share your thoughts...');
    const datetimeInput = screen.getByLabelText('Schedule for');
    const submitButton = screen.getByText('Schedule Post');

    await user.type(textarea, 'Test post');
    // Use a future date that's definitely valid
    await user.type(datetimeInput, '2030-12-31T23:59');

    // Submit the form
    await user.click(submitButton);

    // Wait for the form to be cleared
    await waitFor(
      () => {
        expect(textarea).toHaveValue('');
        expect(datetimeInput).toHaveValue('');
      },
      { timeout: 5000 }
    );
  });
});
