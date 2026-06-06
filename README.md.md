
# Lushi — Convert to App (PWA + optional native packaging)

This bundle converts your original index.html into a Progressive Web App (PWA). Included files:
- index-pwa.html — the PWA-ready HTML (includes manifest link + service worker registration).
- manifest.json — web app manifest.
- sw.js — simple service worker to cache the app shell.
- icons/ — you should create these (see below).

Steps to run as PWA locally:
1. Put files on a static web server (GitHub Pages, Netlify, Vercel, or local http server). Example (local):
   - python3 -m http.server 8000
   - open http://localhost:8000/index-pwa.html
2. Make sure `manifest.json`, `sw.js`, and `icons/` are served from the site root or update paths in the HTML/manifest.

Icons:
- Create icons at: `/icons/icon-192.png` and `/icons/icon-512.png`.
- For best results create a maskable icon (512x512) and a 192x192 PNG.

Testing install:
- Open site in Chrome (desktop or Android). When served over HTTPS (or localhost), Chrome will prompt to "Install" the app.
- On iOS, add to home screen via Safari's share menu (Apple ignores manifest but uses apple-touch-icon).

Optional: Wrap as native apps using Capacitor (Android / iOS)
1. Install Capacitor CLI:
   - npm init -y
   - npm install @capacitor/core @capacitor/cli --save
2. Copy your built site files into a `www/` folder (or point Capacitor to your webDir).
3. Initialize Capacitor:
   - npx cap init lushi com.yourdomain.lushi --web-dir=www
4. Add platforms:
   - npx cap add android
   - npx cap add ios
5. Build and sync:
   - npx cap copy
   - npx cap open android
   - For iOS: npx cap open ios
6. In Android Studio / Xcode, build a signed APK / IPA.

Notes and tips:
- For push notifications / background tasks you'll need native plugins (Capacitor/Cordova).
- SpeechRecognition on iOS is limited; web speech API works best in Chrome desktop/Android.
- If you want, I can:
  - produce a full Capacitor project layout,
  - create a more robust service worker (Workbox),
  - generate default icons (simple placeholders),
  - or package an Android APK for you (I can provide exact steps or a CI script).

Which target do you want next — PWA only (I can polish it), Android (APK), or iOS (IPA)?
