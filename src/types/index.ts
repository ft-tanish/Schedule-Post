export interface Post {
  id: string;
  content: string;
  scheduledTime: Date;
  publishedTime?: Date;
  status: 'scheduled' | 'published';
  createdAt: Date;
}

export interface AppState {
  posts: Post[];
  currentTime: Date;
}

export interface PostFormData {
  content: string;
  scheduledTime: string; // ISO string format for form handling
}
