import React, { useState } from 'react';
import { styled } from '../../../shared/styles/stitches.config';
import { Container } from '../../../shared/components/Container';
import { Button } from '../../../shared/components/Button';
import { Modal } from '../../../shared/components/Modal';
import { PostItem } from '../components/PostItem';
import { PostForm } from '../components/PostForm';
import { usePosts } from '../hooks/use-posts';
import { usePostsUIStore } from '../stores/posts-ui-store';
import { modelToCreateDto, modelToUpdateDto } from '../utils/post-transformers';
import type { PostModel } from '../types/post';

const PageHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$lg',
});

const Title = styled('h1', {
  margin: 0,
  fontSize: '$xxxl',
  fontWeight: '$bold',
  color: '$dark',
});

const PostGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$lg',
  
  '@md': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  
  '@lg': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
});

const EmptyState = styled('div', {
  textAlign: 'center',
  padding: '$xl',
  backgroundColor: '$gray100',
  borderRadius: '$md',
  marginTop: '$xl',
  color: '$gray700',
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

export const PostsListPage: React.FC = () => {
  const { 
    postsQuery, 
    usePost,
    createPost, 
    updatePost, 
    deletePost,
    isCreating,
    isUpdating,
    isDeleting 
  } = usePosts();
  
  const { 
    selectedPostId,
    isCreateModalOpen,
    isEditModalOpen,
    setSelectedPostId,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
  } = usePostsUIStore();
  
  const [postToDeleteId, setPostToDeleteId] = useState<number | null>(null);
  
  // Fetch selected post for editing
  const selectedPostQuery = usePost(selectedPostId || 0);
  
  const handleCreatePost = (postData: Partial<PostModel>) => {
    const dto = modelToCreateDto(postData);
    createPost(dto, {
      onSuccess: () => {
        closeCreateModal();
      }
    });
  };
  
  const handleUpdatePost = (postData: Partial<PostModel>) => {
    if (postData.id) {
      const dto = modelToUpdateDto(postData as Partial<PostModel> & { id: number });
      updatePost(dto, {
        onSuccess: () => {
          closeEditModal();
        }
      });
    }
  };
  
  const handleEditClick = (id: number) => {
    setSelectedPostId(id);
    openEditModal();
  };
  
  const handleDeleteClick = (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPostToDeleteId(id);
      deletePost(id, {
        onSuccess: () => {
          setPostToDeleteId(null);
        }
      });
    }
  };
  
  const renderPosts = () => {
    if (postsQuery.isPending) {
      return <LoadingState>Loading posts...</LoadingState>;
    }
    
    if (postsQuery.isError) {
      return (
        <ErrorState>
          Error loading posts: {postsQuery.error.toString()}
        </ErrorState>
      );
    }
    
    if (!postsQuery.data || postsQuery.data.length === 0) {
      return (
        <EmptyState>
          <h3>No posts found</h3>
          <p>Create your first post to get started</p>
          <Button onClick={openCreateModal} css={{ marginTop: '$md' }}>
            Create Post
          </Button>
        </EmptyState>
      );
    }
    
    return (
      <PostGrid>
        {postsQuery.data.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            isDeleting={isDeleting && postToDeleteId === post.id}
          />
        ))}
      </PostGrid>
    );
  };
  
  return (
    <Container>
      <PageHeader>
        <Title>Posts</Title>
        <Button onClick={openCreateModal}>Create Post</Button>
      </PageHeader>
      
      {renderPosts()}
      
      {/* Create Post Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Create New Post"
      >
        <PostForm
          onSubmit={handleCreatePost}
          onCancel={closeCreateModal}
          isSubmitting={isCreating}
        />
      </Modal>
      
      {/* Edit Post Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Post"
      >
        {selectedPostQuery.data && (
          <PostForm
            post={selectedPostQuery.data}
            onSubmit={handleUpdatePost}
            onCancel={closeEditModal}
            isSubmitting={isUpdating}
          />
        )}
      </Modal>
    </Container>
  );
};

export default PostsListPage;