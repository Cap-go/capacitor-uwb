# @capgo/capacitor-uwb

<a href="https://capgo.app/"><img src="https://capgo.app/readme-banner.svg?repo=Cap-go/capacitor-uwb" alt="Capgo - Instant updates for Capacitor" /></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_uwb"> ➡️ Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_uwb"> Missing a feature? We’ll build the plugin for you 💪</a></h2>
</div>

Ultra-Wideband (UWB) ranging for Capacitor apps. iOS uses Apple's Nearby Interaction framework for peer-to-peer distance and direction. Android uses Jetpack `androidx.core.uwb` for controller/controlee ranging sessions.

## Snapshot

- **Plugin name:** `Capacitor UWB`
- **One-line value:** `UWB ranging for iOS Nearby Interaction and Android Jetpack UWB`
- **Maintainer:** `Cap-go`
- **Status:** `alpha`

## Pre-Release Checklist

- [ ] Replace all `{{PLACEHOLDER}}` values in this README.
- [ ] Replace `{{PLUGIN_REF_SLUG}}` in Capgo CTA links (example: `native_audio`).
- [ ] Confirm the README banner image uses `https://capgo.app/readme-banner.svg?repo=<GitHubOrg>/capacitor-{{PLUGIN_SLUG}}`.
- [ ] Replace all `__AI_KEYWORD_*__` entries in `package.json`.
- [ ] Change git remote away from this template before first push:
  `git remote set-url origin git@github.com:Cap-go/capacitor-{{PLUGIN_SLUG}}.git`
- [ ] Remove bootstrap-only init script from generated plugin copy:
  delete `scripts/init-plugin.sh`, delete `scripts/templates/`, and remove `"init-plugin"` from `package.json` scripts.
- [ ] Update the compatibility table for this plugin.
- [ ] Update `src/definitions.ts` with the real public API and JSDoc.
- [ ] Run `bun run docgen` and review generated API docs below.
- [ ] Confirm examples in this file run against the real implementation.
- [ ] Set GitHub repo description to start with `Capacitor plugin for ...`.
- [ ] Set GitHub repo homepage to `https://capgo.app/docs/plugins/{{PLUGIN_SLUG}}/`.
- [ ] Create a GitHub repository custom social preview from `assets/github-social-template.svg`, export it to `assets/github-social-preview.png`, and upload it at GitHub **Settings** -> **General** -> **Social preview**.
- [ ] Open docs/website PR and follow the complete website integration checklist in section **3) Open docs/website pull request**.
- [ ] Run `bun run verify` before publishing.

## Problem & Scope

### Why this plugin exists

`{{WHAT_PAIN_POINT_IT_SOLVES}}`

## Capgo Links

- **Plugin docs URL:** `https://capgo.app/docs/plugins/{{PLUGIN_SLUG}}/`
- **Plugin tutorial URL:** `{{PLUGIN_TUTORIAL_URL}}`
- **Website/docs repo:** `https://github.com/Cap-go/website`

### What it does

- `{{CAPABILITY_1}}`
- `{{CAPABILITY_2}}`
- `{{CAPABILITY_3}}`

### What it does not do

- `{{OUT_OF_SCOPE_1}}`
- `{{OUT_OF_SCOPE_2}}`

## Compatibility

| Plugin version | Capacitor compatibility | Maintained |
| -------------- | ----------------------- | ---------- |
| v8.\*.\*       | v8.\*.\*                | ✅          |
| v7.\*.\*       | v7.\*.\*                | On demand   |
| v6.\*.\*       | v6.\*.\*                | On demand   |

Policy:

- New plugins start at version `8.0.0` (Capacitor 8 baseline).
- Backward compatibility for older Capacitor majors is supported on demand.

## Quick Start (Template Authors)

```bash
bun install
bun run init-plugin your-plugin YourPlugin app.capgo.yourplugin
# Optional Kotlin Android variant:
# bun run init-plugin your-plugin YourPlugin app.capgo.yourplugin Cap-go kotlin
bun run verify
```

The `init-plugin` command updates package names, native class names, iOS/Android identifiers, and the local example app wiring.
It accepts an optional fifth `android-lang` argument and defaults to `java`; pass `kotlin` to generate Kotlin Android sources and Gradle setup.
To use Kotlin while keeping the default GitHub org, pass `Cap-go` as the 4th argument and `kotlin` as the 5th argument.

After running `init-plugin` in your new plugin copy:

```bash
git remote set-url origin git@github.com:Cap-go/capacitor-your-plugin.git
rm scripts/init-plugin.sh
rm -rf scripts/templates
```

Then remove `"init-plugin"` from the `scripts` section in `package.json` before publishing.

## Capgo Example App Deploy Setup

The `Deploy example app to Capgo` GitHub Actions workflow publishes the built `example-app/` web bundle to Capgo when a GitHub release is published or the workflow is manually dispatched. It checks out the release tag, builds the plugin and example app with Bun, and uploads the bundle with one direct Capgo CLI command.

Required setup for every plugin created from this template:

1. Create a Capgo app for the example app id from `example-app/capacitor.config.ts`.
   The default id is `app.capgo.uwb.example`; after `bun run init-plugin ...`, verify both `appId` values in that file match the new plugin package id plus `.example`.
2. Keep the Capgo channel named `production`, or edit `.github/workflows/deploy_example_app.yml` if the example app should publish to a different default channel.

`CAPGO_TOKEN` is already configured as a Capgo organization GitHub Actions secret and is read by the workflow through `${{ secrets.CAPGO_TOKEN }}`. Do not create a duplicate repository secret for new plugin repositories.

## Capacitor Hook Scripts (Recommended)

For plugins that need automated setup during `cap sync` / `cap update`, define Capacitor lifecycle hooks in `package.json`.

Example:

```json
{
  "scripts": {
    "generate:version-share": "bun run scripts/generate-version-share-data.mjs",
    "configure:dependencies": "bun run scripts/configure-dependencies.mjs",
    "capacitor:sync:before": "bun run generate:version-share",
    "capacitor:update:before": "bun run generate:version-share",
    "capacitor:sync:after": "bun run configure:dependencies"
  }
}
```

Guideline:
- Use `*:before` for generated inputs needed by native sync/update.
- Use `*:after` for native patching that depends on files created by sync/update.
- Keep hook scripts idempotent.

## Public Launch (Required)

### 1) Publish in Capgo GitHub org as public

```bash
gh repo create Cap-go/capacitor-{{PLUGIN_SLUG}} --public --source=. --remote=origin --push
```

If the repo already exists and is private:

```bash
gh repo edit Cap-go/capacitor-{{PLUGIN_SLUG}} --visibility public --accept-visibility-change-consequences
```

### 2) Set GitHub description, homepage, and custom social preview

Description must always start with: `Capacitor plugin for ...`

```bash
gh repo edit Cap-go/capacitor-{{PLUGIN_SLUG}} \
  --description "Capacitor plugin for {{SHORT_USE_CASE}}." \
  --homepage "https://capgo.app/docs/plugins/{{PLUGIN_SLUG}}/"
```

Create the GitHub repository custom social preview before launch. GitHub uses this image for repository cards, link unfurls, and social shares; it is separate from the README banner and website docs images.

1. Open `assets/github-social-template.svg`.
2. Replace the sample headline, accent line, description, and badges with plugin-specific copy.
3. Keep the terminal command as `npm i @capgo/capacitor-{{PLUGIN_SLUG}}` because social and docs copy should use public npm install syntax.
4. Export the SVG as a 1280 x 640 PNG at `assets/github-social-preview.png`.
5. Have the agent try to upload the PNG in GitHub under repository **Settings** -> **General** -> **Social preview** -> **Edit**.
6. Prefer a supported GitHub API if one exists. GitHub currently does not expose a supported public REST/GraphQL endpoint for this upload, so the practical automation path is an authenticated browser session with repository admin access.
7. If the agent cannot access an authenticated GitHub web session with admin rights, keep `assets/github-social-preview.png` in the repo and report that only the GitHub UI upload is blocked.
8. Do not treat the repository as launch-ready until this custom GitHub social preview is uploaded.
9. Copy targets: headline 4-9 words, accent line 2-6 words, description 60-110 characters, badges 1-3 words each. These are guardrails, not hard failures; the SVG clips longer text inside safe regions, so only shorten copy when the rendered image is hard to read or visibly clipped.

### 3) Open docs/website pull request

Create a PR on `https://github.com/Cap-go/website` (or the local `landing/` folder in the monorepo) with all of the following:

1. Add the plugin entry in `src/config/plugins.ts`.
2. Add a plugin `LinkCard` in `src/content/docs/docs/plugins/index.mdx`.
3. Create docs pages in `src/content/docs/docs/plugins/<plugin-doc-slug>/`:
   `index.mdx`, `getting-started.mdx`, and optionally `ios.mdx` + `android.mdx` when platform setup differs.
4. Update `astro.config.mjs`:
   add `docs/plugins/<plugin-doc-slug>/**` in pagefind path buckets and add a sidebar section for the plugin pages.
5. Add the SEO tutorial page in `src/content/plugins-tutorials/en/<plugin-repo-slug>.md`.
6. Add icon asset `public/icons/plugins/<plugin-doc-slug>.svg` if the docs hero uses a plugin icon.
7. Cross-link docs and tutorial pages.

Slug mapping rules:

- `<plugin-doc-slug>` is the docs route slug used under `/docs/plugins/<plugin-doc-slug>/`.
- `<plugin-repo-slug>` is extracted from the GitHub repo URL in `src/config/plugins.ts` and is used by `/plugins/<slug>/`.
- Example: repo `https://github.com/Cap-go/capacitor-app-attest/` requires tutorial file
  `src/content/plugins-tutorials/en/capacitor-app-attest.md`.

Starter snippets:

`src/config/plugins.ts`

```ts
{
  name: '@capgo/capacitor-{{PLUGIN_SLUG}}',
  author: 'github.com/Cap-go',
  description: 'Capacitor plugin for {{SHORT_USE_CASE}}',
  href: 'https://github.com/Cap-go/capacitor-{{PLUGIN_SLUG}}/',
  title: '{{PLUGIN_DISPLAY_NAME}}',
  icon: ShieldCheckIcon,
},
```

`astro.config.mjs` sidebar entry

```ts
{
  label: '{{PLUGIN_DISPLAY_NAME}}',
  items: [
    { label: 'Overview', link: '/docs/plugins/<plugin-doc-slug>/' },
    { label: 'Getting started', link: '/docs/plugins/<plugin-doc-slug>/getting-started' },
    { label: 'iOS setup', link: '/docs/plugins/<plugin-doc-slug>/ios' },
    { label: 'Android setup', link: '/docs/plugins/<plugin-doc-slug>/android' },
  ],
  collapsed: true,
},
```

Required docs files:

- `src/content/docs/docs/plugins/<plugin-doc-slug>/index.mdx`
- `src/content/docs/docs/plugins/<plugin-doc-slug>/getting-started.mdx`
- `src/content/docs/docs/plugins/<plugin-doc-slug>/ios.mdx` (if iOS-specific setup exists)
- `src/content/docs/docs/plugins/<plugin-doc-slug>/android.mdx` (if Android-specific setup exists)
- `src/content/plugins-tutorials/en/<plugin-repo-slug>.md`

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

## Minimal Usage

```typescript
import { CapacitorUwb } from '@capgo/capacitor-uwb';

const availability = await CapacitorUwb.isAvailable();
console.log(availability);

// iOS: exchange discovery tokens out-of-band, then start ranging
const { discoveryToken } = await CapacitorUwb.getDiscoveryToken();
await CapacitorUwb.startPeerSession({ peerDiscoveryToken: '<peer-token-base64>' });

// Android: controller shares ranging parameters out-of-band
const controller = await CapacitorUwb.startControllerSession();
await CapacitorUwb.startControleeSession({ rangingParameters: controller.rangingParameters });

await CapacitorUwb.addListener('rangingUpdate', (update) => {
  console.log(update.distanceMeters, update.direction);
});
```

## Integration Notes

- **iOS:** Add the Nearby Interaction capability in Xcode, set `NSNearbyInteractionUsageDescription` in `Info.plist`, and exchange `NIDiscoveryToken` values out-of-band (for example over BLE or your backend).
- **Android:** Requires Android 12+ and UWB hardware. The plugin declares `android.permission.UWB_RANGING`. Exchange ranging parameters out-of-band between controller and controlee before starting sessions.
- **Web:** Not supported. `isAvailable()` returns `supported: false`.

## Example App

The `example-app/` folder is linked via `file:..` and is intended for validating native wiring during development.

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
| **`slotDurationMillis`** | <code>number</code>                                             | UWB config identifier. /** Slot duration in milliseconds.                  | 8.0.0 |
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
