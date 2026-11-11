import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { zustandStorage } from '@/lib/storage';

export type ThemePreference = 'system' | 'light' | 'dark';

type SettingsState = {
  hasOnboarded: boolean;
  themePreference: ThemePreference;
  hapticsEnabled: boolean;
  /** Counts "happy moments" (e.g. finished a task) to time the store review prompt. */
  happyMoments: number;
  hasRequestedReview: boolean;

  completeOnboarding: () => void;
  setThemePreference: (pref: ThemePreference) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  addHappyMoment: () => number;
  markReviewRequested: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      hasOnboarded: false,
      themePreference: 'system',
      hapticsEnabled: true,
      happyMoments: 0,
      hasRequestedReview: false,

      completeOnboarding: () => set({ hasOnboarded: true }),
      setThemePreference: (themePreference) => set({ themePreference }),
      setHapticsEnabled: (hapticsEnabled) => set({ hapticsEnabled }),
      addHappyMoment: () => {
        const happyMoments = get().happyMoments + 1;
        set({ happyMoments });
        return happyMoments;
      },
      markReviewRequested: () => set({ hasRequestedReview: true }),
    }),
    { name: 'settings-store', storage: zustandStorage }
  )
);
