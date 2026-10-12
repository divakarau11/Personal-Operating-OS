NORTH STAR — Personal Operating System (PWA)

FILES
- index.html: application
- manifest.json: PWA metadata
- sw.js: offline caching
- icon.svg: app icon

QUICK LOCAL TEST
Open index.html in a modern browser. The app should work for day-to-day use and save data in that browser. Service worker / install support requires HTTPS or localhost.

PUBLISH FREE (GitHub Pages)
1. Sign in or create an account at https://github.com
2. Create a new public repository, e.g. north-star-pwa.
3. Upload index.html, manifest.json, sw.js, icon.svg to the repository root.
4. Open repository Settings → Pages.
5. Under Build and deployment, choose Deploy from a branch; select main and /(root), then Save.
6. Wait for GitHub Pages to publish. Open the provided HTTPS URL.
7. On Android Chrome, open the URL → ⋮ menu → Add to Home screen / Install app.
8. On desktop Chrome/Edge, use the install icon in the address bar or browser menu if available.

DATA / PRIVACY
- App data is stored locally in this browser using localStorage.
- Local browser data does not sync automatically across devices.
- Use Settings & Backup → Export backup (JSON) on one device; transfer that JSON privately; use Restore backup on the other.
- Export backups include reflection text. Store them somewhere private.
- Clearing browser data may erase entries. Export backups regularly.
- Do not store confidential clinical data or employer information in this personal app.
- First version does not use a cloud database or account login.
- The landscape hero image uses an external Unsplash image and may not appear offline; the app itself can still function offline after the first cache.
