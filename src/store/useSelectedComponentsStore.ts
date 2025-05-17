import { create } from 'zustand';

interface SelectedComponentsStore {
  selectedComponents: Record<string, string[]>;
  toggleComponent: (platformId: string, componentId: string) => void;
  setSelectedComponents: (components: Record<string, string[]>) => void;
  clearSelectedComponents: (platformId: string) => void;
}

export const useSelectedComponentsStore = create<SelectedComponentsStore>((set) => ({
  selectedComponents: {},
  toggleComponent: (platformId, componentId) =>
    set((state) => {
      const current = state.selectedComponents[platformId] || [];
      const isSelected = current.includes(componentId);
      
      return {
        selectedComponents: {
          ...state.selectedComponents,
          [platformId]: isSelected
            ? current.filter(id => id !== componentId)
            : [...current, componentId],
        },
      };
    }),
  setSelectedComponents: (components) => set({ selectedComponents: components }),
  clearSelectedComponents: (platformId) =>
    set((state) => ({
      selectedComponents: {
        ...state.selectedComponents,
        [platformId]: [],
      },
    })),
}));