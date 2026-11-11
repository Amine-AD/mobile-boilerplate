import { z } from 'zod';

/**
 * Public env vars (EXPO_PUBLIC_*) are inlined into the app bundle at build time.
 * Never put secrets here — anyone can read them from the app.
 * Every service is optional: if its key is missing, that feature is disabled instead of crashing.
 */
const schema = z.object({
  EXPO_PUBLIC_REVENUECAT_ANDROID_KEY: z.string().optional(),
  EXPO_PUBLIC_REVENUECAT_IOS_KEY: z.string().optional(),
  EXPO_PUBLIC_POSTHOG_API_KEY: z.string().optional(),
  EXPO_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  EXPO_PUBLIC_CONVEX_URL: z.string().url().optional(),
});

// EXPO_PUBLIC_* vars must be referenced statically (process.env.NAME) to be inlined.
const raw = {
  EXPO_PUBLIC_REVENUECAT_ANDROID_KEY: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY || undefined,
  EXPO_PUBLIC_REVENUECAT_IOS_KEY: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY || undefined,
  EXPO_PUBLIC_POSTHOG_API_KEY: process.env.EXPO_PUBLIC_POSTHOG_API_KEY || undefined,
  EXPO_PUBLIC_POSTHOG_HOST: process.env.EXPO_PUBLIC_POSTHOG_HOST || undefined,
  EXPO_PUBLIC_CONVEX_URL: process.env.EXPO_PUBLIC_CONVEX_URL || undefined,
};

const parsed = schema.safeParse(raw);
if (!parsed.success) {
  console.warn('[env] Invalid environment variables:', parsed.error.issues);
}

export const env = parsed.success ? parsed.data : schema.partial().parse({});
