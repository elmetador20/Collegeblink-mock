"use client";

const COMPARE_KEY = "compareColleges";
const MAX_COMPARE = 4;

export const compareUtils = {
  getColleges: (): string[] => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(COMPARE_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  addCollege: (collegeId: string): boolean => {
    if (typeof window === "undefined") return false;
    const current = compareUtils.getColleges();
    if (current.includes(collegeId)) return false;
    if (current.length >= MAX_COMPARE) return false;
    localStorage.setItem(COMPARE_KEY, JSON.stringify([...current, collegeId]));
    return true;
  },

  removeCollege: (collegeId: string): void => {
    if (typeof window === "undefined") return;
    const current = compareUtils.getColleges();
    localStorage.setItem(COMPARE_KEY, JSON.stringify(current.filter(id => id !== collegeId)));
  },

  clearColleges: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(COMPARE_KEY);
  },

  getCount: (): number => {
    return compareUtils.getColleges().length;
  },

  isAdded: (collegeId: string): boolean => {
    return compareUtils.getColleges().includes(collegeId);
  },
};
