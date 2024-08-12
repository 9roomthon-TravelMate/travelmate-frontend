import create from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  region: '',
  setRegion: (region) => set({ region }),
  clearRegion: () => set({ region: '' }),

  travelPeriod: null,
  setTravelPeriod: (period) => set({ travelPeriod: period }),
  clearTravelPeriod: () => set({ travelPeriod: null }),

  preferences: {},
  setPreference: (questionIndex, answer) =>
    set((state) => ({
      preferences: { ...state.preferences, [questionIndex]: answer },
    })),
  clearPreferences: () => set({ preferences: {} }),
}));

export default useAuthStore;
