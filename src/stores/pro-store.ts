import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { zustandStorage } from '@/lib/storage';

type ProState = {
  /** True when the user owns the "pro" entitlement. Cached so the app knows offline. */
  isPro: boolean;
  setIsPro: (isPro: boolean) => void;
};

export const useProStore = create<ProState>()(
  persist(
    (set) => ({
      isPro: false,
      setIsPro: (isPro) => set({ isPro }),
    }),
    { name: 'pro-store', storage: zustandStorage }
  )
);

/** `const isPro = useIsPro();` — gate paid features with this. */
export const useIsPro = () => useProStore((s) => s.isPro);
