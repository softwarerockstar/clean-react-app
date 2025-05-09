import { DateTime } from 'luxon';
import type { Post, PostModel } from '../types/post';

export const postToModel = (post: Post, mockDate = true): PostModel => {
  // Generate a mock date based on the post ID for demonstration
  const date = mockDate
    ? DateTime.now().minus({ days: post.id % 30 })
    : DateTime.now();

  return {
    id: post.id,
    title: post.title,
    content: post.body,
    authorId: post.userId,
    excerpt: post.body.length > 100 
      ? `${post.body.substring(0, 100)}...` 
      : post.body,
    formattedDate: date.toFormat('LLL dd, yyyy')
  };
};

export const postsToModels = (posts: Post[]): PostModel[] => {
  return posts.map(post => postToModel(post));
};

export const modelToCreateDto = (model: Partial<PostModel>) => {
  return {
    title: model.title || '',
    body: model.content || '',
    userId: model.authorId || 1
  };
};

export const modelToUpdateDto = (model: Partial<PostModel> & { id: number }) => {
  const dto: UpdatePostDto = { id: model.id };
  
  if (model.title) dto.title = model.title;
  if (model.content) dto.body = model.content;
  if (model.authorId) dto.userId = model.authorId;
  
  return dto;
};

export type UpdatePostDto = {
  id: number;
  title?: string;
  body?: string;
  userId?: number;
};