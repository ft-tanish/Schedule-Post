'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { Post, AppState } from '@/types';
import { StorageUtils } from '@/utils/storage.utils';
import { v4 as uuidv4 } from 'uuid';

type PostAction =
  | { type: 'ADD_POST'; payload: Omit<Post, 'id' | 'createdAt' | 'status'> }
  | { type: 'PUBLISH_POST'; payload: string }
  | { type: 'LOAD_POSTS'; payload: Post[] }
  | { type: 'CLEAR_POSTS' }
  | { type: 'DELETE_POST'; payload: string };

interface PostContextType {
  state: AppState;
  dispatch: React.Dispatch<PostAction>;
  addPost: (content: string, scheduledTime: Date) => void;
  deletePost: (postId: string) => void;
  clearAllPosts: () => void;
  publishDuePosts: () => void;
  scheduledPosts: Post[];
  publishedPosts: Post[];
  isLoading: boolean;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

const initialState: AppState = {
  posts: [],
  currentTime: new Date(),
};

function postReducer(state: AppState, action: PostAction): AppState {
  switch (action.type) {
    case 'ADD_POST': {
      const newPost: Post = {
        id: uuidv4(),
        ...action.payload,
        status: 'scheduled',
        createdAt: new Date(),
      };

      const updatedPosts = [...state.posts, newPost].sort(
        (a, b) =>
          new Date(a.scheduledTime).getTime() -
          new Date(b.scheduledTime).getTime()
      );

      return {
        ...state,
        posts: updatedPosts,
      };
    }

    case 'PUBLISH_POST': {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload
            ? { ...post, status: 'published', publishedTime: new Date() }
            : post
        ),
      };
    }

    case 'LOAD_POSTS': {
      return {
        ...state,
        posts: action.payload.sort(
          (a, b) =>
            new Date(a.scheduledTime).getTime() -
            new Date(b.scheduledTime).getTime()
        ),
      };
    }

    case 'DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    }

    case 'CLEAR_POSTS': {
      return {
        ...state,
        posts: [],
      };
    }

    default:
      return state;
  }
}

export function PostProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(() => new Date());

  // Memoized selectors for performance
  const scheduledPosts = useMemo(
    () => state.posts.filter((post) => post.status === 'scheduled'),
    [state.posts]
  );

  const publishedPosts = useMemo(
    () => state.posts.filter((post) => post.status === 'published'),
    [state.posts]
  );

  // Load posts from localStorage on mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const savedPosts = StorageUtils.getPosts();
        if (savedPosts.length > 0) {
          dispatch({ type: 'LOAD_POSTS', payload: savedPosts });
        }
      } catch (error) {
        console.error('Failed to load posts from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Memoized callbacks to prevent unnecessary re-renders
  const addPost = useCallback((content: string, scheduledTime: Date) => {
    dispatch({
      type: 'ADD_POST',
      payload: { content, scheduledTime },
    });
  }, []);

  const deletePost = useCallback((postId: string) => {
    dispatch({ type: 'DELETE_POST', payload: postId });
  }, []);

  const clearAllPosts = useCallback(() => {
    dispatch({ type: 'CLEAR_POSTS' });
    StorageUtils.clearAppData();
  }, []);

  const publishDuePosts = useCallback(() => {
    scheduledPosts
      .filter((post) => new Date(post.scheduledTime) <= currentTime)
      .forEach((post) => {
        dispatch({ type: 'PUBLISH_POST', payload: post.id });
      });
  }, [scheduledPosts, currentTime]);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (!isLoading) {
      const success = StorageUtils.savePosts(state.posts);
      if (!success) {
        console.error('Failed to save posts to storage');
      }
    }
  }, [state.posts, isLoading]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check for posts to publish when time updates
  useEffect(() => {
    publishDuePosts();
  }, [currentTime, publishDuePosts]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      state: { ...state, currentTime },
      dispatch,
      addPost,
      deletePost,
      clearAllPosts,
      publishDuePosts,
      scheduledPosts,
      publishedPosts,
      isLoading,
    }),
    [
      state,
      currentTime,
      addPost,
      deletePost,
      clearAllPosts,
      publishDuePosts,
      scheduledPosts,
      publishedPosts,
      isLoading,
    ]
  );

  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
}
