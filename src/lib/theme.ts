import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';

/**
 * JS copy of the colors in src/global.css, for places Tailwind classes can't reach
 * (icon colors, navigation header, native Switch). Keep the two in sync when you rebrand.
 */
export const THEME = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(240 10% 4%)',
    card: 'hsl(240 5% 96%)',
    primary: 'hsl(210 87% 53%)',
    primaryForeground: 'hsl(0 0% 100%)',
    muted: 'hsl(240 5% 96%)',
    mutedForeground: 'hsl(220 6% 40%)',
    destructive: 'hsl(358 75% 59%)',
    success: 'hsl(151 55% 42%)',
    border: 'hsl(240 6% 90%)',
  },
  dark: {
    background: 'hsl(0 0% 0%)',
    foreground: 'hsl(0 0% 100%)',
    card: 'hsl(225 5% 14%)',
    primary: 'hsl(209 90% 63%)',
    primaryForeground: 'hsl(0 0% 0%)',
    muted: 'hsl(225 5% 14%)',
    mutedForeground: 'hsl(215 6% 71%)',
    destructive: 'hsl(0 80% 65%)',
    success: 'hsl(151 65% 54%)',
    border: 'hsl(214 7% 19%)',
  },
} as const;

export type AppTheme = (typeof THEME)['light'];

/** Theme for React Navigation (headers, screen backgrounds). */
export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.background,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.background,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
