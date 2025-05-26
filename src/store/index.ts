import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

interface UIStore {
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  toggleMobileMenu: () => void;
  setLoading: (loading: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export const useUIStore = create<UIStore>((set) => ({
  isMobileMenuOpen: false,
  isLoading: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setLoading: (loading) => set({ isLoading: loading }),
}));