# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Arqueología Flickeriana is an art project (exhibited at Encuentro de Imagen MMXXI) that lets visitors pick a date, a country, and a state/territory, then browse Flickr photos taken that day in that place. The UI is in English (translated from the original Spanish in 2026); the project name and the exhibition name stay in Spanish. Deployed on Vercel at arqueologia-flickeriana.vercel.app.

## Commands

Vite + React 19, managed with npm (single `package-lock.json`).

- `npm run dev` (or `start`) — dev server
- `npm run build` — production build into `build/` (kept as the output dir so the existing Vercel config keeps working)
- `npm run preview` — serve the production build locally
- `npm test` — Vitest, single run; `npm run test:watch` for watch mode
- `npx vitest run src/App.test.jsx -t "name"` — run a single test
- `npm run format` — Prettier (v3, default config)

## Architecture

The application is one function component in [src/App.jsx](src/App.jsx) plus a data module, no routing, no state library. Entry point is [src/main.jsx](src/main.jsx), which also unregisters the service worker that old CRA-era deploys installed in visitors' browsers (do not reintroduce a service worker without handling this).

- **Search is deliberately tag-based, not geo-based.** The author explicitly prefers matching how Flickr users tagged their own photos. Testing in July 2026 showed tag search finds 7–22× more photos than bbox geo search, `flickr.places.find` returns empty for every query, and `woe_id` search errors — do not migrate to Flickr geo search.
- **Territory data**: [src/territories.js](src/territories.js) exports `countries` — Mexico (the original hand-curated list, first = default), France, Germany, Japan, UK, US. Each territory maps a label to a comma-separated Flickr tag list following the curation model: territory name + local-language/native-script variants (kanji for Japan, umlauts for Germany) + most-photographed cities. Each country's first territory is its default; the rest are alphabetical.
- **Flickr API**: a `useEffect` keyed on `date` and `territory` calls `flickr.photos.search` (30 per page; a "Load more photos" button appends further pages, with a `searchIdRef` counter discarding stale responses). The API key is read from `VITE_FLICKR_API_KEY`, with the legacy name `REACT_APP_API_KEY` still accepted (see `envPrefix` in [vite.config.js](vite.config.js)) because that's the variable name configured in Vercel. Locally it lives in `.env` (untracked; see `.env.example`). Photo image URLs are built as `https://live.staticflickr.com/{server}/{id}_{secret}.jpg`.
- **Performance constraints** (deliberate, don't "improve" away): timeline images use `loading="lazy"` and a srcset of only the `_m` (240px) and suffixless (500px) Flickr sizes — larger suffixes like `_n`/`_c` don't exist for photos uploaded before March 2012, which is exactly the era this app browses, and would 404. Fonts load from a single `<link>` in [index.html](index.html) (Ledger, Atkinson Hyperlegible 700, Open Sans — nothing else is used). The animated noise layer's darkening is baked into `src/noise-1.png` itself (original grain × brightness 0.3, alpha untouched); don't re-add a CSS `filter` to `.foreground`, and keep its `prefers-reduced-motion` fallback.
- **URL sharing**: selection is mirrored into query params (`?date=YYYY-MM-DD&country=<label>&territory=<label>`) via `history.replaceState` and read back on mount. The pre-translation Spanish params (`fecha`, `territorio`) are still read as fallbacks, then rewritten to the English names. Labels match case-insensitively; invalid params fall back to defaults (Querétaro, Mexico, no date filter).
- **Dates**: no `min/max_taken_date` filter is sent until a date is chosen (the landing page shows recent photos). A chosen date becomes a Unix-timestamp range covering that local day (start + 86399s). Calendar range is Feb 2004 (Flickr's launch) to today.
- **Tests**: Vitest + jsdom + Testing Library, config in the `test` key of [vite.config.js](vite.config.js) (`globals: true`). Tests stub `fetch` and drive the real Calendar/Select components (the two react-select inputs are found by their `aria-label`s, "Country" and "Territory"); [src/App.test.jsx](src/App.test.jsx) covers the URL-sharing round trip including legacy-param URLs.
