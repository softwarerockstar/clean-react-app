import { beforeEach, describe, expect, it, vi } from 'vitest';
import { postsApi } from './posts-api';
import { jsonPlaceholderClient } from '../../../shared/api/api-client';

// Mock the API client
vi.mock('../../../shared/api/api-client', () => ({
  jsonPlaceholderClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Posts API', () => {
  const mockPost = { id: 1, title: 'Test Post', body: 'Test content', userId: 1 };
  const mockPosts = [mockPost];
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('should fetch all posts', async () => {
    // Arrange
    vi.mocked(jsonPlaceholderClient.get).mockResolvedValueOnce({ data: mockPosts });
    
    // Act
    const result = await postsApi.getPosts();
    
    // Assert
    expect(jsonPlaceholderClient.get).toHaveBeenCalledWith('/posts');
    expect(result).toEqual(mockPosts);
  });
  
  it('should fetch a single post by ID', async () => {
    // Arrange
    vi.mocked(jsonPlaceholderClient.get).mockResolvedValueOnce({ data: mockPost });
    
    // Act
    const result = await postsApi.getPost(1);
    
    // Assert
    expect(jsonPlaceholderClient.get).toHaveBeenCalledWith('/posts/1');
    expect(result).toEqual(mockPost);
  });
  
  it('should create a post', async () => {
    // Arrange
    const newPost = { title: 'New Post', body: 'New content', userId: 1 };
    vi.mocked(jsonPlaceholderClient.post).mockResolvedValueOnce({ 
      data: { ...newPost, id: 1 } 
    });
    
    // Act
    const result = await postsApi.createPost(newPost);
    
    // Assert
    expect(jsonPlaceholderClient.post).toHaveBeenCalledWith('/posts', newPost);
    expect(result).toEqual({ ...newPost, id: 1 });
  });
  
  it('should update a post', async () => {
    // Arrange
    const updatedPost = { id: 1, title: 'Updated Post' };
    vi.mocked(jsonPlaceholderClient.put).mockResolvedValueOnce({ 
      data: { ...mockPost, ...updatedPost } 
    });
    
    // Act
    const result = await postsApi.updatePost(updatedPost);
    
    // Assert
    expect(jsonPlaceholderClient.put).toHaveBeenCalledWith('/posts/1', updatedPost);
    expect(result).toEqual({ ...mockPost, ...updatedPost });
  });
  
  it('should delete a post', async () => {
    // Arrange
    vi.mocked(jsonPlaceholderClient.delete).mockResolvedValueOnce({} as any);
    
    // Act
    await postsApi.deletePost(1);
    
    // Assert
    expect(jsonPlaceholderClient.delete).toHaveBeenCalledWith('/posts/1');
  });
});