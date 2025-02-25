import { SearchPlaceInfoType } from '@/types/map';
import { create } from 'zustand';

interface SearchPlaceState {
  resultSearchInfo: SearchPlaceInfoType[];
  setResultSearchInfo: (result: SearchPlaceInfoType[]) => void;
}

export const useSearchPlaceStore = create<SearchPlaceState>((set) => ({
  resultSearchInfo: [],
  setResultSearchInfo: (result) => set({ resultSearchInfo: result }),
}));
