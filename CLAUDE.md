# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

Marketing landing page for **Teeforce**, a tee sheet / course management platform for golf courses (a Benjamin Golf Co product). Pitches automatic waitlist filling, Square POS integration, grill & bar management, and inventory tracking.

## Architecture

**Single-file static site.** Everything — markup, CSS, and JavaScript — lives in `index.html`. There is no build system, no package manager, no framework, no tests, and no dependencies beyond Google Fonts (Inter + DM Serif Display) loaded via `<link>`.

**Deployment:** GitHub Pages from the `main` branch, served at `teeforce.golf` via the `CNAME` file. Any push to `main` publishes.

**Constraints this creates:**
- Keep CSS and JS inline in `index.html`. Don't split into separate files or introduce a bundler — the whole point is zero-build GitHub Pages hosting. If tooling is ever added, it should be an explicit decision, not drive-by.
- No external JS libraries. The existing script is ~20 lines of vanilla JS for smooth-scroll anchors and the waitlist form handler.
- Design tokens (colors, etc.) live in CSS custom properties under `:root` in the `<style>` block — edit those rather than hardcoding hex values elsewhere.

## Current state notes

- The waitlist form (`handleSubmit` in `index.html`) is a **stub**: it shows a success message and `console.log`s the email, but does not POST anywhere. Any "make the form work" task requires picking and wiring up a backend (Formspree, Netlify Forms won't work on GH Pages, a serverless endpoint, etc.) — confirm the approach with the user before implementing.
- Page is marked "Coming Soon" — product is pre-launch, so copy should stay aspirational rather than claiming existing customers or metrics.

## Workflow

There are no build, lint, or test commands. To preview changes, open `index.html` directly in a browser or serve the directory with any static server (e.g. `python3 -m http.server`). Verify responsive behavior at the 768px breakpoint — the hero collapses to a single column and the mock tee sheet visual is hidden on mobile.
