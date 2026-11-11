import '@/lib/i18n';

import { QueryClientProvider } from '@tanstack/react-query';
import { ConvexProvider } from 'convex/react';
import { useColorScheme } from 'nativewind';
import { PostHogProvider } from 'posthog-react-native';
import { useEffect, type ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { posthog } from '@/lib/analytics';
import { convex } from '@/lib/convex';
import { migrateDatabase } from '@/lib/db';
import { initPurchases } from '@/lib/purchases';
import { queryClient } from '@/lib/query-client';
import { useSettingsStore } from '@/stores/settings-store';

// Runs once at startup, before the first screen renders.
migrateDatabase();

/** Every app-wide provider lives here, so `_layout.tsx` stays clean. */
export function AppProviders({ children }: { children: ReactNode }) {
  const themePreference = useSettingsStore((s) => s.themePreference);
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    initPurchases();
  }, []);

  useEffect(() => {
    setColorScheme(themePreference);
  }, [themePreference, setColorScheme]);

  let tree = (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );

  if (convex) tree = <ConvexProvider client={convex}>{tree}</ConvexProvider>;

  if (posthog) {
    tree = (
      <PostHogProvider client={posthog} autocapture={{ captureScreens: false, captureTouches: false }}>
        {tree}
      </PostHogProvider>
    );
  }

  return tree;
}
