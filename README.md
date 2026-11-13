# Shadowrocket All-in-One Configuration

Modular configuration profile for Shadowrocket providing ad-blocking, media feature enhancements, and subscription overrides.

## Configuration URL

Import this remote configuration URL directly into Shadowrocket:

```text
https://raw.githubusercontent.com/hpahm/config-shadow/main/aio.conf
```

## Features and Modules

- YouTube: Removes video ads, promotional banners, and configures background audio and subtitle language.
- Spotify: Audio customization request modifications and protobuf product state adjustments.
- RevenueCat (Locket & Multi-App): Overrides entitlements and subscription status for RevenueCat integrations.
- TikTok: Unlocks region restrictions (JP), blocks in-feed ads, and strips watermarks from video downloads.
- SoundCloud: Unlocks Go+ playback tier and disables audio advertisements.
- CapCut: Enables Pro/VIP feature flags.
- Xingtu: Enables VIP status and export capabilities.
- CamScanner: Grants SVIP feature access and unlocks export tools.
- Meitu & Wink: Unlocks SVIP rights and removes interface advertisement banners.
- PicsArt: Unlocks Gold subscription tier and tool access.
- SNOW & EPIK: Grants active yearly subscription status.
- iTunes: Intercepts and validates receipt verification requests.
- Sub-Store: Built-in Sub-Store core and cron sync scripts.

## Installation Instructions

1. Open Shadowrocket on iOS.
2. Navigate to Config > Add Configuration.
3. Paste the Configuration URL and tap Download.
4. Select the downloaded `aio.conf` profile and choose Use Config.

## HTTPS Decryption (MITM) Setup

Scripts and header rewrites require HTTPS decryption to function:

1. In Shadowrocket, go to Config and tap the info icon next to `aio.conf`.
2. Tap HTTPS Decryption and toggle Enable HTTPS Decryption on.
3. Tap Generate a New CA.
4. Install the CA certificate into your iOS profile.
5. In iOS Settings, go to General > VPN & Device Management and install the certificate profile.
6. In iOS Settings, go to General > About > Certificate Trust Settings and enable Full Trust for the installed root certificate.

## Repository Structure

- `aio.conf`: Main Shadowrocket configuration profile.
- `js/`: Modular JavaScript scripts executed by Shadowrocket rules.
- `sync.ps1`: Automation script to regenerate `aio.conf` with GitHub raw endpoints and embedded certificate data.

## Updating the Configuration

To update scripts or regenerate configuration URLs locally, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\sync.ps1
```

