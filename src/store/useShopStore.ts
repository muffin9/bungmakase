// name, phone, startTime, endTime, file, bungType

import { create } from 'zustand';

interface ShopInfo {
  name: string;
  phone: string;
  startTime: string;
  endTime: string;
  file: File[];
  bungType: string;
}

interface ShopStore {
  shopInfo: ShopInfo;
  updateShopInfo: (info: Partial<ShopInfo>) => void;
  resetShopInfo: () => void;
}

const initialShopInfo: ShopInfo = {
  name: '',
  phone: '',
  startTime: '',
  endTime: '',
  file: [],
  bungType: '',
};

const useShopStore = create<ShopStore>((set) => ({
  shopInfo: initialShopInfo,
  updateShopInfo: (info) =>
    set((state) => ({
      shopInfo: { ...state.shopInfo, ...info },
    })),
  resetShopInfo: () => set({ shopInfo: initialShopInfo }),
}));

export default useShopStore;
