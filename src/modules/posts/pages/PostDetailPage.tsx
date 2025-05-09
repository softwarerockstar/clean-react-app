import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '../../../shared/styles/stitches.config';
import { Container } from '../../../shared/components/Container';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { usePosts } from '../hooks/use-posts';

const PostHeader = styled('div', {
  marginBottom: '$xl',
});

const BackButton = styled(Button, {
  marginBottom: '$md',
});

const PostTitle = styled('h1', {
  fontSize: '$xxxl',
  fontWeight: '$bold',
  marginBottom: '$sm',
  color: '$dark',
});

const PostMeta = styled('div', {
  display: 'flex',
  gap: '$md',
  color: '$gray600',
  fontSize: '$sm',
  marginBottom: '$lg',
});

const PostContent = styled('div', {
  fontSize: '$lg',
  lineHeight: '$relaxed',
  color: '$gray800',
  
  '& p': {
    marginBottom: '$lg',
  },
});

const PostActions = styled('div', {
  display: 'flex',
  gap: '$sm',
  marginTop: '$xl',
});

const LoadingState = styled('div', {
  textAlign: 'center',
  padding: '$xl',
  color: '$gray700',
});

const ErrorState = styled('div', {
  textAlign: 'center',
  padding: '$xl',
  backgroundColor: '$danger',
  color: '$white',
  borderRadius: '$md',
  marginTop: '$xl',
});

export const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = parseInt(id || '0', 10);
  
  const { usePost, deletePost, isDeleting } = usePosts();
  const postQuery = usePost(postId);
  
  const handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(postId, {
        onSuccess: () => {
          navigate('/posts');
        }
      });
    }
  };
  
  if (postQuery.isPending) {
    return (
      <Container>
        <LoadingState>Loading post...</LoadingState>
      </Container>
    );
  }
  
  if (postQuery.isError) {
    return (
      <Container>
        <ErrorState>
          Error loading post: {postQuery.error.toString()}
        </ErrorState>
        <Button onClick={() => navigate('/posts')} css={{ marginTop: '$lg' }}>
          Back to Posts
        </Button>
      </Container>
    );
  }
  
  if (!postQuery.data) {
    return (
      <Container>
        <ErrorState>Post not found</ErrorState>
        <Button onClick={() => navigate('/posts')} css={{ marginTop: '$lg' }}>
          Back to Posts
        </Button>
      </Container>
    );
  }
  
  const { title, content, authorId, formattedDate } = postQuery.data;
  
  return (
    <Container size="md">
      <PostHeader>
        <BackButton 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/posts')}
        >
          ← Back to Posts
        </BackButton>
        <PostTitle>{title}</PostTitle>
        <PostMeta>
          <span>Author ID: {authorId}</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </PostMeta>
      </PostHeader>
      
      <Card>
        <PostContent>
          {content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </PostContent>
      </Card>
      
      <PostActions>
        <Button onClick={() => navigate(`/posts/edit/${postId}`)}>
          Edit Post
        </Button>
        <Button 
          variant="danger" 
          onClick={handleDeleteClick} 
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Post'}
        </Button>
      </PostActions>
    </Container>
  );
};

export default PostDetailPage;