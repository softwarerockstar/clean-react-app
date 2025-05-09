import { create } from 'zustand';

interface PostsUIState {
  selectedPostId: number | null;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteDialogOpen: boolean;
  
  // Actions
  setSelectedPostId: (id: number | null) => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: () => void;
  closeEditModal: () => void;
  openDeleteDialog: () => void;
  closeDeleteDialog: () => void;
}

export const usePostsUIStore = create<PostsUIState>((set) => ({
  // State
  selectedPostId: null,
  isCreateModalOpen: false,
  isEditModalOpen: false,
  isDeleteDialogOpen: false,
  
  // Actions
  setSelectedPostId: (id) => set({ selectedPostId: id }),
  
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),
  
  openEditModal: () => set({ isEditModalOpen: true }),
  closeEditModal: () => set({ isEditModalOpen: false }),
  
  openDeleteDialog: () => set({ isDeleteDialogOpen: true }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false }),
}));