# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Arqueología Flickeriana is an art project (exhibited at Encuentro de Imagen MMXXI) that lets visitors pick a date and a Mexican state/region and browse Flickr photos taken that day in that place. All user-facing text is in Spanish — keep it that way. Deployed on Vercel at arqueologia-flickeriana.vercel.app.

## Commands

Vite + React 19, managed with npm (single `package-lock.json`).

- `npm run dev` (or `start`) — dev server
- `npm run build` — production build into `build/` (kept as the output dir so the existing Vercel config keeps working)
- `npm run preview` — serve the production build locally
- `npm test` — Vitest, single run; `npm run test:watch` for watch mode
- `npx vitest run src/App.test.jsx -t "name"` — run a single test
- `npm run format` — Prettier (v3, default config)

## Architecture

The entire application lives in [src/App.jsx](src/App.jsx) — one function component, no routing, no state library. Entry point is [src/main.jsx](src/main.jsx), which also unregisters the service worker that old CRA-era deploys installed in visitors' browsers (do not reintroduce a service worker without handling this).

- **Flickr API**: a `useEffect` keyed on `fecha` and `zona` calls `flickr.photos.search`. The API key is read from `VITE_FLICKR_API_KEY`, with the legacy name `REACT_APP_API_KEY` still accepted (see `envPrefix` in [vite.config.js](vite.config.js)) because that's the variable name configured in Vercel. Locally it lives in `.env` (untracked; see `.env.example`). Photo image URLs are built as `https://live.staticflickr.com/{server}/{id}_{secret}.jpg`.
- **URL sharing**: the selected date and territory are mirrored into query params (`?fecha=YYYY-MM-DD&territorio=<label>`) via `history.replaceState`, and read back on mount, so any app URL is shareable. `territorio` is matched against option labels case-insensitively; invalid params fall back to defaults (Querétaro, no date filter).
- **Dates**: no `min/max_taken_date` filter is sent until a date is chosen (the landing page shows recent photos). A chosen date becomes a Unix-timestamp range covering that local day (start + 86399s). Calendar range is Feb 2004 (Flickr's launch) to today.
- **Regions**: `opcionesZonas` at the top of App.jsx maps display labels to comma-separated Flickr tag lists; `URLSearchParams` handles all encoding, so values are stored as plain text.
- **Tests**: Vitest + jsdom + Testing Library, config in the `test` key of [vite.config.js](vite.config.js) (`globals: true`). Tests stub `fetch` and drive the real Calendar/Select components; [src/App.test.jsx](src/App.test.jsx) covers the URL-sharing round trip.
