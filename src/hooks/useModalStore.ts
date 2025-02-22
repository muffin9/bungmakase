import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  content: {
    title: string;
    description: string;
    type: 'success' | 'fail' | 'error';
  } | null;
  openModal: (content: ModalState['content']) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  openModal: (content) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null }),
}));
