const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Nativewind v5 finds the CSS through the import in src/app/_layout.tsx (no `input` option).
// The native rem size is set in src/global.css (`:root { font-size: 16px }`).
module.exports = withNativewind(config);
