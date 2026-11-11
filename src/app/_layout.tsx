import '@/global.css';

import { PortalHost } from '@rn-primitives/portal';
import { Stack, ThemeProvider, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/hooks/use-theme';
import { trackScreen } from '@/lib/analytics';
import { NAV_THEME } from '@/lib/theme';
import { AppProviders } from '@/providers/app-providers';
import { useSettingsStore } from '@/stores/settings-store';

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { scheme, isDark } = useTheme();
  const hasOnboarded = useSettingsStore((s) => s.hasOnboarded);
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    trackScreen(pathname);
  }, [pathname]);

  return (
    <ThemeProvider value={NAV_THEME[scheme]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack>
        {/* Shown until onboarding is finished. */}
        <Stack.Protected guard={!hasOnboarded}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={hasOnboarded}>
          <Stack.Screen name="index" options={{ title: t('home.title') }} />
          <Stack.Screen name="settings" options={{ title: t('settings.title') }} />
        </Stack.Protected>
      </Stack>
      {/* Required by React Native Reusables (dialogs, menus, popovers). Keep it last. */}
      <PortalHost />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
