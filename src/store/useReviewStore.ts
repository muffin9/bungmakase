import { create } from 'zustand';

interface ReviewState {
  files: File[];
  starRating: number;
  bungType: string;
  reviewContent: string;
  isLoading: boolean;
}

interface ReviewActions {
  setFiles: (files: File[]) => void;
  setStarRating: (rating: number) => void;
  setBungType: (type: string) => void;
  setReviewContent: (content: string) => void;
  setLoading: (isLoading: boolean) => void;
  resetReview: () => void;
}

const initialState: ReviewState = {
  files: [],
  starRating: 0,
  bungType: '',
  reviewContent: '',
  isLoading: false,
};

export const useReviewStore = create<ReviewState & ReviewActions>((set) => ({
  ...initialState,
  setFiles: (files) => set({ files }),
  setStarRating: (starRating) => set({ starRating }),
  setBungType: (bungType) => set({ bungType }),
  setReviewContent: (reviewContent) => set({ reviewContent }),
  setLoading: (isLoading) => set({ isLoading }),
  resetReview: () => set(initialState),
}));
