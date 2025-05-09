import { jsonPlaceholderClient } from '../../../shared/api/api-client';
import type { Post, CreatePostDto, UpdatePostDto } from '../types/post';

export const postsApi = {
  // Get all posts
  getPosts: async (): Promise<Post[]> => {
    const response = await jsonPlaceholderClient.get<Post[]>('/posts');
    return response.data;
  },
  
  // Get a single post by ID
  getPost: async (id: number): Promise<Post> => {
    const response = await jsonPlaceholderClient.get<Post>(`/posts/${id}`);
    return response.data;
  },
  
  // Create a new post
  createPost: async (postData: CreatePostDto): Promise<Post> => {
    const response = await jsonPlaceholderClient.post<Post>('/posts', postData);
    return response.data;
  },
  
  // Update an existing post
  updatePost: async (postData: UpdatePostDto): Promise<Post> => {
    const response = await jsonPlaceholderClient.put<Post>(`/posts/${postData.id}`, postData);
    return response.data;
  },
  
  // Delete a post
  deletePost: async (id: number): Promise<void> => {
    await jsonPlaceholderClient.delete(`/posts/${id}`);
  }
};