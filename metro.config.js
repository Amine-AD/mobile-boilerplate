const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// inlineRem: 16 matches web sizing, which React Native Reusables components expect.
module.exports = withNativeWind(config, { input: './src/global.css', inlineRem: 16 });
