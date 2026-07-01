import { WebPlugin } from '@capacitor/core';

import type {
  AndroidControllerSessionResult,
  CapacitorUwbPlugin,
  DiscoveryTokenResult,
  PluginVersionResult,
  StartControleeSessionOptions,
  StartControllerSessionOptions,
  StartPeerSessionOptions,
  UwbAvailabilityResult,
} from './definitions';

export class CapacitorUwbWeb extends WebPlugin implements CapacitorUwbPlugin {
  async isAvailable(): Promise<UwbAvailabilityResult> {
    return {
      supported: false,
      available: false,
      platform: 'web',
    };
  }

  async getDiscoveryToken(): Promise<DiscoveryTokenResult> {
    throw this.unavailable('UWB ranging is not available on web.');
  }

  async startPeerSession(options: StartPeerSessionOptions): Promise<void> {
    void options;
    throw this.unavailable('UWB ranging is not available on web.');
  }

  async startControllerSession(options?: StartControllerSessionOptions): Promise<AndroidControllerSessionResult> {
    void options;
    throw this.unavailable('UWB ranging is not available on web.');
  }

  async startControleeSession(options: StartControleeSessionOptions): Promise<void> {
    void options;
    throw this.unavailable('UWB ranging is not available on web.');
  }

  async stopSession(): Promise<void> {
    return;
  }

  async getPluginVersion(): Promise<PluginVersionResult> {
    return {
      version: 'web',
    };
  }
}
