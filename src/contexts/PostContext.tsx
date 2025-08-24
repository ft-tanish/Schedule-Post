'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { Post, AppState } from '@/types';
import { v4 as uuidv4 } from 'uuid';

type PostAction =
  | { type: 'ADD_POST'; payload: Omit<Post, 'id' | 'createdAt' | 'status'> }
  | { type: 'PUBLISH_POST'; payload: string }
  | { type: 'UPDATE_TIME'; payload: Date }
  | { type: 'LOAD_POSTS'; payload: Post[] };

interface PostContextType {
  state: AppState;
  dispatch: React.Dispatch<PostAction>;
  addPost: (content: string, scheduledTime: Date) => void;
  publishDuePosts: () => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

const initialState: AppState = {
  posts: [],
  currentTime: new Date(),
};

function postReducer(state: AppState, action: PostAction): AppState {
  switch (action.type) {
    case 'ADD_POST':
      const newPost: Post = {
        id: uuidv4(),
        ...action.payload,
        status: 'scheduled',
        createdAt: new Date(),
      };
      return {
        ...state,
        posts: [...state.posts, newPost].sort(
          (a, b) =>
            new Date(a.scheduledTime).getTime() -
            new Date(b.scheduledTime).getTime()
        ),
      };

    case 'PUBLISH_POST':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload
            ? { ...post, status: 'published', publishedTime: new Date() }
            : post
        ),
      };

    case 'UPDATE_TIME':
      return {
        ...state,
        currentTime: action.payload,
      };

    case 'LOAD_POSTS':
      return {
        ...state,
        posts: action.payload.sort(
          (a, b) =>
            new Date(a.scheduledTime).getTime() -
            new Date(b.scheduledTime).getTime()
        ),
      };

    default:
      return state;
  }
}

export function PostProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(postReducer, initialState);

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('scheduledPosts');
    if (savedPosts) {
      try {
        const posts = JSON.parse(savedPosts).map((post: any) => ({
          ...post,
          scheduledTime: new Date(post.scheduledTime),
          publishedTime: post.publishedTime
            ? new Date(post.publishedTime)
            : undefined,
          createdAt: new Date(post.createdAt),
        }));
        dispatch({ type: 'LOAD_POSTS', payload: posts });
      } catch (error) {
        console.error('Failed to load posts from localStorage:', error);
      }
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('scheduledPosts', JSON.stringify(state.posts));
  }, [state.posts]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'UPDATE_TIME', payload: new Date() });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check for posts to publish every second
  useEffect(() => {
    publishDuePosts();
  }, [state.currentTime]);

  const addPost = (content: string, scheduledTime: Date) => {
    dispatch({
      type: 'ADD_POST',
      payload: { content, scheduledTime },
    });
  };

  const publishDuePosts = () => {
    state.posts
      .filter(
        (post) =>
          post.status === 'scheduled' &&
          new Date(post.scheduledTime) <= state.currentTime
      )
      .forEach((post) => {
        dispatch({ type: 'PUBLISH_POST', payload: post.id });
      });
  };

  return (
    <PostContext.Provider value={{ state, dispatch, addPost, publishDuePosts }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
}
