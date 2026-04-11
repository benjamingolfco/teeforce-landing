# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

Marketing landing page for **Teeforce**, a tee sheet / course management platform for golf courses (a Benjamin Golf Co product). Pitches automatic waitlist filling, Square POS integration, grill & bar management, and inventory tracking.

## Stack

React 19 + Vite 8 + TypeScript + Tailwind v4 + `motion` (Framer Motion) + `lenis` (smooth scroll). Package manager is **pnpm** (lockfile v9). Single-page app, single route, no router.

- `src/main.tsx` — entrypoint, mounts `<App />`
- `src/App.tsx` — the entire landing page as a handful of section components (`Nav`, `Hero`, `AutoFillScene`, `Problem`, `Features`, `HowItWorks`, `Waitlist`, `Footer`) plus a reusable `TeeforceWordmark` component
- `src/index.css` — Tailwind v4 config + base styles. **Design tokens live in the `@theme` block here** (colors, font families, custom utilities). Edit tokens here rather than hardcoding hex values elsewhere.
- `index.html` — Vite HTML entry with Google Fonts link (Fraunces, Inter, Instrument Sans, JetBrains Mono)
- `public/CNAME` — `teeforce.golf` custom domain, copied into `dist/` on build

## Tailwind v4 notes (non-obvious)

This project uses Tailwind v4's `@theme` directive, not a `tailwind.config.js`. There is **no** config file. Color tokens declared in `src/index.css` under `@theme` automatically generate Tailwind utilities (`--color-brass` → `bg-brass`, `text-brass`, etc.). Same for `--font-*` tokens.

## Brand palette

See `src/index.css` `@theme` block for the canonical values. Semantic usage:

- **Fern** (token: `brass`) — identity accent. Chapter labels, hairlines, italic display highlights, logo "force" text, filled tee-sheet states, hover borders. The "atmospheric thread" throughout.
- **Tangerine** (token: `ember`) — **action only.** Reserved for primary CTAs, the logo accent bar under the wordmark, and alert/cancelled states. Don't sprinkle it elsewhere.
- **Evergreen** (token: `fairway`) — used on light backgrounds (Forest Pale) where Fern has insufficient contrast.
- Token names (`brass`, `ember`) are legacy from the previous cinematic-clubhouse palette; the values now point at the brand-guide Fern/Tangerine. Don't rename them — too many call sites.

## Typography

- **Fraunces** (`font-display`) — editorial display type for headlines, chapter numerals, italic highlights. The voice of the page.
- **Inter** (`font-brand`) — reserved for the Teeforce wordmark lockup (`TeeforceWordmark` component) per the brand guide's "Inter for all Teeforce uses" rule. Don't use it for body copy.
- **Instrument Sans** (`font-sans`) — body copy.
- **JetBrains Mono** (`font-mono`) — uppercase meta labels, tee-sheet UI chrome, footer chrome.

## Deployment

GitHub Pages via **GitHub Actions** (`.github/workflows/deploy.yml`). On push to `main`: pnpm install → `pnpm build` → upload `dist/` → `actions/deploy-pages@v4`. Served at `teeforce.golf` via `public/CNAME`.

The repo's Pages source must be set to **"GitHub Actions"** (not "Deploy from a branch") in repo Settings → Pages. If a push to `main` doesn't publish, that setting is the first thing to check.

## Current state notes

- **Waitlist form is a stub.** `Waitlist` in `src/App.tsx` flips `sent` state on submit but does not POST anywhere. Making it work requires picking a backend (Formspree, a serverless endpoint, etc.) — Netlify Forms won't work on GH Pages. Confirm the approach with the user before wiring one up.
- **Pre-launch.** Copy stays aspirational — no claims about existing customers, real metrics, or shipped features.
- **Two-brand architecture.** Teeforce leads; "A Benjamin Golf Co. product" appears as a subtle sub-tagline in the footer. Don't mash the two brands into a single lockup.

## Workflow

- `pnpm dev` — Vite dev server (defaults to http://127.0.0.1:5173, falls through to 5174+ if taken)
- `pnpm build` — type-check (`tsc -b`) + Vite production build into `dist/`
- `pnpm preview` — preview built output on :4173

No tests, no lint. `pnpm build` is the only correctness gate. For visual changes, run `pnpm dev` and check in a browser — verify responsive behavior at the `lg:` breakpoint (1024px), which is where the tee-sheet grid collapses. `motion` scroll animations require scrolling through the page to trigger.
