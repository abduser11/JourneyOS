/**
 * JourneyOS — Global State Store (Zustand)
 *
 * Manages global UI state that persists across navigation.
 * For session-based state (user data, trips, etc.), use TanStack Query.
 */

import { create } from "zustand";

interface AppState {
  // ─── UI STATE ───
  isSidebarOpen: boolean;
  isSearchOpen: boolean;

  // ─── ACTIONS ───
  toggleSidebar: () => void;
  setSidebarOpen: (_isOpen: boolean) => void;
  toggleSearch: () => void;
  setSearchOpen: (_isOpen: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  isSidebarOpen: true,
  isSearchOpen: false,

  // Actions
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
}));
