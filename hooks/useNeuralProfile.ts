import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NeuralProfile {
  stream: string;
  budget: string;
  locations: string[];
  priorities: string[];
  isComplete: boolean;
}

interface NeuralProfileState {
  profile: NeuralProfile | null;
  setProfile: (profile: NeuralProfile) => void;
  updateProfile: (updates: Partial<NeuralProfile>) => void;
  resetProfile: () => void;
  getCompletionPercentage: () => number;
}

export const useNeuralProfile = create<NeuralProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      
      setProfile: (profile) => set({ profile: { ...profile, isComplete: true } }),
      
      updateProfile: (updates) => set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null
      })),
      
      resetProfile: () => set({ profile: null }),

      getCompletionPercentage: () => {
        const p = get().profile;
        if (!p) return 0;
        let score = 0;
        if (p.stream) score += 25;
        if (p.budget) score += 25;
        if (p.locations && p.locations.length > 0) score += 25;
        if (p.priorities && p.priorities.length > 0) score += 25;
        return score;
      }
    }),
    {
      name: 'collegeblink-neural-profile',
    }
  )
);
