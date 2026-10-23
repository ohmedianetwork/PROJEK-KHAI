# Oh! Media Tools (app)

The Oh! Media internal tools from [ohmedia.my/tools](https://www.ohmedia.my/tools), packaged as an installable app (a PWA).
It installs on a phone, tablet or computer, opens in its own window without the browser bar, and keeps working offline.

| Tool | File | Output |
| --- | --- | --- |
| Instagram Maker | `instagram.html` | 1080 × 1350 post and collage slides |
| IG Reels & TikTok Video | `reels.html` | 1080 × 1920 video |
| Carousel Maker | `carousel.html` | 1080 × 1350 carousel slides |
| Featured Maker | `featured.html` | 1200 × 675 website featured image |

Everything runs in the browser. Photos and videos never leave the device.

## Files

- `index.html`: home screen listing the tools, with the **Install app** button
- `instagram.html`, `reels.html`, `carousel.html`, `featured.html`: the tools
- `manifest.webmanifest`: app name, icon, colours and home-screen shortcuts
- `sw.js`: service worker, which keeps the app working offline
- `app.js`: registers the service worker and runs the install button
- `icons/`: app icons
- `.github/workflows/deploy.yml`: publishes the app to GitHub Pages on every push to `main`

## Publish it

1. Merge this branch into `main`.
2. On GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The workflow publishes the app. Its address appears under **Settings → Pages**.

GitHub Pages on a private repository needs a paid GitHub plan. Without one, the same files work on any static host, such as Cloudflare Pages or Netlify, or in a `/app` folder on ohmedia.my.

## Install it

- **iPhone / iPad**: open the app address in Safari → Share → **Add to Home Screen**.
- **Android**: open it in Chrome → tap **Install app** (or the menu → **Install app**).
- **Mac / Windows**: open it in Chrome or Edge → click **Install app**, or the install icon in the address bar.

## Updating a tool

1. Replace the tool's `.html` file. Keep the `<link rel="manifest">` lines in `<head>` and `<script src="app.js">` before `</body>`, and use relative links (`./`, `instagram.html`), not `/tools/...`.
2. In `sw.js`, raise `VERSION` (for example `om-tools-v1` → `om-tools-v2`), so installed apps download the new version.
3. To add a new tool, also add it to `SHELL` in `sw.js`, to the cards in `index.html`, to `shortcuts` in `manifest.webmanifest`, and to the `cp` line in the deploy workflow.
