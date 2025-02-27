import { create } from 'zustand';

interface Location {
  latitude: number;
  longitude: number;
  currentAddress: string;
  roadAddress: string;
}

interface CurrentAddressState {
  location: Location;
  setLocation: (location: Partial<Location>) => void;
  resetLocation: () => void;
}

const initialLocation: Location = {
  latitude: 0,
  longitude: 0,
  currentAddress: '',
  roadAddress: '',
};

export const useCurrentAddress = create<CurrentAddressState>()((set) => ({
  location: initialLocation,
  setLocation: (newLocation) =>
    set((state) => ({
      location: { ...state.location, ...newLocation },
    })),
  resetLocation: () => set({ location: initialLocation }),
}));
