import { create } from 'zustand';
import { Component } from '../types';
import { mockComponents } from '../services/mockData';

interface ComponentStore {
  components: Component[];
  setComponents: (components: Component[]) => void;
  addComponent: (component: Component) => void;
  updateComponent: (component: Component) => void;
  deleteComponent: (id: string) => void;
}

export const useComponentStore = create<ComponentStore>((set) => ({
  components: mockComponents,
  setComponents: (components) => set({ components }),
  addComponent: (component) =>
    set((state) => ({ components: [...state.components, component] })),
  updateComponent: (component) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === component.id ? component : c
      ),
    })),
  deleteComponent: (id) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
    })),
}));