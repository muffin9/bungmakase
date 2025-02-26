import { create } from 'zustand';

interface CurrentAddressState {
  latitude: number;
  longitude: number;
  currentAddress: string;
  roadAddress: string;
  setCurrentAddress: (address: string) => void;
  setRoadAddress: (address: string) => void;
  setLocation: (latitude: number, longitude: number) => void;
  resetCurrentAddress: () => void;
}

export const useCurrentAddress = create<CurrentAddressState>((set) => ({
  latitude: 0,
  longitude: 0,
  currentAddress: '',
  roadAddress: '',
  setCurrentAddress: (address) => set({ currentAddress: address }),
  setRoadAddress: (roadAddress) => set({ roadAddress: roadAddress }),
  setLocation: (latitude, longitude) => set({ latitude, longitude }),
  resetCurrentAddress: () =>
    set({ latitude: 0, longitude: 0, currentAddress: '', roadAddress: '' }),
}));
