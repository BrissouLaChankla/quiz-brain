import { create } from 'zustand'

export const usePlayerStore = create((set) => ({
    score: 0,
    category: '',
    increaseScore: () => set((state) => ({ score: state.score + 1 })),
    resetScore: () => set(() => ({ score: 0 })),
    setCategory: (newCategory) => set(() => ({ category: newCategory })),
}))