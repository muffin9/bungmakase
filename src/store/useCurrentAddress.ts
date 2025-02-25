import { create } from 'zustand';

interface CurrentAddressState {
  currentAddress: string;
  roadAddress: string;
  setCurrentAddress: (address: string) => void;
  setRoadAddress: (address: string) => void;
}

export const useCurrentAddress = create<CurrentAddressState>((set) => ({
  currentAddress: '',
  roadAddress: '',
  setCurrentAddress: (address) => set({ currentAddress: address }),
  setRoadAddress: (roadAddress) => set({ roadAddress: roadAddress }),
}));
