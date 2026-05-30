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
  
  toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
  setSidebarExpanded: (expanded: boolean) => set({ sidebarExpanded: expanded }),
  setMobileSidebarOpen: (open: boolean) => set({ mobileSidebarOpen: open }),
}));
