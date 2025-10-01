// authStore.ts
import {create} from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  groups: string;
  roles: string[];
  isLogged: boolean;
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set(() => ({
    user,
  })),
  clearAuth: () => set(() => ({
    user: null,
    accessToken: null,
  })),
}));

export default useAuthStore;
