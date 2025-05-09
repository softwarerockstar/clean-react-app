export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  
  export interface PostResponse {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  
  export interface PostModel {
    id: number;
    title: string;
    content: string; // Renamed from 'body' for clarity
    authorId: number; // Renamed from 'userId' for clarity
    excerpt: string; // Derived property
    formattedDate: string; // For UI display
  }
  
  export interface CreatePostDto {
    title: string;
    body: string;
    userId: number;
  }
  
  export interface UpdatePostDto {
    id: number;
    title?: string;
    body?: string;
    userId?: number;
  }