#!/usr/bin/env node
/**
 * Turn a fresh copy of the boilerplate into a new app.
 *
 *   npm run init-app -- "Row Counter" com.yourname.rowcounter
 *
 * Updates: app name, slug, URL scheme, Android package, iOS bundle id (app.json),
 * package.json name, and AppConfig.name. Run it once, right after copying the folder.
 */
const fs = require('fs');
const path = require('path');

const [displayName, bundleId] = process.argv.slice(2);

if (!displayName || !bundleId || !/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(bundleId)) {
  console.error('Usage: npm run init-app -- "<App Name>" <com.yourname.appname>');
  console.error('The id must be lowercase, dot-separated, e.g. com.daim.rowcounter');
  process.exit(1);
}

const slug = displayName
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
const scheme = slug.replace(/-/g, '');
const root = path.join(__dirname, '..');

function updateJson(file, mutate) {
  const full = path.join(root, file);
  const json = JSON.parse(fs.readFileSync(full, 'utf8'));
  mutate(json);
  fs.writeFileSync(full, JSON.stringify(json, null, 2) + '\n');
}

updateJson('app.json', (json) => {
  const expo = json.expo;
  expo.name = displayName;
  expo.slug = slug;
  expo.scheme = scheme;
  expo.ios = { ...expo.ios, bundleIdentifier: bundleId };
  expo.android = { ...expo.android, package: bundleId };
  // A new app must get its own Expo project id; `eas init` will add it.
  if (expo.extra?.eas?.projectId) delete expo.extra.eas.projectId;
  if (expo.updates?.url) delete expo.updates.url;
  if (expo.owner) delete expo.owner;
});

updateJson('package.json', (json) => {
  json.name = slug;
});

const configFile = path.join(root, 'src/config/app-config.ts');
const config = fs.readFileSync(configFile, 'utf8').replace(/name: '[^']*'/, `name: '${displayName.replace(/'/g, "\\'")}'`);
fs.writeFileSync(configFile, config);

console.log(`✓ ${displayName}`);
console.log(`  slug: ${slug}   scheme: ${scheme}://   id: ${bundleId}`);
console.log('\nNext steps:');
console.log('  1. Replace icons/splash in assets/images and the colors in src/global.css + src/lib/theme.ts');
console.log('  2. Fill in support email + policy URLs in src/config/app-config.ts');
console.log('  3. cp .env.example .env.local  and add the keys you need');
console.log('  4. npx eas-cli@latest init   (links a new Expo project)');
