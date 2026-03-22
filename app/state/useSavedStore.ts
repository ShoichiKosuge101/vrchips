import { create } from 'zustand';

type SavedState = {
  savedIds: Record<string, true>;
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
};

export const useSavedStore = create<SavedState>((set, get) => ({
  savedIds: {},
  toggleSaved: (id) =>
    set((s) => {
      const next = { ...s.savedIds };
      if (next[id]) delete next[id];
      else next[id] = true;
      return { savedIds: next };
    }),
  isSaved: (id) => Boolean(get().savedIds[id]),
}));
