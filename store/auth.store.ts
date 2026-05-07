import { GetMeResponse } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export type UserRole = "customer" | "mechanic";
export interface User extends Partial<GetMeResponse> {
  role: UserRole;
  name: string;
  token: string;
  image_url: string;
  email: string;
  user_id: string;
  refresh_token: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  setProfile: (profile: Partial<User>) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true, // ← default true
      setUser: (user) => set({ user }),
      setProfile: (profile) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null,
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }), // ← only persist user
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ isLoading: false }); // ← false after load
      },
    },
  ),
);
