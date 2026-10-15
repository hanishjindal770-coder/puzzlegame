# Tidepool Blocks

A no-login block puzzle for Android and the web. Drag pieces onto an 8×8 board, fill rows or columns to clear them, chain combos, and come back daily for rewards, missions and new themes. Progress is saved on the device; no account, no ads, works offline.

## Play it

- **Android:** open the [latest release](../../releases/latest) on your phone, download `tidepool-blocks-debug.apk` and open it. Android will ask you to allow installs from your browser the first time.
- **Web:** once GitHub Pages is on (see below), the game is at `https://<your-user>.github.io/puzzlegame/` and can be added to the home screen.

## How the project is laid out

| Path | What it is |
|---|---|
| `src/game.html` | The whole game: HTML, CSS and JavaScript in one file. Edit this. |
| `scripts/build.mjs` | Builds `www/index.html` from `src/game.html` with the bundled fonts. |
| `www/` | The web build that ships inside the app and on GitHub Pages. |
| `android/` | The Capacitor Android project (open it in Android Studio). |
| `assets/` | Source images for the app icon and splash screen. |
| `RESEARCH.md` | Why casual games like this keep people playing, and how the game uses each hook. |

## Building

Every push to `main` builds the Android app on GitHub Actions. The APK is attached to the run under **Artifacts**. Pushing a tag such as `v1.0.1` also publishes a GitHub Release with the APK.

To build on your own computer you need Node.js 22+ and Android Studio:

```sh
npm install
npm run sync      # builds www/ and copies it into android/
npm run open      # opens Android Studio; press Run to install on a connected phone
```

After changing `src/game.html`, run `npm run sync` again.

To regenerate icons and the splash screen after changing the images in `assets/`:

```sh
npx @capacitor/assets@3.0.5 generate --android --iconBackgroundColor '#0A1F2E' --splashBackgroundColor '#0A1F2E'
```

## Turning on the web version

In the repository go to **Settings → Pages**, set **Source** to **GitHub Actions**, then re-run the "Web version (GitHub Pages)" workflow from the **Actions** tab.

## Publishing on Google Play

1. Create an upload key once (keep the file and passwords safe; you need them for every update):
   ```sh
   keytool -genkeypair -v -keystore release.jks -alias tidepool -keyalg RSA -keysize 2048 -validity 10000
   ```
2. Add these repository secrets under **Settings → Secrets and variables → Actions**:
   - `ANDROID_KEYSTORE_BASE64`: output of `base64 -w0 release.jks`
   - `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS` (`tidepool`), `ANDROID_KEY_PASSWORD`
3. Push a tag (`git tag v1.0.1 && git push origin v1.0.1`). The release will now also contain a signed `tidepool-blocks.aab`.
4. In [Google Play Console](https://play.google.com/console) ($25 one-time), create the app and upload the `.aab`. Add the icon (`www/icon-512.png`), phone screenshots, a short description and a privacy policy. The game collects no data, so a one-line policy is enough.
5. New personal developer accounts must run a closed test with at least 12 testers for 14 days before the app can go to production.
