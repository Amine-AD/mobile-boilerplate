const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Nativewind v5 finds the CSS through the import in src/app/_layout.tsx (no `input` option).
// The native rem size is set in src/global.css (`:root { font-size: 16px }`).
const finalConfig = withNativewind(config);

/*
 * Workaround for Nativewind 5.0.0-rc.1 (react-native-css 3.1.0-rc.1) on React Native 0.88:
 * Nativewind's resolver points every 'react-native' import at react-native-css's component module, whose export list
 * doesn't include `AssetRegistry` (new in RN 0.88). expo-asset needs it, so fonts and bundled images
 * fail with "Cannot read property 'getAssetByID' of undefined". expo-asset renders no components,
 * so let it import the real react-native. Remove once react-native-css exports AssetRegistry.
 */
const expoAssetDir = `${path.sep}expo-asset${path.sep}`;
const upstreamResolve = finalConfig.resolver.resolveRequest;
finalConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react-native' && context.originModulePath.includes(expoAssetDir)) {
    // Metro's default resolver, skipping Nativewind's redirect.
    return context.resolveRequest(context, moduleName, platform);
  }
  return (upstreamResolve ?? context.resolveRequest)(context, moduleName, platform);
};

module.exports = finalConfig;
