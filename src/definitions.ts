import type { PluginListenerHandle } from '@capacitor/core';

/**
 * Result returned by `isAvailable()`.
 *
 * @since 8.0.0
 */
export interface UwbAvailabilityResult {
  /**
   * Whether the device hardware supports UWB ranging.
   *
   * @since 8.0.0
   */
  supported: boolean;

  /**
   * Whether UWB is currently available and ready for a ranging session.
   *
   * @since 8.0.0
   */
  available: boolean;

  /**
   * Platform label returned by the native or web implementation.
   *
   * @since 8.0.0
   */
  platform: 'ios' | 'android' | 'web';
}

/**
 * Result returned by `getDiscoveryToken()` on iOS.
 *
 * @since 8.0.0
 */
export interface DiscoveryTokenResult {
  /**
   * Base64-encoded `NIDiscoveryToken` to share with a peer out-of-band.
   *
   * @since 8.0.0
   */
  discoveryToken: string;
}

/**
 * Android UWB complex channel exchanged out-of-band with a peer.
 *
 * @since 8.0.0
 */
export interface UwbComplexChannel {
  /**
   * UWB channel number.
   *
   * @since 8.0.0
   */
  channel: number;

  /**
   * Preamble index used for the ranging session.
   *
   * @since 8.0.0
   */
  preambleIndex: number;
}

/**
 * Android ranging parameters exchanged out-of-band between controller and controlee.
 *
 * @since 8.0.0
 */
export interface AndroidRangingParameters {
  /**
   * Session identifier shared by both peers.
   *
   * @since 8.0.0
   */
  sessionId: number;

  /**
   * Optional base64-encoded session key info.
   *
   * @since 8.0.0
   */
  sessionKeyInfo?: string;

  /**
   * Optional sub-session identifier for provisioned STS.
   *
   * @since 8.0.0
   */
  subSessionId?: number;

  /**
   * Optional base64-encoded sub-session key info.
   *
   * @since 8.0.0
   */
  subSessionKeyInfo?: string;

  /**
   * Channel configuration for the ranging session.
   *
   * @since 8.0.0
   */
  complexChannel: UwbComplexChannel;

  /**
   * Peer UWB address as a base64-encoded byte array.
   *
   * @since 8.0.0
   */
  peerAddress: string;

  /**
   * UWB config type. Defaults to unicast DS-TWR on Android.
   *
   * @since 8.0.0
   */
  uwbConfigType?: number;

  /**
   * Slot duration in milliseconds.
   *
   * @since 8.0.0
   */
  slotDurationMillis?: number;

  /**
   * Ranging update rate type from `RangingParameters` on Android.
   *
   * @since 8.0.0
   */
  updateRateType?: number;
}

/**
 * Parameters returned when starting an Android controller session.
 *
 * @since 8.0.0
 */
export interface AndroidControllerSessionResult {
  /**
   * Ranging parameters to share with the controlee out-of-band.
   *
   * @since 8.0.0
   */
  rangingParameters: AndroidRangingParameters;

  /**
   * Local UWB address as a base64-encoded byte array.
   *
   * @since 8.0.0
   */
  localAddress: string;
}

/**
 * Options for `startPeerSession()` on iOS.
 *
 * @since 8.0.0
 */
export interface StartPeerSessionOptions {
  /**
   * Base64-encoded peer `NIDiscoveryToken`.
   *
   * @since 8.0.0
   */
  peerDiscoveryToken: string;

  /**
   * Whether to enable camera assistance when supported (iOS 16+).
   *
   * @since 8.0.0
   */
  isCameraAssistanceEnabled?: boolean;
}

/**
 * Options for `startControllerSession()` on Android.
 *
 * @since 8.0.0
 */
export interface StartControllerSessionOptions {
  /**
   * Session identifier shared with the controlee.
   *
   * @since 8.0.0
   */
  sessionId?: number;

  /**
   * Optional base64-encoded session key info.
   *
   * @since 8.0.0
   */
  sessionKeyInfo?: string;

  /**
   * Optional sub-session identifier.
   *
   * @since 8.0.0
   */
  subSessionId?: number;

  /**
   * Optional base64-encoded sub-session key info.
   *
   * @since 8.0.0
   */
  subSessionKeyInfo?: string;

  /**
   * UWB channel configuration.
   *
   * @since 8.0.0
   */
  complexChannel?: UwbComplexChannel;

  /**
   * UWB config type. Defaults to unicast DS-TWR.
   *
   * @since 8.0.0
   */
  uwbConfigType?: number;

  /**
   * UWB config identifier.
  /**
   * Slot duration in milliseconds.
   *
   * @since 8.0.0
   */
  slotDurationMillis?: number;

  /**
   * Ranging update rate type from `RangingParameters` on Android.
   *
   * @since 8.0.0
   */
  updateRateType?: number;

  /**
   * Optional controlee UWB address. When provided, ranging starts immediately.
   *
   * @since 8.0.0
   */
  peerAddress?: string;
}
/**
 * Options for `startControleeSession()` on Android.
 *
 * @since 8.0.0
 */
export interface StartControleeSessionOptions {
  /**
   * Ranging parameters received from the controller out-of-band.
   *
   * @since 8.0.0
   */
  rangingParameters: AndroidRangingParameters;
}

/**
 * 3D direction vector reported by UWB ranging.
 *
 * @since 8.0.0
 */
export interface UwbDirection {
  /**
   * X component of the direction vector.
   *
   * @since 8.0.0
   */
  x: number;

  /**
   * Y component of the direction vector.
   *
   * @since 8.0.0
   */
  y: number;

  /**
   * Z component of the direction vector.
   *
   * @since 8.0.0
   */
  z: number;
}

/**
 * Payload emitted by the `rangingUpdate` listener.
 *
 * @since 8.0.0
 */
export interface RangingUpdateEvent {
  /**
   * Estimated distance to the peer in meters.
   *
   * @since 8.0.0
   */
  distanceMeters?: number;

  /**
   * Direction vector toward the peer when available.
   *
   * @since 8.0.0
   */
  direction?: UwbDirection;

  /**
   * Azimuth angle in radians when available.
   *
   * @since 8.0.0
   */
  azimuthRadians?: number;

  /**
   * Elevation angle in radians when available.
   *
   * @since 8.0.0
   */
  elevationRadians?: number;

  /**
   * Horizontal angle in radians when available.
   *
   * @since 8.0.0
   */
  horizontalAngleRadians?: number;

  /**
   * Unix timestamp in milliseconds when the update was received.
   *
   * @since 8.0.0
   */
  timestamp: number;
}

/**
 * Session lifecycle states reported by the plugin.
 *
 * @since 8.0.0
 */
export type UwbSessionState =
  | 'initialized'
  | 'running'
  | 'suspended'
  | 'resumed'
  | 'invalidated'
  | 'stopped'
  | 'peerDisconnected';

/**
 * Payload emitted by the `sessionStateChanged` listener.
 *
 * @since 8.0.0
 */
export interface SessionStateChangedEvent {
  /**
   * Current session state.
   *
   * @since 8.0.0
   */
  state: UwbSessionState;

  /**
   * Optional human-readable reason or error description.
   *
   * @since 8.0.0
   */
  reason?: string;
}

/**
 * Result returned when requesting the plugin version.
 *
 * @since 8.0.0
 */
export interface PluginVersionResult {
  /**
   * Native plugin version string.
   *
   * @since 8.0.0
   */
  version: string;
}

/**
 * Capacitor plugin for Ultra-Wideband (UWB) ranging on iOS and Android.
 *
 * iOS uses Apple's Nearby Interaction framework for peer-to-peer ranging.
 * Android uses Jetpack `androidx.core.uwb` for controller/controlee sessions.
 *
 * Both platforms require exchanging discovery tokens or ranging parameters
 * out-of-band (for example over Bluetooth LE or a backend).
 *
 * @since 8.0.0
 */
export interface CapacitorUwbPlugin {
  /**
   * Check whether UWB is supported and currently available on the device.
   *
   * @since 8.0.0
   */
  isAvailable(): Promise<UwbAvailabilityResult>;

  /**
   * Get the local Nearby Interaction discovery token on iOS.
   *
   * Share the returned token with a peer out-of-band, then call
   * `startPeerSession()` with the peer token.
   *
   * @since 8.0.0
   */
  getDiscoveryToken(): Promise<DiscoveryTokenResult>;

  /**
   * Start a Nearby Interaction peer session on iOS.
   *
   * @since 8.0.0
   */
  startPeerSession(options: StartPeerSessionOptions): Promise<void>;

  /**
   * Start an Android UWB controller session and return shareable parameters.
   *
   * @since 8.0.0
   */
  startControllerSession(options?: StartControllerSessionOptions): Promise<AndroidControllerSessionResult>;

  /**
   * Start an Android UWB controlee session with parameters from the controller.
   *
   * @since 8.0.0
   */
  startControleeSession(options: StartControleeSessionOptions): Promise<void>;

  /**
   * Stop the active UWB ranging session.
   *
   * @since 8.0.0
   */
  stopSession(): Promise<void>;

  /**
   * Listen for distance and direction updates from an active session.
   *
   * @since 8.0.0
   */
  addListener(
    eventName: 'rangingUpdate',
    listenerFunc: (event: RangingUpdateEvent) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Listen for session lifecycle changes.
   *
   * @since 8.0.0
   */
  addListener(
    eventName: 'sessionStateChanged',
    listenerFunc: (event: SessionStateChangedEvent) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Remove all registered listeners for this plugin.
   *
   * @since 8.0.0
   */
  removeAllListeners(): Promise<void>;

  /**
   * Get the current native plugin version.
   *
   * @since 8.0.0
   */
  getPluginVersion(): Promise<PluginVersionResult>;
}
