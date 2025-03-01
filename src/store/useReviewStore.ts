import { create } from 'zustand';

interface ReviewState {
  starRating: number;
  bungType: string;
  reviewContent: string;
  isLoading: boolean;
}

interface ReviewActions {
  setStarRating: (rating: number) => void;
  setBungType: (type: string) => void;
  setReviewContent: (content: string) => void;
  setLoading: (isLoading: boolean) => void;
  resetReview: () => void;
}

const initialState: ReviewState = {
  starRating: 0,
  bungType: '팥',
  reviewContent: '',
  isLoading: false,
};

export const useReviewStore = create<ReviewState & ReviewActions>((set) => ({
  ...initialState,
  setStarRating: (starRating) => set({ starRating }),
  setBungType: (bungType) => set({ bungType }),
  setReviewContent: (reviewContent) => set({ reviewContent }),
  setLoading: (isLoading) => set({ isLoading }),
  resetReview: () => set(initialState),
}));
