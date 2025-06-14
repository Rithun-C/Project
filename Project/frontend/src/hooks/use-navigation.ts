import { create } from "zustand"

type NavigationState = {
  activePage: string
  setActivePage: (page: string) => void
}

export const useNavigation = create<NavigationState>((set) => ({
  activePage: "dashboard",
  setActivePage: (page) => set({ activePage: page }),
}))
