import { SearchShopInfoType } from '@/types/map';
import { create } from 'zustand';

interface SearchShopState {
  resultShopSearchInfo: SearchShopInfoType[];
  setResultShopSearchInfo: (result: SearchShopInfoType[]) => void;
}

export const useSearchShopStore = create<SearchShopState>((set) => ({
  resultShopSearchInfo: [],
  setResultShopSearchInfo: (result) => set({ resultShopSearchInfo: result }),
}));
