import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '../../../shared/styles/stitches.config';
import { Button } from '../../../shared/components/Button';
import { Card, CardContent, CardFooter } from '../../../shared/components/Card';
import type { PostModel } from '../types/post';

interface PostItemProps {
  post: PostModel;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

const PostTitle = styled('h3', {
  fontSize: '$xl',
  fontWeight: '$semibold',
  margin: '0 0 $sm 0',
  color: '$dark',
  '&:hover': {
    color: '$primary',
  },
});

const PostMeta = styled('div', {
  fontSize: '$sm',
  color: '$gray600',
  marginBottom: '$md',
});

const PostExcerpt = styled('p', {
  marginBottom: '$md',
  fontSize: '$md',
  color: '$gray800',
});

const PostActions = styled('div', {
  display: 'flex',
  gap: '$sm',
});

export const PostItem: React.FC<PostItemProps> = ({ 
  post, 
  onEdit, 
  onDelete,
  isDeleting 
}) => {
  return (
    <Card>
      <CardContent>
        <PostTitle>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </PostTitle>
        <PostMeta>
          <span>Author ID: {post.authorId}</span>
          <span> • </span>
          <span>{post.formattedDate}</span>
        </PostMeta>
        <PostExcerpt>{post.excerpt}</PostExcerpt>
      </CardContent>
      <CardFooter>
        <PostActions>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => onEdit(post.id)}
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => onDelete(post.id)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </PostActions>
      </CardFooter>
    </Card>
  );
};