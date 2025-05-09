import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../api/posts-api';
import { postToModel, postsToModels } from '../utils/post-transformers';
import type { CreatePostDto, UpdatePostDto } from '../types/post';

export const usePosts = () => {
  const queryClient = useQueryClient();
  
  // Query for fetching all posts
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const posts = await postsApi.getPosts();
      return postsToModels(posts);
    }
  });
  
  // Query for fetching a single post
  const usePost = (id: number) => useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const post = await postsApi.getPost(id);
      return postToModel(post);
    },
    enabled: !!id // Only run if id is provided
  });
  
  // Mutation for creating a post
  const createPostMutation = useMutation({
    mutationFn: (postData: CreatePostDto) => postsApi.createPost(postData),
    onSuccess: () => {
      // Invalidate the posts query to refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
  
  // Mutation for updating a post
  const updatePostMutation = useMutation({
    mutationFn: (postData: UpdatePostDto) => postsApi.updatePost(postData),
    onSuccess: (data) => {
      // Invalidate affected queries
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', data.id] });
    }
  });
  
  // Mutation for deleting a post
  const deletePostMutation = useMutation({
    mutationFn: (id: number) => postsApi.deletePost(id),
    onSuccess: () => {
      // Invalidate the posts query to refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
  
  return {
    // Queries
    postsQuery,
    usePost,
    
    // Mutations
    createPost: createPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
    
    // Loading states
    isCreating: createPostMutation.isPending,
    isUpdating: updatePostMutation.isPending,
    isDeleting: deletePostMutation.isPending,
  };
};