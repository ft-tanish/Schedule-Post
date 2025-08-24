import { APP_CONFIG } from '@/config/app.config';
import { Post } from '@/types';

export class StorageUtils {
  /**
   * Safely get item from localStorage with error handling
   */
  static getItem<T>(key: string): T | null {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;

      const item = localStorage.getItem(key);
      if (!item) return null;

      return JSON.parse(item);
    } catch (error) {
      console.error(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  }

  /**
   * Safely set item in localStorage with error handling
   */
  static setItem<T>(key: string, value: T): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;

      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Failed to set item in localStorage: ${key}`, error);
      return false;
    }
  }

  /**
   * Remove item from localStorage
   */
  static removeItem(key: string): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;

      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove item from localStorage: ${key}`, error);
      return false;
    }
  }

  /**
   * Get posts from localStorage with proper date parsing
   */
  static getPosts(): Post[] {
    const savedPosts = this.getItem<any[]>(APP_CONFIG.storage.keys.posts);
    if (!savedPosts) return [];

    try {
      return savedPosts.map((post) => ({
        ...post,
        scheduledTime: new Date(post.scheduledTime),
        publishedTime: post.publishedTime
          ? new Date(post.publishedTime)
          : undefined,
        createdAt: new Date(post.createdAt),
      }));
    } catch (error) {
      console.error('Failed to parse saved posts:', error);
      return [];
    }
  }

  /**
   * Save posts to localStorage
   */
  static savePosts(posts: Post[]): boolean {
    return this.setItem(APP_CONFIG.storage.keys.posts, posts);
  }

  /**
   * Clear all app data from localStorage
   */
  static clearAppData(): boolean {
    try {
      this.removeItem(APP_CONFIG.storage.keys.posts);
      this.removeItem(APP_CONFIG.storage.keys.userPreferences);
      return true;
    } catch (error) {
      console.error('Failed to clear app data:', error);
      return false;
    }
  }
}
