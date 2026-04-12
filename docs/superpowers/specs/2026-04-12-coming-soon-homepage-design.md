# Coming Soon Homepage + Route Split

## Overview

Split the single-page Teeforce landing site into two pages:
- **`/` (homepage)** — a condensed coming-soon page with the stock photo hero, early access email form, and a brief product pitch
- **`/#/preview`** — the full landing page (current site content) with real screenshots and the stock photo hero background

No new dependencies. Hash-based routing only.

## Routing

Use `window.location.hash` in `App.tsx` to decide which component tree to render:

| Hash | Component | Description |
|------|-----------|-------------|
| (empty) or `#/` | `<ComingSoonPage />` | New homepage |
| `#/preview` | `<FullLandingPage />` | Current full landing page |

Implementation: a `useHash()` pattern — `useState` seeded from `window.location.hash`, updated via a `hashchange` event listener. No routing library.

## Coming Soon Homepage (`/`)

### Hero
- Full-bleed Unsplash stock photo (`photo-1592919505780-303950717480`), same dark gradient overlay as the original v1 page (`from-forest-abyss/85 via-forest-abyss/35 to-forest-abyss` + left-to-right `from-forest-abyss/70 via-transparent to-transparent`)
- **Tag:** "Now in Early Access"
- **Headline:** "The course management platform you've been waiting for."
- **Subhead:** Same as current — Teeforce pitch + "The walkup waitlist is live now — try it today."
- **CTA:** "Get Early Access" email form (inline on hero, same Web3Forms wiring as current Waitlist component)
- **Secondary link:** "See what we're building ↓" scrolls to condensed pitch section below

### Below the fold — condensed pitch
- **Problem cards:** Same three cards as current (walkups turned away, no-shows leave empty slots, staff playing waitlist coordinator). Same light-bg (`forest-pale`) section with `grain` texture.
- **Compact feature grid:** All four features (Walkup Waitlist, Modern Tee Sheet, Square Integration, Course Analytics) as a simple grid. Title + one-liner + AVAILABLE NOW / COMING SOON badge each. No stats panel, no full-width hero card treatment.
- **Footer:** Same as current (`© 2026 · A Benjamin Golf Co. product`, `info@teeforce.golf`, `benjamingolfco.com`)

### Not included on coming-soon page
- How It Works steps
- Animated tee sheet demo (VisualDemo)
- Full-width hero feature card with sourced stats
- Screenshots

### Nav
- Logo: teeforce wordmark
- No section links (not enough sections to warrant them)
- CTA button: "Get Early Access" → scrolls to hero email form (or anchor on the form)

## Full Landing Page (`/#/preview`)

### Changes from current
1. **Hero background:** Stock photo (full-bleed) replaces the plain CSS gradients. The split layout stays — text left, dashboard screenshot right — but now layered over the atmospheric photo with dark gradient overlay.
2. **Dashboard screenshot:** Replace `HeroDashboardPlaceholder` component with real screenshot (`dashboard.jpeg`) wrapped in a browser frame (rounded corners, border, shadow).
3. **How It Works step 1** ("Golfer scans a QR code"): Add `qr-sign.jpeg` as an inline image beside the step text.
4. **How It Works step 3** ("Next golfer gets a text"): Add `join-form.jpeg` as an inline image styled at phone-screen proportions.

### Everything else stays as-is
- Problem section, Features section (with sourced stats + badges), VisualDemo (animated tee sheet), Waitlist CTA, Footer — all unchanged.

### Nav
- Same as current: Features | How It Works | Try It Now CTA

## Screenshots

Move from repo root to `public/screenshots/` with clean names:

| Current filename | New path | Usage |
|-----------------|----------|-------|
| `Screenshot_12-4-2026_13263_...jpeg` | `public/screenshots/dashboard.jpeg` | `/preview` hero visual |
| `Screenshot_12-4-2026_132658_...jpeg` | `public/screenshots/qr-sign.jpeg` | `/preview` How It Works step 1 |
| `Screenshot_12-4-2026_132830_...jpeg` | `public/screenshots/join-form.jpeg` | `/preview` How It Works step 3 |

Referenced in code as `/screenshots/dashboard.jpeg` etc. (Vite serves `public/` at root).

## Stock Photo

Unsplash URL restored as a module-level constant:
```
const HERO_IMG = 'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=2400&q=85'
```

Used by both pages:
- **Coming-soon:** Full-bleed background with text overlay
- **`/preview`:** Full-bleed background behind the split hero layout, dashboard screenshot floats on top

## Shared Components

Both pages reuse: `TeeforceWordmark`, `Footer`. The `Waitlist` form logic (Web3Forms submission, honeypot, state management) is shared — on coming-soon it's embedded in the hero, on `/preview` it's a standalone section.

## File Changes

All changes in `src/App.tsx` (single-file SPA pattern continues). No new files except moving screenshots.

## Deployment

No changes to GitHub Actions workflow or GitHub Pages config. Hash routing works natively with static file serving — all routes serve `index.html`.
