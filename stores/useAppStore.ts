import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Application {
  id: string;
  status: string;
  college: { id: string; name: string; logo?: string };
  course?: { id: string; name: string };
  deadline?: Date;
}

interface AppState {
  compareList: string[];
  applications: Application[];
  addToCompare: (collegeId: string) => void;
  removeFromCompare: (collegeId: string) => void;
  clearCompare: () => void;
  setApplications: (applications: Application[]) => void;
  updateApplicationStatus: (id: string, status: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      compareList: [],
      applications: [],

      addToCompare: (collegeId) =>
        set((state) => {
          if (state.compareList.includes(collegeId)) return state;
          if (state.compareList.length >= 4) return state;
          return { compareList: [...state.compareList, collegeId] };
        }),

      removeFromCompare: (collegeId) =>
        set((state) => ({
          compareList: state.compareList.filter((id) => id !== collegeId),
        })),

      clearCompare: () => set({ compareList: [] }),

      setApplications: (applications) => set({ applications }),

      updateApplicationStatus: (id, status) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, status } : app
          ),
        })),
    }),
    {
      name: "collegeblink-store",
      partialize: (state) => ({ compareList: state.compareList }),
    }
  )
);
