# @capgo/capacitor-uwb

<a href="https://capgo.app/"><img src="https://capgo.app/readme-banner.svg?repo=Cap-go/capacitor-uwb" alt="Capgo - Instant updates for Capacitor" /></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_uwb"> ➡️ Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_uwb"> Missing a feature? We'll build the plugin for you 💪</a></h2>
</div>

Capacitor plugin for Ultra-Wideband (UWB) ranging on iOS and Android.

## Why this plugin

This plugin wraps the native UWB ranging APIs on iOS and Android so a Capacitor app can:

- Check whether the current device supports UWB ranging.
- Run peer-to-peer ranging on iOS with Apple's Nearby Interaction framework.
- Run controller/controlee ranging sessions on Android with Jetpack `androidx.core.uwb`.
- Receive distance, direction, and session lifecycle updates through plugin listeners.

On iOS, peers exchange `NIDiscoveryToken` values out-of-band, then call `startPeerSession()`.
On Android, the controller shares ranging parameters out-of-band before the controlee starts its session.

## Platform support

| Platform | Support |
|----------|---------|
| iOS      | ✅ Nearby Interaction peer ranging with distance and direction |
| Android  | ✅ Jetpack UWB controller/controlee sessions (Android 12+, UWB hardware) |
| Web      | ❌ Not available |

## Compatibility

| Plugin version | Capacitor compatibility | Maintained |
| -------------- | ----------------------- | ---------- |
| v8.*.*         | v8.*.*                  | ✅         |
| v7.*.*         | v7.*.*                  | On demand  |
| v6.*.*         | v6.*.*                  | On demand  |

> The plugin major version follows the Capacitor major version.

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/cap-go/capacitor-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `cap-go/capacitor-skills` to install the `@capgo/capacitor-uwb` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

```bash
bun add @capgo/capacitor-uwb
bunx cap sync
```

## Usage

```typescript
import { CapacitorUwb } from '@capgo/capacitor-uwb';

const availability = await CapacitorUwb.isAvailable();
if (!availability.available) {
  return;
}

await CapacitorUwb.addListener('rangingUpdate', (update) => {
  console.log(update.distanceMeters, update.direction);
});

// iOS: exchange discovery tokens out-of-band, then start ranging
const { discoveryToken } = await CapacitorUwb.getDiscoveryToken();
await CapacitorUwb.startPeerSession({ peerDiscoveryToken: '<peer-token-base64>' });

// Android: controller shares ranging parameters out-of-band
const controller = await CapacitorUwb.startControllerSession();
await CapacitorUwb.startControleeSession({
  rangingParameters: {
    ...controller.rangingParameters,
    peerAddress: controller.localAddress,
  },
});

await CapacitorUwb.stopSession();
```

## Notes

- Test on real UWB hardware. Simulators and most desktop browsers do not expose UWB radios.
- **iOS:** Add the Nearby Interaction capability in Xcode and set `NSNearbyInteractionUsageDescription` in `Info.plist`.
- **Android:** The plugin declares `android.permission.UWB_RANGING`. Exchange ranging parameters out-of-band between controller and controlee before starting sessions.
- **Web:** `isAvailable()` returns `supported: false`.

Full setup guides: [capgo.app/docs/plugins/uwb](https://capgo.app/docs/plugins/uwb/)

## Example app

The `example-app/` folder contains a small Vite demo for checking availability, exchanging session parameters, listening for ranging updates, and stopping sessions.

## API

<docgen-index>

* [`isAvailable()`](#isavailable)
* [`getDiscoveryToken()`](#getdiscoverytoken)
* [`startPeerSession(...)`](#startpeersession)
* [`startControllerSession(...)`](#startcontrollersession)
* [`startControleeSession(...)`](#startcontroleesession)
* [`stopSession()`](#stopsession)
* [`addListener('rangingUpdate', ...)`](#addlistenerrangingupdate-)
* [`addListener('sessionStateChanged', ...)`](#addlistenersessionstatechanged-)
* [`removeAllListeners()`](#removealllisteners)
* [`getPluginVersion()`](#getpluginversion)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

Capacitor plugin for Ultra-Wideband (UWB) ranging on iOS and Android.

iOS uses Apple's Nearby Interaction framework for peer-to-peer ranging.
Android uses Jetpack `androidx.core.uwb` for controller/controlee sessions.

Both platforms require exchanging discovery tokens or ranging parameters
out-of-band (for example over Bluetooth LE or a backend).

### isAvailable()

```typescript
isAvailable() => Promise<UwbAvailabilityResult>
```

Check whether UWB is supported and currently available on the device.

**Returns:** <code>Promise&lt;<a href="#uwbavailabilityresult">UwbAvailabilityResult</a>&gt;</code>

**Since:** 8.0.0

--------------------


### getDiscoveryToken()

```typescript
getDiscoveryToken() => Promise<DiscoveryTokenResult>
```

Get the local Nearby Interaction discovery token on iOS.

Share the returned token with a peer out-of-band, then call
`startPeerSession()` with the peer token.

**Returns:** <code>Promise&lt;<a href="#discoverytokenresult">DiscoveryTokenResult</a>&gt;</code>

**Since:** 8.0.0

--------------------


### startPeerSession(...)

```typescript
startPeerSession(options: StartPeerSessionOptions) => Promise<void>
```

Start a Nearby Interaction peer session on iOS.

| Param         | Type                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| **`options`** | <code><a href="#startpeersessionoptions">StartPeerSessionOptions</a></code> |

**Since:** 8.0.0

--------------------


### startControllerSession(...)

```typescript
startControllerSession(options?: StartControllerSessionOptions | undefined) => Promise<AndroidControllerSessionResult>
```

Start an Android UWB controller session and return shareable parameters.

| Param         | Type                                                                                    |
| ------------- | --------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#startcontrollersessionoptions">StartControllerSessionOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#androidcontrollersessionresult">AndroidControllerSessionResult</a>&gt;</code>

**Since:** 8.0.0

--------------------


### startControleeSession(...)

```typescript
startControleeSession(options: StartControleeSessionOptions) => Promise<void>
```

Start an Android UWB controlee session with parameters from the controller.

| Param         | Type                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#startcontroleesessionoptions">StartControleeSessionOptions</a></code> |

**Since:** 8.0.0

--------------------


### stopSession()

```typescript
stopSession() => Promise<void>
```

Stop the active UWB ranging session.

**Since:** 8.0.0

--------------------


### addListener('rangingUpdate', ...)

```typescript
addListener(eventName: 'rangingUpdate', listenerFunc: (event: RangingUpdateEvent) => void) => Promise<PluginListenerHandle>
```

Listen for distance and direction updates from an active session.

| Param              | Type                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'rangingUpdate'</code>                                                          |
| **`listenerFunc`** | <code>(event: <a href="#rangingupdateevent">RangingUpdateEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 8.0.0

--------------------


### addListener('sessionStateChanged', ...)

```typescript
addListener(eventName: 'sessionStateChanged', listenerFunc: (event: SessionStateChangedEvent) => void) => Promise<PluginListenerHandle>
```

Listen for session lifecycle changes.

| Param              | Type                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'sessionStateChanged'</code>                                                                |
| **`listenerFunc`** | <code>(event: <a href="#sessionstatechangedevent">SessionStateChangedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 8.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Remove all registered listeners for this plugin.

**Since:** 8.0.0

--------------------


### getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersionResult>
```

Get the current native plugin version.

**Returns:** <code>Promise&lt;<a href="#pluginversionresult">PluginVersionResult</a>&gt;</code>

**Since:** 8.0.0

--------------------


### Interfaces


#### UwbAvailabilityResult

Result returned by `isAvailable()`.

| Prop            | Type                                     | Description                                                         | Since |
| --------------- | ---------------------------------------- | ------------------------------------------------------------------- | ----- |
| **`supported`** | <code>boolean</code>                     | Whether the device hardware supports UWB ranging.                   | 8.0.0 |
| **`available`** | <code>boolean</code>                     | Whether UWB is currently available and ready for a ranging session. | 8.0.0 |
| **`platform`**  | <code>'ios' \| 'android' \| 'web'</code> | Platform label returned by the native or web implementation.        | 8.0.0 |


#### DiscoveryTokenResult

Result returned by `getDiscoveryToken()` on iOS.

| Prop                 | Type                | Description                                                         | Since |
| -------------------- | ------------------- | ------------------------------------------------------------------- | ----- |
| **`discoveryToken`** | <code>string</code> | Base64-encoded `NIDiscoveryToken` to share with a peer out-of-band. | 8.0.0 |


#### StartPeerSessionOptions

Options for `startPeerSession()` on iOS.

| Prop                            | Type                 | Description                                                   | Since |
| ------------------------------- | -------------------- | ------------------------------------------------------------- | ----- |
| **`peerDiscoveryToken`**        | <code>string</code>  | Base64-encoded peer `NIDiscoveryToken`.                       | 8.0.0 |
| **`isCameraAssistanceEnabled`** | <code>boolean</code> | Whether to enable camera assistance when supported (iOS 16+). | 8.0.0 |


#### AndroidControllerSessionResult

Parameters returned when starting an Android controller session.

| Prop                    | Type                                                                          | Description                                                 | Since |
| ----------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------- | ----- |
| **`rangingParameters`** | <code><a href="#androidrangingparameters">AndroidRangingParameters</a></code> | Ranging parameters to share with the controlee out-of-band. | 8.0.0 |
| **`localAddress`**      | <code>string</code>                                                           | Local UWB address as a base64-encoded byte array.           | 8.0.0 |


#### AndroidRangingParameters

Android ranging parameters exchanged out-of-band between controller and controlee.

| Prop                     | Type                                                            | Description                                                   | Since |
| ------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------- | ----- |
| **`sessionId`**          | <code>number</code>                                             | Session identifier shared by both peers.                      | 8.0.0 |
| **`sessionKeyInfo`**     | <code>string</code>                                             | Optional base64-encoded session key info.                     | 8.0.0 |
| **`subSessionId`**       | <code>number</code>                                             | Optional sub-session identifier for provisioned STS.          | 8.0.0 |
| **`subSessionKeyInfo`**  | <code>string</code>                                             | Optional base64-encoded sub-session key info.                 | 8.0.0 |
| **`complexChannel`**     | <code><a href="#uwbcomplexchannel">UwbComplexChannel</a></code> | Channel configuration for the ranging session.                | 8.0.0 |
| **`peerAddress`**        | <code>string</code>                                             | Peer UWB address as a base64-encoded byte array.              | 8.0.0 |
| **`uwbConfigType`**      | <code>number</code>                                             | UWB config type. Defaults to unicast DS-TWR on Android.       | 8.0.0 |
| **`slotDurationMillis`** | <code>number</code>                                             | Slot duration in milliseconds.                                | 8.0.0 |
| **`updateRateType`**     | <code>number</code>                                             | Ranging update rate type from `RangingParameters` on Android. | 8.0.0 |


#### UwbComplexChannel

Android UWB complex channel exchanged out-of-band with a peer.

| Prop                | Type                | Description                                  | Since |
| ------------------- | ------------------- | -------------------------------------------- | ----- |
| **`channel`**       | <code>number</code> | UWB channel number.                          | 8.0.0 |
| **`preambleIndex`** | <code>number</code> | Preamble index used for the ranging session. | 8.0.0 |


#### StartControllerSessionOptions

Options for `startControllerSession()` on Android.

| Prop                     | Type                                                            | Description                                                                | Since |
| ------------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------- | ----- |
| **`sessionId`**          | <code>number</code>                                             | Session identifier shared with the controlee.                              | 8.0.0 |
| **`sessionKeyInfo`**     | <code>string</code>                                             | Optional base64-encoded session key info.                                  | 8.0.0 |
| **`subSessionId`**       | <code>number</code>                                             | Optional sub-session identifier.                                           | 8.0.0 |
| **`subSessionKeyInfo`**  | <code>string</code>                                             | Optional base64-encoded sub-session key info.                              | 8.0.0 |
| **`complexChannel`**     | <code><a href="#uwbcomplexchannel">UwbComplexChannel</a></code> | UWB channel configuration.                                                 | 8.0.0 |
| **`uwbConfigType`**      | <code>number</code>                                             | UWB config type. Defaults to unicast DS-TWR.                               | 8.0.0 |
| **`slotDurationMillis`** | <code>number</code>                                             | Slot duration in milliseconds.                                             | 8.0.0 |
| **`updateRateType`**     | <code>number</code>                                             | Ranging update rate type from `RangingParameters` on Android.              | 8.0.0 |
| **`peerAddress`**        | <code>string</code>                                             | Optional controlee UWB address. When provided, ranging starts immediately. | 8.0.0 |


#### StartControleeSessionOptions

Options for `startControleeSession()` on Android.

| Prop                    | Type                                                                          | Description                                                  | Since |
| ----------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ | ----- |
| **`rangingParameters`** | <code><a href="#androidrangingparameters">AndroidRangingParameters</a></code> | Ranging parameters received from the controller out-of-band. | 8.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### RangingUpdateEvent

Payload emitted by the `rangingUpdate` listener.

| Prop                         | Type                                                  | Description                                                  | Since |
| ---------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ | ----- |
| **`distanceMeters`**         | <code>number</code>                                   | Estimated distance to the peer in meters.                    | 8.0.0 |
| **`direction`**              | <code><a href="#uwbdirection">UwbDirection</a></code> | Direction vector toward the peer when available.             | 8.0.0 |
| **`azimuthRadians`**         | <code>number</code>                                   | Azimuth angle in radians when available.                     | 8.0.0 |
| **`elevationRadians`**       | <code>number</code>                                   | Elevation angle in radians when available.                   | 8.0.0 |
| **`horizontalAngleRadians`** | <code>number</code>                                   | Horizontal angle in radians when available.                  | 8.0.0 |
| **`timestamp`**              | <code>number</code>                                   | Unix timestamp in milliseconds when the update was received. | 8.0.0 |


#### UwbDirection

3D direction vector reported by UWB ranging.

| Prop    | Type                | Description                          | Since |
| ------- | ------------------- | ------------------------------------ | ----- |
| **`x`** | <code>number</code> | X component of the direction vector. | 8.0.0 |
| **`y`** | <code>number</code> | Y component of the direction vector. | 8.0.0 |
| **`z`** | <code>number</code> | Z component of the direction vector. | 8.0.0 |


#### SessionStateChangedEvent

Payload emitted by the `sessionStateChanged` listener.

| Prop         | Type                                                        | Description                                          | Since |
| ------------ | ----------------------------------------------------------- | ---------------------------------------------------- | ----- |
| **`state`**  | <code><a href="#uwbsessionstate">UwbSessionState</a></code> | Current session state.                               | 8.0.0 |
| **`reason`** | <code>string</code>                                         | Optional human-readable reason or error description. | 8.0.0 |


#### PluginVersionResult

Result returned when requesting the plugin version.

| Prop          | Type                | Description                   | Since |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`version`** | <code>string</code> | Native plugin version string. | 8.0.0 |


### Type Aliases


#### UwbSessionState

Session lifecycle states reported by the plugin.

<code>'initialized' | 'running' | 'suspended' | 'resumed' | 'invalidated' | 'stopped' | 'peerDisconnected'</code>

</docgen-api>
