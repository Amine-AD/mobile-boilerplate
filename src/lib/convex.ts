import { ConvexReactClient } from 'convex/react';

import { env } from '@/lib/env';

/**
 * Optional backend (realtime database, server functions, file storage, auth) via Convex.
 * `convex` is null until EXPO_PUBLIC_CONVEX_URL is set, so offline-only apps can ignore it.
 *
 * Enable for an app:  `npx convex dev`  (logs in, creates the project, the `convex/` folder,
 * and writes EXPO_PUBLIC_CONVEX_URL to .env.local). Then use `useQuery(api.x.y)` / `useMutation(...)`.
 */
export const convex: ConvexReactClient | null = env.EXPO_PUBLIC_CONVEX_URL
  ? new ConvexReactClient(env.EXPO_PUBLIC_CONVEX_URL, { unsavedChangesWarning: false })
  : null;
