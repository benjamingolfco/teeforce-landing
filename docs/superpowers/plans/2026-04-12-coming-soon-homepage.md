# Coming Soon Homepage + Route Split — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the Teeforce landing site into a condensed coming-soon homepage at `/` and the full landing page at `/#/preview`, restore the stock photo hero, and integrate real product screenshots.

**Architecture:** Hash-based routing via `window.location.hash` in `App.tsx`. No router library. Two top-level page components (`ComingSoonPage`, `FullLandingPage`) share `TeeforceWordmark`, `Footer`, and form submission logic. All changes in `src/App.tsx` plus moving screenshots into `public/screenshots/`.

**Tech Stack:** React 19, Vite 8, TypeScript, Tailwind v4, motion (Framer Motion), Lenis

**Correctness gate:** `pnpm build` (tsc + vite build). No test suite. Visual verification via `pnpm dev` + Playwright screenshots at 1440px, 1024px, 430px.

---

### Task 1: Move screenshots to `public/screenshots/`

**Files:**
- Move: `Screenshot_12-4-2026_13263_*.jpeg` → `public/screenshots/dashboard.jpeg`
- Move: `Screenshot_12-4-2026_132658_*.jpeg` → `public/screenshots/qr-sign.jpeg`
- Move: `Screenshot_12-4-2026_132830_*.jpeg` → `public/screenshots/join-form.jpeg`

- [ ] **Step 1: Create directory and move files**

```bash
mkdir -p public/screenshots
mv "Screenshot_12-4-2026_13263_purple-field-0a3932a0f.4.azurestaticapps.net.jpeg" public/screenshots/dashboard.jpeg
mv "Screenshot_12-4-2026_132658_purple-field-0a3932a0f.4.azurestaticapps.net.jpeg" public/screenshots/qr-sign.jpeg
mv "Screenshot_12-4-2026_132830_purple-field-0a3932a0f.4.azurestaticapps.net.jpeg" public/screenshots/join-form.jpeg
```

- [ ] **Step 2: Verify files are in place**

```bash
ls -la public/screenshots/
```

Expected: `dashboard.jpeg`, `qr-sign.jpeg`, `join-form.jpeg`

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Move screenshots to public/screenshots/ with clean names"
```

---

### Task 2: Add hash-based routing to App

**Files:**
- Modify: `src/App.tsx:1-32` (imports, App component)

- [ ] **Step 1: Add useHash hook and update App component**

Add the `HERO_IMG` constant and a `useHash` function above `App`. Refactor `App` to route between two page components based on hash.

In `src/App.tsx`, replace the current `App` function (lines 5–32) with:

```tsx
const HERO_IMG =
  'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=2400&q=85'

function useHash() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return hash
}

export function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  const hash = useHash()
  const isPreview = hash === '#/preview'

  return (
    <main className="min-h-screen bg-forest-abyss text-bone font-sans antialiased">
      {isPreview ? <FullLandingPage /> : <ComingSoonPage />}
    </main>
  )
}
```

- [ ] **Step 2: Add FullLandingPage wrapper**

Add a `FullLandingPage` component that wraps the current section composition. Place it right after the `App` function:

```tsx
function FullLandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <VisualDemo />
      <Features />
      <Waitlist />
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Add empty ComingSoonPage placeholder**

Add a temporary placeholder (will be filled in Task 4):

```tsx
function ComingSoonPage() {
  return (
    <>
      <Nav />
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-bone/50">Coming soon page — under construction</p>
      </div>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```

Expected: successful build, no type errors.

- [ ] **Step 5: Verify routing works**

Start dev server, navigate to `http://127.0.0.1:5175` (should show placeholder) and `http://127.0.0.1:5175/#/preview` (should show full landing page). Use Playwright:

```
browser_navigate → http://127.0.0.1:5175
browser_snapshot → verify "Coming soon page" text visible
browser_navigate → http://127.0.0.1:5175/#/preview
browser_snapshot → verify "Never lose a tee time" heading visible
```

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx
git commit -m "Add hash-based routing: / = coming soon, /#/preview = full landing"
```

---

### Task 3: Update /preview Hero with stock photo + dashboard screenshot

**Files:**
- Modify: `src/App.tsx` — `Hero` component and remove `HeroDashboardPlaceholder`

- [ ] **Step 1: Rewrite Hero to use stock photo background + real screenshot**

Replace the current `Hero` function (the one with CSS-only gradients and `HeroDashboardPlaceholder`) with:

```tsx
function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden grain">
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="A golfer mid-swing on a dramatic coastal course"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-abyss/85 via-forest-abyss/35 to-forest-abyss" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-abyss/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-16 bg-brass/60" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-brass/90 font-mono">
                Now in Early Access
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.92] tracking-tight text-balance"
              style={{ fontVariationSettings: '"opsz" 144, "wght" 400, "SOFT" 100, "WONK" 1' }}
            >
              Never lose a tee time
              <br />
              to a{' '}
              <span className="italic font-light text-brass-bright">no-show</span>{' '}
              again.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-8 max-w-xl text-lg text-bone/70 leading-relaxed text-pretty"
            >
              Teeforce is the modern course management platform with automatic waitlist filling, Square integration, and everything you need to run your course.{' '}
              <span className="text-bone">The walkup waitlist is live now — try it today.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="mt-10 flex flex-wrap items-center gap-8"
            >
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-3 bg-ember text-forest-abyss px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium hover:bg-ember-bright transition-colors"
              >
                Try the Walkup Waitlist
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#features"
                className="text-sm text-bone/60 underline underline-offset-[6px] decoration-bone/30 hover:text-bone transition"
              >
                See what we're building ↓
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-sm border border-bone/15 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
              <img
                src="/screenshots/dashboard.jpeg"
                alt="Teeforce operator dashboard showing walkup waitlist with openings and queue"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Delete the HeroDashboardPlaceholder component**

Remove the entire `HeroDashboardPlaceholder` function and its TODO comment block (the component that renders the mock openings/queue grid). It's no longer referenced.

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

Expected: successful build, no type errors, no unused references.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "Restore stock photo hero on /preview, replace mock with real dashboard screenshot"
```

---

### Task 4: Add screenshots to How It Works on /preview

**Files:**
- Modify: `src/App.tsx` — `HowItWorks` component

- [ ] **Step 1: Rewrite HowItWorks to include screenshot images**

Replace the current `HowItWorks` function with a version that shows images alongside steps 1 and 3. The grid changes from 3 equal columns to a layout where step 1 and step 3 have accompanying images:

```tsx
function HowItWorks() {
  return (
    <section id="how" className="bg-forest-abyss py-32 px-8 relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px w-12 bg-brass" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-brass/80 font-mono">
            How It Works
          </span>
        </div>
        <h2
          className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] max-w-4xl mb-24 text-balance"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 380, "SOFT" 70, "WONK" 1' }}
        >
          Three steps.{' '}
          <span className="italic text-brass-bright">No app required.</span>
        </h2>

        <div className="space-y-20">
          {/* Step 1 — with QR code screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="font-display text-brass text-2xl"
                  style={{ fontVariationSettings: '"opsz" 32, "wght" 420' }}
                >
                  I
                </div>
                <div className="flex-1 h-px bg-bone/15" />
              </div>
              <h3
                className="font-display text-3xl mb-4 text-bone"
                style={{ fontVariationSettings: '"opsz" 48, "wght" 450, "SOFT" 60, "WONK" 1' }}
              >
                Golfer scans a QR code
              </h3>
              <p className="text-bone/55 leading-relaxed">
                A QR code at the pro shop or clubhouse. Golfers scan it with their phone, enter name, party size, and number. Done — they're on the list.
              </p>
            </div>
            <div className="rounded-sm border border-bone/10 shadow-lg overflow-hidden max-w-xs mx-auto md:mx-0">
              <img
                src="/screenshots/qr-sign.jpeg"
                alt="QR code sign — scan to join the walkup waitlist"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Step 2 — text only */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="font-display text-brass text-2xl"
                style={{ fontVariationSettings: '"opsz" 32, "wght" 420' }}
              >
                II
              </div>
              <div className="flex-1 h-px bg-bone/15" />
            </div>
            <h3
              className="font-display text-3xl mb-4 text-bone"
              style={{ fontVariationSettings: '"opsz" 48, "wght" 450, "SOFT" 60, "WONK" 1' }}
            >
              Operator posts an opening
            </h3>
            <p className="text-bone/55 leading-relaxed">
              When a tee time opens up — cancellation, no-show, or a gap in the sheet — the operator posts it in Teeforce. One tap.
            </p>
          </motion.div>

          {/* Step 3 — with golfer join form screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="font-display text-brass text-2xl"
                  style={{ fontVariationSettings: '"opsz" 32, "wght" 420' }}
                >
                  III
                </div>
                <div className="flex-1 h-px bg-bone/15" />
              </div>
              <h3
                className="font-display text-3xl mb-4 text-bone"
                style={{ fontVariationSettings: '"opsz" 48, "wght" 450, "SOFT" 60, "WONK" 1' }}
              >
                Next golfer gets a text
              </h3>
              <p className="text-bone/55 leading-relaxed">
                The next person on the waitlist gets an automatic text. They tap to claim the slot. If they don't respond, it rolls to the next person.
              </p>
            </div>
            <div className="rounded-sm border border-bone/10 shadow-lg overflow-hidden max-w-[220px] mx-auto md:mx-0">
              <img
                src="/screenshots/join-form.jpeg"
                alt="Golfer join form — name, phone, party size"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "Add QR and join-form screenshots to How It Works steps"
```

---

### Task 5: Build the ComingSoonPage

**Files:**
- Modify: `src/App.tsx` — replace `ComingSoonPage` placeholder, add `ComingSoonNav`, `ComingSoonHero`, `CompactFeatures`

- [ ] **Step 1: Replace ComingSoonPage placeholder with full implementation**

Replace the placeholder `ComingSoonPage` function with:

```tsx
function ComingSoonPage() {
  return (
    <>
      <ComingSoonNav />
      <ComingSoonHero />
      <Problem />
      <CompactFeatures />
      <Footer />
    </>
  )
}
```

Note: `Problem` and `Footer` are reused from the existing components. `ComingSoonNav`, `ComingSoonHero`, and `CompactFeatures` are new.

- [ ] **Step 2: Add ComingSoonNav**

```tsx
function ComingSoonNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-forest-abyss/80 backdrop-blur-xl border-b border-bone/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-8 h-20">
        <a href="#" className="flex items-center">
          <TeeforceWordmark size="nav" />
        </a>
        <a
          href="#early-access"
          className="group relative overflow-hidden border border-ember/60 px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-ember hover:text-forest-abyss transition-colors duration-500"
        >
          <span className="relative z-10">Get Early Access</span>
          <span className="absolute inset-0 bg-ember -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </a>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Add ComingSoonHero**

```tsx
function ComingSoonHero() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting || sent) return
    setSubmitting(true)
    setError(null)
    const form = e.currentTarget
    const botcheck = (form.elements.namedItem('botcheck') as HTMLInputElement)?.value
    if (botcheck) {
      setSent(true)
      setSubmitting(false)
      return
    }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'e2d2ba36-289c-4621-b0fa-fce83ad38239',
          subject: 'New Teeforce early access signup',
          from_name: 'Teeforce Early Access',
          email,
          replyto: email,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="early-access" className="relative min-h-screen w-full overflow-hidden grain">
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="A golfer mid-swing on a dramatic coastal course"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-abyss/85 via-forest-abyss/35 to-forest-abyss" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-abyss/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center pt-32 pb-16 px-8 max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-16 bg-brass/60" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-brass/90 font-mono">
              Now in Early Access
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 font-display text-[clamp(3rem,10vw,9rem)] leading-[0.88] tracking-tight text-balance"
            style={{ fontVariationSettings: '"opsz" 144, "wght" 400, "SOFT" 100, "WONK" 1' }}
          >
            The course management platform{' '}
            <span className="italic font-light text-brass-bright">
              you've been waiting for.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 max-w-xl text-lg text-bone/70 leading-relaxed text-pretty"
          >
            Teeforce is the modern course management platform with automatic waitlist filling, Square integration, and everything you need to run your course.{' '}
            <span className="text-bone">The walkup waitlist is live now — try it today.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10"
          >
            <form
              onSubmit={onSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-lg"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@course.com"
                disabled={sent || submitting}
                className="flex-1 bg-bone/5 border border-bone/20 px-5 py-4 text-bone placeholder:text-bone/30 focus:outline-none focus:border-brass focus:bg-bone/10 font-mono text-sm transition-colors"
              />
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <button
                type="submit"
                disabled={sent || submitting}
                className="bg-ember text-forest-abyss px-8 py-4 text-xs uppercase tracking-[0.18em] hover:bg-ember-bright transition-colors disabled:opacity-70"
              >
                {sent ? "You're on the list" : submitting ? 'Sending…' : 'Get Early Access'}
              </button>
            </form>
            {error && (
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ember font-mono">
                {error}
              </p>
            )}
            <p className="mt-4 text-[11px] text-bone/45 font-mono leading-relaxed">
              No spam, no commitment. We'll get you set up and keep you in the loop as we build.
            </p>
          </motion.div>

          <motion.a
            href="#pitch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-12 inline-block text-sm text-bone/60 underline underline-offset-[6px] decoration-bone/30 hover:text-bone transition"
          >
            See what we're building ↓
          </motion.a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Add CompactFeatures**

```tsx
function CompactFeatures() {
  const features = [
    {
      title: 'Walkup waitlist & auto-notify',
      body: 'Golfers scan a QR code, staff posts openings, next in line gets a text. No clipboard required.',
      badge: 'Available now',
      available: true,
    },
    {
      title: 'Modern tee sheet',
      body: 'Drag-and-drop scheduling, instant search, clean interface your staff can learn in minutes.',
      badge: 'Coming soon',
      available: false,
    },
    {
      title: 'Square integration',
      body: 'Keep your Square POS for payments, tabs, and inventory. Teeforce syncs seamlessly.',
      badge: 'Coming soon',
      available: false,
    },
    {
      title: 'Course analytics',
      body: 'Demand patterns, no-show trends, and revenue insights in one dashboard.',
      badge: 'Coming soon',
      available: false,
    },
  ]
  return (
    <section id="pitch" className="bg-forest-abyss py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px w-12 bg-brass" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-brass/80 font-mono">
            The Platform
          </span>
        </div>
        <h2
          className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] max-w-5xl mb-20 text-balance"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 380, "SOFT" 70, "WONK" 1' }}
        >
          One platform.{' '}
          <span className="italic text-brass-bright">Everything you need.</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`border p-8 ${
                f.available
                  ? 'border-brass/30 bg-brass/[0.04]'
                  : 'border-bone/10 opacity-70'
              }`}
            >
              <div className="mb-6">
                <span
                  className={`inline-block text-[9px] uppercase tracking-[0.22em] font-mono px-2 py-1 border ${
                    f.available
                      ? 'bg-ember text-forest-abyss border-ember'
                      : 'text-bone/50 border-bone/20'
                  }`}
                >
                  {f.badge}
                </span>
              </div>
              <h3
                className="font-display text-2xl mb-3 text-bone"
                style={{ fontVariationSettings: '"opsz" 32, "wght" 480, "SOFT" 50, "WONK" 1' }}
              >
                {f.title}
              </h3>
              <p className="text-bone/55 text-sm leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Verify build**

```bash
pnpm build
```

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx
git commit -m "Build coming-soon homepage with stock photo hero, inline email form, compact features"
```

---

### Task 6: Visual verification with Playwright

**Files:** None modified — verification only.

- [ ] **Step 1: Start dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Screenshot coming-soon page at 1440px**

```
browser_resize → 1440×900
browser_navigate → http://127.0.0.1:{port}
browser_take_screenshot → screenshots/v2-coming-soon-desktop.png (fullPage)
```

Verify: stock photo hero, "The course management platform you've been waiting for" headline, email form, problem cards, compact feature grid, footer.

- [ ] **Step 3: Screenshot coming-soon page at 430px (mobile)**

```
browser_resize → 430×932
browser_take_screenshot → screenshots/v2-coming-soon-mobile.png (fullPage)
```

Verify: everything stacks, no overflow, form input + button stack vertically.

- [ ] **Step 4: Screenshot /preview at 1440px**

```
browser_resize → 1440×900
browser_navigate → http://127.0.0.1:{port}/#/preview
browser_take_screenshot → screenshots/v2-preview-desktop.png (fullPage)
```

Verify: stock photo hero background, real dashboard screenshot on right, QR code in How It Works step 1, join form in step 3.

- [ ] **Step 5: Screenshot /preview at 1024px (lg breakpoint)**

```
browser_resize → 1024×768
browser_take_screenshot → screenshots/v2-preview-lg.png (fullPage)
```

Verify: grid collapses cleanly at the lg breakpoint.

- [ ] **Step 6: Screenshot /preview at 430px (mobile)**

```
browser_resize → 430×932
browser_take_screenshot → screenshots/v2-preview-mobile.png (fullPage)
```

Verify: all stacks, screenshots scale down, no overflow.

---

### Task 7: Final build + push

**Files:** None modified.

- [ ] **Step 1: Final build check**

```bash
pnpm build
```

Expected: clean build, no errors.

- [ ] **Step 2: Push to main**

```bash
git push origin main
```

GitHub Actions deploys to teeforce.golf.
