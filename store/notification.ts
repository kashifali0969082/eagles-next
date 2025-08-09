// store/useEntriesStore.ts
import { create } from "zustand";

interface Entry {
  _id: string;
  from: string;
  to: string;
  amount: number;
  level?: number;
  matrix?: number;
  seen?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface EntriesState {
  entries: Entry[];
  setAll: (data: Entry[]) => void;
  addNew: (data: Entry[]) => void;
}

export const useEntriesStore = create<EntriesState>((set) => ({
  entries: [],

  // Replace all data
  setAll: (data) => set({ entries: data }),

  // Append new entries, avoiding duplicates by _id
  addNew: (data) =>
    set((state) => {
      const existingIds = new Set(state.entries.map((e) => e._id));
      const filtered = data.filter((item) => !existingIds.has(item._id));
      return { entries: [...state.entries, ...filtered] };
    }),
}));
