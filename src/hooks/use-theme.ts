import { useColorScheme } from 'nativewind';

import { THEME } from '@/lib/theme';

/**
 * Current color scheme + JS color values. Prefer Tailwind classes (`bg-card`, `text-primary`);
 * use `colors` only where classes can't go (icon `color` props, native Switch, charts).
 */
export function useTheme() {
  const { colorScheme } = useColorScheme();
  const scheme: 'light' | 'dark' = colorScheme === 'dark' ? 'dark' : 'light';
  return { scheme, isDark: scheme === 'dark', colors: THEME[scheme] };
}
