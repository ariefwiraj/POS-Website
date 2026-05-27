import { create } from 'zustand'

interface PosUiStore {
  sidebarCollapsed: boolean
  mobileCartOpen: boolean
  successModalOpen: boolean
  
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setMobileCartOpen: (open: boolean) => void
  setSuccessModalOpen: (open: boolean) => void
}

export const usePosUiStore = create<PosUiStore>((set) => ({
  sidebarCollapsed: false,
  mobileCartOpen: false,
  successModalOpen: false,
  
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setMobileCartOpen: (open) => set({ mobileCartOpen: open }),
  setSuccessModalOpen: (open) => set({ successModalOpen: open }),
}))
