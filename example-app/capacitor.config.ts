import type { CapacitorConfig } from '@capacitor/cli';

import pkg from './package.json';

const config: CapacitorConfig = {
  appId: 'app.capgo.uwb.example',
  appName: '@capgo/capacitor-uwb',
  webDir: 'dist',
  plugins: {
    CapacitorUpdater: {
      appId: 'app.capgo.uwb.example',
      autoUpdate: true,
      autoSplashscreen: true,
      directUpdate: 'always',
      defaultChannel: 'production',
      version: pkg.version,
    },
  },
};

export default config;
