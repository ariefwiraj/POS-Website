import { create } from 'zustand';

interface AdminUiStore {
  sidebarExpanded: boolean;
  mobileSidebarOpen: boolean;
  
  toggleSidebar: () => void;
  setSidebarExpanded: (expanded: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;
}

export const useAdminUiStore = create<AdminUiStore>((set) => ({
  sidebarExpanded: true,
  mobileSidebarOpen: false,
  
  toggleSidebar: () => set((state) => {
    const next = !state.sidebarExpanded;
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-sidebar-expanded', String(next));
      document.cookie = `admin-sidebar-expanded=${next}; path=/; max-age=31536000`;
    }
    return { sidebarExpanded: next };
  }),
  setSidebarExpanded: (expanded: boolean) => set(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-sidebar-expanded', String(expanded));
      document.cookie = `admin-sidebar-expanded=${expanded}; path=/; max-age=31536000`;
    }
    return { sidebarExpanded: expanded };
  }),
  setMobileSidebarOpen: (open: boolean) => set({ mobileSidebarOpen: open }),
}));
