# Mobile App Boilerplate (Expo SDK 58)

Starting point for small paid apps: Expo + React Native + TypeScript, Android first, iOS-ready.
Copy this folder for every new app.

## Start a new app

```bash
# 1. Copy the folder (without node_modules / .git), then inside the copy:
npm install
npm run init-app -- "Row Counter" com.yourname.rowcounter

# 2. Optional services: copy the env file and add the keys you use
cp .env.example .env.local

# 3. Run
npx expo start
```

Then replace the icons in `assets/images`, the colors in `src/global.css` (and their JS copy in `src/lib/theme.ts`),
and the links in `src/config/app-config.ts`.

> **Expo Go vs. development build:** payments (RevenueCat) need native code, so they only work in a
> development build. Everything else runs in Expo Go. Make a dev build with `npm run build:dev:android`
> (cloud, no Android Studio needed) or `npm run android:native` (local, needs Android Studio).

## What's included

| Need | Package | Where |
|---|---|---|
| Navigation | expo-router (file-based) | `src/app/` |
| Onboarding gate | `Stack.Protected` + settings store | `src/app/_layout.tsx` |
| Local database | expo-sqlite + migrations | `src/lib/db.ts` |
| Settings / small data | expo-sqlite kv-store + zustand persist | `src/lib/storage.ts`, `src/stores/` |
| Secrets / tokens | expo-secure-store | — |
| In-app purchases + paywall | react-native-purchases (+ -ui) / RevenueCat | `src/lib/purchases.ts`, `useIsPro()` |
| Analytics, errors, feature flags | posthog-react-native | `src/lib/analytics.ts` → `track()` |
| Styling | NativeWind v4 (Tailwind CSS 3) — `className="p-4 bg-card"` | `src/global.css`, `tailwind.config.js` |
| UI components | React Native Reusables (shadcn/ui for RN) + `cn()` helper | `src/components/ui/` |
| Backend (optional) | Convex (realtime DB, server functions, files, auth) | `src/lib/convex.ts` (null if no URL) |
| Server data fetching | @tanstack/react-query | `src/lib/query-client.ts` |
| Translations | i18next + react-i18next + expo-localization | `src/lib/i18n.ts`, `src/locales/` |
| Forms + validation | react-hook-form + zod + @hookform/resolvers | — |
| Reminders | expo-notifications | `src/lib/notifications.ts` |
| Vibration | expo-haptics (respects user setting) | `src/lib/haptics.ts` |
| Store review prompt | expo-store-review | `src/lib/review.ts` → `recordHappyMoment()` |
| Files, sharing, pickers | expo-file-system, -sharing, -image-picker, -document-picker, -clipboard | — |
| UI helpers | expo-image, expo-blur, expo-linear-gradient, @expo/vector-icons, @shopify/flash-list | `src/components/ui/` |
| Dates | date-fns | — |
| OTA updates + dev builds | expo-updates, expo-dev-client, `eas.json` | — |
| Code quality | ESLint (expo), Prettier, TypeScript strict | `npm run lint / typecheck / format` |

Every external service is **optional**. If its key is missing in `.env.local`, that feature switches off
instead of crashing.

## Project structure

```
src/
  app/            screens (every file is a route) — _layout, onboarding, index (home), settings
  components/ui/  Reusables (button, text, separator, switch, ...) + Screen, ListRow/ListSection
  config/         app-config.ts — per-app name, links, entitlement id
  global.css      Tailwind + color variables (light/dark) — rebrand here
  hooks/          useTheme (scheme + JS colors for icons)
  lib/            services: db, storage, purchases, analytics, convex, i18n, notifications, haptics, review,
                  theme (JS colors + navigation theme), utils (cn)
  locales/        translation files
  providers/      app-providers.tsx — every app-wide provider in one place
  stores/         zustand stores (settings, pro status)
```

## Scripts

| Command | What it does |
|---|---|
| `npx expo start` | Dev server (Expo Go or dev build) |
| `npm run init-app -- "Name" com.you.app` | Rename the copy into a new app |
| `npm run typecheck` / `npm run lint` / `npm run format` | Code checks |
| `npm run build:dev:android` | Cloud development build (APK) |
| `npm run build:preview:android` | Cloud test build (APK) to share with testers |
| `npm run build:prod:android` | Play Store build (AAB) |

## Setting up services (when an app needs them)

- **RevenueCat:** create the app in RevenueCat, add the Play Store product(s), create the `pro` entitlement and a
  paywall, then put the public Android key in `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY`.
- **PostHog:** create a project and copy the API key and host.
- **Convex:** only for apps that need a backend (accounts, cloud sync, sharing between users). Run `npx convex dev`
  once: it logs you in, creates the project and the `convex/` folder, and writes `EXPO_PUBLIC_CONVEX_URL`.
  For sign-in, add Convex Auth (`@convex-dev/auth`) for that app. No Clerk or Better Auth needed for simple email/Google/Apple login.

## UI components (React Native Reusables)

Add more components from https://reactnativereusables.com/docs/components:

```bash
npx @react-native-reusables/cli@latest add dialog input card checkbox --styling-library nativewind
```

They're copied into `src/components/ui/` and are yours to edit. gluestack-ui and NativeWindUI also run on
NativeWind, so their components work here too if you need something Reusables doesn't have.
- **Expo/EAS:** `npx eas-cli@latest init` once per app, then `eas env` for build-time variables.
