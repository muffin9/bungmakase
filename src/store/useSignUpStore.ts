import { create } from 'zustand';
import { FormData } from '@/components/SignupForm';

interface SignUpState {
  loginData: Partial<FormData>;
  setLoginData: (data: FormData) => void;
  reset: () => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
  loginData: {},
  setLoginData: (data) => set({ loginData: data }),
  reset: () => set({ loginData: {} }),
}));
