import { create } from 'zustand';
import { Component } from '../types';
import { mockComponents } from '../services/mockData';

interface ComponentStore {
  components: Component[];
  duplicateUrns: string[];
  setComponents: (components: Component[]) => void;
  addComponent: (component: Component) => void;
  updateComponent: (component: Component) => void;
  deleteComponent: (id: string) => void;
  getDuplicateUrns: () => string[];
}

export const useComponentStore = create<ComponentStore>((set, get) => ({
  components: mockComponents,
  duplicateUrns: [],
  setComponents: (components) => {
    const urns = components.map(c => c.urn);
    const duplicates = urns.filter((urn, index) => urns.indexOf(urn) !== index);
    set({ components, duplicateUrns: [...new Set(duplicates)] });
  },
  addComponent: (component) => {
    const newComponents = [...get().components, component];
    const urns = newComponents.map(c => c.urn);
    const duplicates = urns.filter((urn, index) => urns.indexOf(urn) !== index);
    set({ components: newComponents, duplicateUrns: [...new Set(duplicates)] });
  },
  updateComponent: (component) => {
    const newComponents = get().components.map((c) =>
      c.id === component.id ? component : c
    );
    const urns = newComponents.map(c => c.urn);
    const duplicates = urns.filter((urn, index) => urns.indexOf(urn) !== index);
    set({ components: newComponents, duplicateUrns: [...new Set(duplicates)] });
  },
  deleteComponent: (id) => {
    const newComponents = get().components.filter((c) => c.id !== id);
    const urns = newComponents.map(c => c.urn);
    const duplicates = urns.filter((urn, index) => urns.indexOf(urn) !== index);
    set({ components: newComponents, duplicateUrns: [...new Set(duplicates)] });
  },
  getDuplicateUrns: () => get().duplicateUrns,
}));