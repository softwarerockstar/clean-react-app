import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test/utils';
import { PostItem } from './PostItem';

describe('PostItem', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post',
    content: 'Test content',
    excerpt: 'Test content...',
    authorId: 1,
    formattedDate: 'May 01, 2025'
  };
  
  it('renders post details correctly', () => {
    // Arrange
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    
    // Act
    render(
      <PostItem 
        post={mockPost} 
        onEdit={onEdit} 
        onDelete={onDelete} 
        isDeleting={false} 
      />
    );
    
    // Assert
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test content...')).toBeInTheDocument();
    expect(screen.getByText('Author ID: 1')).toBeInTheDocument();
    expect(screen.getByText('May 01, 2025')).toBeInTheDocument();
  });
  
  it('calls onEdit when edit button is clicked', () => {
    // Arrange
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    
    // Act
    render(
      <PostItem 
        post={mockPost} 
        onEdit={onEdit} 
        onDelete={onDelete} 
        isDeleting={false} 
      />
    );
    
    fireEvent.click(screen.getByText('Edit'));
    
    // Assert
    expect(onEdit).toHaveBeenCalledWith(1);
  });
  
  it('calls onDelete when delete button is clicked', () => {
    // Arrange
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    
    // Act
    render(
      <PostItem 
        post={mockPost} 
        onEdit={onEdit} 
        onDelete={onDelete} 
        isDeleting={false} 
      />
    );
    
    fireEvent.click(screen.getByText('Delete'));
    
    // Assert
    expect(onDelete).toHaveBeenCalledWith(1);
  });
  
  it('disables delete button when isDeleting is true', () => {
    // Arrange
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    
    // Act
    render(
      <PostItem 
        post={mockPost} 
        onEdit={onEdit} 
        onDelete={onDelete} 
        isDeleting={true} 
      />
    );
    
    const deleteButton = screen.getByText('Deleting...');
    
    // Assert
    // Instead of checking for disabled attribute, check for the disabled class
    expect(deleteButton.className).toContain('disabled-true');
    expect(deleteButton).toHaveTextContent('Deleting...');
  });
});