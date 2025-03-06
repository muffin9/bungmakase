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
  startTime: '09:00',
  endTime: '18:00',
  file: [],
  bungType: '팥',
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
