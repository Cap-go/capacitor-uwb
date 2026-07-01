import { registerPlugin } from '@capacitor/core';

import type { CapacitorUwbPlugin } from './definitions';

const CapacitorUwb = registerPlugin<CapacitorUwbPlugin>('CapacitorUwb', {
  web: () => import('./web').then((m) => new m.CapacitorUwbWeb()),
});

export * from './definitions';
export { CapacitorUwb };
