This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Boilerplate conventions

- Per-app values live in `src/config/app-config.ts`. Colors live in `src/global.css` (CSS variables) with a JS
  copy in `src/lib/theme.ts`; never hardcode colors in screens.
- Style with NativeWind `className` using the shadcn tokens (`bg-background`, `bg-card`, `text-foreground`,
  `text-muted-foreground`, `bg-primary`, `border-border`, ...). Merge classes with `cn()` from `@/lib/utils`.
  Use `useTheme().colors` only where classes can't go (icon `color` props).
- UI primitives come from React Native Reusables: add them with
  `npx @react-native-reusables/cli@latest add <name> --styling-library nativewind` (lands in `src/components/ui/`).
  Text inside `Button` must be wrapped in `<Text>` from `@/components/ui/text`.
- Backend is Convex (`src/lib/convex.ts`), only when an app needs one; auth via Convex Auth.
- App-wide providers go in `src/providers/app-providers.tsx`, not `_layout.tsx`.
- Services are wrapped in `src/lib/*` and must stay optional: a missing env key disables the feature, never crashes.
- Real app data → SQLite (`src/lib/db.ts`; append migrations, never edit shipped ones). Settings/flags → zustand
  stores persisted with `zustandStorage`. Secrets → expo-secure-store.
- Gate paid features with `useIsPro()`; open the paywall with `showPaywall()`.
- All user-facing text goes through i18n (`t('key')`, strings in `src/locales/en.json`).
- Use `haptics.*` for vibration (it respects the user's setting) and `track()` for analytics events.
- Reuse `Screen`, `ListRow`/`ListSection` and the Reusables components before writing new primitives.

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
