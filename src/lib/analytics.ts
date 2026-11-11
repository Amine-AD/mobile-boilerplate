import PostHog from 'posthog-react-native';

import { env } from '@/lib/env';

/**
 * Product analytics + error tracking + feature flags via PostHog (generous free tier).
 * Disabled automatically when EXPO_PUBLIC_POSTHOG_API_KEY is not set.
 */
export const posthog: PostHog | null = env.EXPO_PUBLIC_POSTHOG_API_KEY
  ? new PostHog(env.EXPO_PUBLIC_POSTHOG_API_KEY, {
      host: env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      errorTracking: {
        autocapture: { uncaughtExceptions: true, unhandledRejections: true },
      },
      disabled: __DEV__,
    })
  : null;

type Props = Record<string, string | number | boolean | null>;

/** `track('project_created', { craft: 'knitting' })` — safe to call even when analytics is off. */
export function track(event: string, properties?: Props) {
  posthog?.capture(event, properties);
}

export function trackScreen(name: string, properties?: Props) {
  posthog?.screen(name, properties);
}
