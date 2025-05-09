import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '../../../shared/styles/stitches.config';
import { Button } from '../../../shared/components/Button';
import type { PostModel } from '../types/post';

interface PostFormProps {
  post?: PostModel;
  onSubmit: (post: Partial<PostModel>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$md',
});

const FormGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$xs',
});

const Label = styled('label', {
  fontSize: '$sm',
  fontWeight: '$medium',
  color: '$gray700',
});

const Input = styled('input', {
  padding: '$sm',
  borderRadius: '$md',
  border: '1px solid $gray300',
  fontSize: '$md',
  '&:focus': {
    outline: 'none',
    borderColor: '$primary',
    boxShadow: '0 0 0 2px rgba(0, 102, 204, 0.2)',
  },
});

const Textarea = styled('textarea', {
  padding: '$sm',
  borderRadius: '$md',
  border: '1px solid $gray300',
  fontSize: '$md',
  minHeight: '150px',
  resize: 'vertical',
  '&:focus': {
    outline: 'none',
    borderColor: '$primary',
    boxShadow: '0 0 0 2px rgba(0, 102, 204, 0.2)',
  },
});

const ErrorMessage = styled('p', {
  color: '$danger',
  fontSize: '$sm',
  margin: '0',
});

const FormActions = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$sm',
  marginTop: '$md',
});

type FormValues = {
  title: string;
  content: string;
  authorId: number;
};

export const PostForm: React.FC<PostFormProps> = ({ 
  post, 
  onSubmit, 
  onCancel,
  isSubmitting 
}) => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<FormValues>({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      authorId: post?.authorId || 1
    }
  });
  
  // Reset form when post changes
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        authorId: post.authorId
      });
    }
  }, [post, reset]);
  
  const onFormSubmit = (data: FormValues) => {
    onSubmit({
      id: post?.id,
      ...data
    });
  };
  
  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title', { 
            required: 'Title is required',
            minLength: { value: 3, message: 'Title must be at least 3 characters' }
          })}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          {...register('content', { 
            required: 'Content is required',
            minLength: { value: 10, message: 'Content must be at least 10 characters' }
          })}
        />
        {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
      </FormGroup>
      
      <FormActions>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : (post ? 'Update' : 'Create')}
        </Button>
      </FormActions>
    </Form>
  );
};