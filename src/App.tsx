import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Lenis from 'lenis'

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

function FullLandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />

      <Features />
      <Waitlist />
      <Footer />
    </>
  )
}

function ComingSoonPage() {
  return (
    <>
      <ComingSoonNav />
      <ComingSoonHero />
      <ComingSoonProblem />
      <CompactFeatures />
      <Footer />
    </>
  )
}

function ComingSoonProblem() {
  const items = [
    {
      n: '01',
      title: 'Five disconnected tools',
      body: 'Tee sheet here, POS there, inventory somewhere else. You toggle between platforms instead of running a course.',
    },
    {
      n: '02',
      title: 'Revenue lost to no-shows',
      body: "Cancellations and no-shows leave holes in your schedule. By the time staff notices, it's too late to fill them.",
    },
    {
      n: '03',
      title: 'Software from 2009',
      body: 'Clunky interfaces, slow performance, days of staff training. Your software should work for you — not the other way around.',
    },
  ]
  return (
    <section className="bg-forest-pale text-ink py-32 px-8 relative grain">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px w-12 bg-ink/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-ink/60 font-mono">
            The Problem
          </span>
        </div>
        <h2
          className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] max-w-5xl mb-8 text-balance"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 350, "SOFT" 80, "WONK" 1' }}
        >
          Running a course shouldn't mean running{' '}
          <span className="italic">five systems.</span>
        </h2>
        <p className="max-w-2xl text-lg text-ink/60 leading-relaxed mb-24 text-pretty">
          Most course software was built a decade ago and it shows. You deserve better.
        </p>
        <div className="grid md:grid-cols-3 gap-16">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="relative"
            >
              <div
                className="font-display text-[8rem] leading-none text-ink/[0.08] absolute -top-16 -left-2 select-none"
                style={{ fontVariationSettings: '"opsz" 144, "wght" 400' }}
              >
                {item.n}
              </div>
              <div className="relative pt-12 border-t border-ink/20">
                <h3
                  className="font-display text-2xl mb-4"
                  style={{ fontVariationSettings: '"opsz" 32, "wght" 520' }}
                >
                  {item.title}
                </h3>
                <p className="text-ink/60 leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

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
      <img
        src={HERO_IMG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-abyss/85 via-forest-abyss/35 to-forest-abyss" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-abyss/70 via-transparent to-transparent" />

      <div className="relative z-10 min-h-screen flex items-center pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto w-full max-w-3xl">
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
            The course management platform{' '}
            <span className="italic font-light text-brass-bright">you've been waiting for.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-8 max-w-xl text-lg text-bone/70 leading-relaxed text-pretty"
          >
            A modern tee sheet, Square-integrated POS, and smart course operations — built for the way you actually run your course.
          </motion.p>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-10 flex flex-col sm:flex-row gap-2 max-w-lg"
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
              className="bg-ember text-forest-abyss px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium hover:bg-ember-bright transition-colors disabled:opacity-70"
            >
              {sent ? "You're on the list" : submitting ? 'Sending…' : 'Get Early Access'}
            </button>
          </motion.form>
          {error && (
            <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ember font-mono">
              {error}
            </p>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-6 text-[11px] text-bone/45 font-mono leading-relaxed"
          >
            No spam, no commitment. We'll get you set up and keep you in the loop as we build.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-8"
          >
            <a
              href="#pitch"
              className="text-sm text-bone/60 underline underline-offset-[6px] decoration-bone/30 hover:text-bone transition"
            >
              See what we're building ↓
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CompactFeatures() {
  const features = [
    {
      title: 'Modern tee sheet',
      body: 'A clean, fast tee sheet built for how courses actually operate. Drag, drop, done.',
    },
    {
      title: 'Square integration',
      body: 'POS, payments, and inventory connected to your tee sheet. One system, no double-entry.',
    },
    {
      title: 'Cancellation filling',
      body: 'When a slot opens up, the next person on the waitlist gets a text automatically. No-shows become revenue.',
    },
    {
      title: 'Course analytics',
      body: 'Utilization, revenue, no-show rates — the numbers you need to run a tighter operation.',
    },
  ]

  return (
    <section id="pitch" className="bg-forest-abyss py-32 px-8 relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px w-12 bg-brass" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-brass/80 font-mono">
            The Platform
          </span>
        </div>
        <h2
          className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] max-w-5xl mb-24 text-balance"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 350, "SOFT" 80, "WONK" 1' }}
        >
          One platform.{' '}
          <span className="italic text-brass-bright">Everything you need.</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="border border-bone/10 p-6 hover:border-brass/30 transition-colors"
            >
              <h3
                className="font-display text-xl mb-3 text-bone"
                style={{ fontVariationSettings: '"opsz" 32, "wght" 480' }}
              >
                {feat.title}
              </h3>
              <p className="text-bone/55 text-sm leading-relaxed">{feat.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeeforceWordmark({ size = 'nav' }: { size?: 'nav' | 'footer' }) {
  const textClass = size === 'nav' ? 'text-2xl' : 'text-base'
  const barHeight = size === 'nav' ? 'h-[2px]' : 'h-px'
  const barOffset = size === 'nav' ? 'mt-[5px]' : 'mt-[3px]'
  return (
    <span className="inline-flex flex-col items-start leading-none">
      <span
        className={`font-brand font-extrabold lowercase tracking-[-0.04em] ${textClass}`}
      >
        <span className="text-bone">tee</span>
        <span className="text-brass">force</span>
      </span>
      <span className={`${barOffset} ${barHeight} w-full bg-ember`} />
    </span>
  )
}

function Nav() {
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
        <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.22em] text-bone/60">
          <a href="#features" className="hover:text-brass transition">
            Features
          </a>
          <a href="#how" className="hover:text-brass transition">
            How It Works
          </a>
        </nav>
        <a
          href="#waitlist"
          className="group relative overflow-hidden border border-ember/60 px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-ember hover:text-forest-abyss transition-colors duration-500"
        >
          <span className="relative z-10">Try It Now</span>
          <span className="absolute inset-0 bg-ember -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden grain">
      <img
        src={HERO_IMG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-abyss/85 via-forest-abyss/35 to-forest-abyss" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-abyss/70 via-transparent to-transparent" />

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
              No-shows don't have to mean{' '}
              <span className="italic font-light text-brass-bright">lost revenue.</span>
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
            <div className="relative border border-bone/15 rounded-sm shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
              <img
                src="/screenshots/dashboard.jpeg"
                alt="Teeforce walkup waitlist dashboard"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Problem() {
  const items = [
    {
      n: '01',
      title: 'No-shows happen',
      body: "9–18% of tee times go unfilled from cancellations and no-shows. That's revenue disappearing from your sheet every single day.",
    },
    {
      n: '02',
      title: 'Golfers are right there',
      body: "There are people on the range, on the putting green, in the clubhouse — they'd play if they knew a slot just opened. But they don't.",
    },
    {
      n: '03',
      title: 'Nobody connects them',
      body: "The open slot and the available golfer are 50 yards apart, but there's no system to bridge the gap. Staff can't track it. Golfers can't see it.",
    },
  ]
  return (
    <section className="bg-forest-pale text-ink py-32 px-8 relative grain">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px w-12 bg-ink/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-ink/60 font-mono">
            The Problem
          </span>
        </div>
        <h2
          className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] max-w-5xl mb-8 text-balance"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 350, "SOFT" 80, "WONK" 1' }}
        >
          Empty slots. Available golfers.{' '}
          <span className="italic">No connection.</span>
        </h2>
        <p className="max-w-2xl text-lg text-ink/60 leading-relaxed mb-24 text-pretty">
          Every course loses revenue to no-shows while golfers who'd happily play have no idea a slot just opened.
        </p>
        <div className="grid md:grid-cols-3 gap-16">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="relative"
            >
              <div
                className="font-display text-[8rem] leading-none text-ink/[0.08] absolute -top-16 -left-2 select-none"
                style={{ fontVariationSettings: '"opsz" 144, "wght" 400' }}
              >
                {item.n}
              </div>
              <div className="relative pt-12 border-t border-ink/20">
                <h3
                  className="font-display text-2xl mb-4"
                  style={{ fontVariationSettings: '"opsz" 32, "wght" 520' }}
                >
                  {item.title}
                </h3>
                <p className="text-ink/60 leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

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

        <div className="space-y-24">
          {/* Step 1 — with QR sign screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative pt-12">
              <div className="absolute top-0 left-0 right-0 flex items-center gap-3">
                <div
                  className="font-display text-brass text-2xl"
                  style={{ fontVariationSettings: '"opsz" 32, "wght" 420' }}
                >
                  I
                </div>
                <div className="flex-1 h-px bg-bone/15" />
              </div>
              <h3
                className="font-display text-3xl mb-4 mt-6 text-bone"
                style={{ fontVariationSettings: '"opsz" 48, "wght" 450, "SOFT" 60, "WONK" 1' }}
              >
                Golfer scans a QR code
              </h3>
              <p className="text-bone/55 leading-relaxed">
                A QR code at the pro shop or clubhouse. Golfers scan it with their phone, enter name, party size, and number. Done — they're on the list.
              </p>
            </div>
            <div className="flex justify-center md:justify-end gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-[200px] border border-bone/15 rounded-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                <img
                  src="/screenshots/qr-sign.jpeg"
                  alt="QR code sign — scan to join"
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="max-w-[160px] border border-bone/15 rounded-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                <img
                  src="/screenshots/join-form.jpeg"
                  alt="Golfer filling out the waitlist form on their phone"
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Step 2 — with post-opening screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative pt-12">
              <div className="absolute top-0 left-0 right-0 flex items-center gap-3">
                <div
                  className="font-display text-brass text-2xl"
                  style={{ fontVariationSettings: '"opsz" 32, "wght" 420' }}
                >
                  II
                </div>
                <div className="flex-1 h-px bg-bone/15" />
              </div>
              <h3
                className="font-display text-3xl mb-4 mt-6 text-bone"
                style={{ fontVariationSettings: '"opsz" 48, "wght" 450, "SOFT" 60, "WONK" 1' }}
              >
                Operator posts an opening
              </h3>
              <p className="text-bone/55 leading-relaxed">
                When a tee time opens up — cancellation, no-show, or a gap in the sheet — the operator posts it in Teeforce. One tap.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="border border-bone/15 rounded-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                <img
                  src="/screenshots/post-opening.jpeg"
                  alt="Operator posting a tee time opening in Teeforce"
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Step 3 — with SMS mock */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative pt-12">
              <div className="absolute top-0 left-0 right-0 flex items-center gap-3">
                <div
                  className="font-display text-brass text-2xl"
                  style={{ fontVariationSettings: '"opsz" 32, "wght" 420' }}
                >
                  III
                </div>
                <div className="flex-1 h-px bg-bone/15" />
              </div>
              <h3
                className="font-display text-3xl mb-4 mt-6 text-bone"
                style={{ fontVariationSettings: '"opsz" 48, "wght" 450, "SOFT" 60, "WONK" 1' }}
              >
                Next golfer gets a text
              </h3>
              <p className="text-bone/55 leading-relaxed">
                The next person on the waitlist gets an automatic text. They tap to claim the slot. If they don't respond, it rolls to the next person.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex justify-center md:justify-end"
            >
              <SmsBubble />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SmsBubble() {
  return (
    <div className="max-w-[280px]">
      <div className="bg-bone/95 rounded-[20px] p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-ink/10">
          <div className="w-8 h-8 rounded-full bg-fairway flex items-center justify-center text-[10px] text-bone font-mono font-medium">
            TF
          </div>
          <div>
            <div className="text-[11px] text-ink font-medium">Teeforce</div>
            <div className="text-[9px] text-ink/50">Text Message</div>
          </div>
        </div>
        <div className="bg-[#34C759] rounded-2xl rounded-tr-sm px-4 py-3">
          <p className="text-[13px] text-white leading-relaxed">
            Pine Valley: 10:30 AM tee time available! Claim your spot:{' '}
            <span className="underline">tfrce.golf/c/a3x</span>
          </p>
        </div>
        <div className="text-[9px] text-ink/40 mt-2 text-right font-mono">
          now
        </div>
      </div>
    </div>
  )
}

// Sourced industry stats — do not fabricate numbers.
// 9–18% no-show rate: Lightspeed Golf / Noteefy / Golf Consultants
//   - https://www.lightspeedhq.com/blog/properly-managing-tee-time-no-shows/
//   - https://golf-consultants.com/2025/02/07/the-financial-impact-of-no-shows-on-your-golf-course-revenue/
//   - study of 10M+ rounds across 500+ U.S. courses
// $140K+ annual revenue at risk (40K rounds × $70 avg × 5% no-show): foreUP / Golf Consultants
//   - https://www.foreupgolf.com/what-no-shows-are-costing-you/
// ~45% additional per-round revenue beyond green fees (F&B, pro shop, range): Noteefy
//   - https://www.noteefy.com/blog/the-revenue-opportunity-hiding-in-your-tee-sheet
function Features() {
  return (
    <section id="features" className="bg-forest-pale text-ink py-32 px-8 grain">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px w-12 bg-ink/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-ink/60 font-mono">
            The Platform
          </span>
        </div>
        <h2
          className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] max-w-5xl mb-8 text-balance"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 380, "SOFT" 70, "WONK" 1' }}
        >
          One platform.{' '}
          <span className="italic">Everything you need.</span>
        </h2>
        <p className="max-w-2xl text-lg text-ink/60 leading-relaxed mb-20 text-pretty">
          Built specifically for golf course operations — not adapted from generic booking software.
        </p>

        {/* Hero feature — available now */}
        <div className="relative border border-fairway/30 bg-ink/[0.02] p-10 md:p-14 mb-6 overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 bg-ember text-forest-abyss px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-abyss animate-[pulse-dot_2s_ease-in-out_infinite]" />
                  Available now
                </span>
              </div>
              <h3
                className="font-display text-4xl md:text-5xl mb-6 leading-[1.05] text-ink"
                style={{ fontVariationSettings: '"opsz" 60, "wght" 430, "SOFT" 50, "WONK" 1' }}
              >
                Walkup waitlist &{' '}
                <span className="italic text-fairway">automatic notifications</span>
              </h3>
              <p className="text-ink/65 max-w-lg leading-relaxed">
                Golfers scan a QR code to join the waitlist. When a tee time opens up, the next person gets a text automatically. No clipboard, no phone calls, no chasing people down in the parking lot. Works alongside your existing tee sheet — no integration required.
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-8 content-start">
              <SourcedMetric v="9–18%" k="industry no-show rate" src="10M+ rounds studied" />
              <SourcedMetric v="$140K+" k="annual revenue at risk" src="40K rounds, foreUP" />
              <SourcedMetric v="~45%" k="per-round revenue beyond green fees" src="Noteefy" />
              <SourcedMetric v="0" k="staff effort to manage" src="hands-off" />
            </div>
          </div>
          <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-fairway/10 blur-3xl pointer-events-none" />
        </div>

        {/* Coming-soon features */}
        <div className="grid grid-cols-12 gap-6">
          <ComingSoonCard
            className="col-span-12 md:col-span-4"
            num="I"
            title="Modern tee sheet"
            body="Fast, intuitive tee time management. Drag-and-drop scheduling, instant search, and a clean interface your staff can learn in minutes."
          />
          <ComingSoonCard
            className="col-span-12 md:col-span-4"
            num="II"
            title="Square integration"
            body="Keep your Square POS for payments, grill and bar tabs, and inventory. Teeforce syncs with it seamlessly — no rip and replace."
          />
          <ComingSoonCard
            className="col-span-12 md:col-span-4"
            num="III"
            title="Course analytics"
            body="See demand patterns, no-show trends, and revenue insights. Know when your course is busiest and where you're leaving money on the table."
          />
        </div>

        <p className="mt-16 max-w-2xl text-[11px] text-ink/50 leading-relaxed font-mono uppercase tracking-[0.18em]">
          We're building Teeforce with input from real course operators. Get early access and help shape what comes next.
        </p>
      </div>
    </section>
  )
}

function SourcedMetric({ v, k, src }: { v: string; k: string; src: string }) {
  return (
    <div>
      <div
        className="font-display text-4xl text-fairway leading-none"
        style={{ fontVariationSettings: '"opsz" 60, "wght" 380, "SOFT" 50, "WONK" 1' }}
      >
        {v}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-ink/65 font-mono leading-snug">
        {k}
      </div>
      <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-ink/35 font-mono">
        {src}
      </div>
    </div>
  )
}

function ComingSoonCard({
  className = '',
  num,
  title,
  body,
}: {
  className?: string
  num: string
  title: string
  body: string
}) {
  return (
    <div
      className={`border border-ink/15 p-8 md:p-10 bg-ink/[0.015] opacity-70 hover:opacity-100 transition-opacity ${className}`}
    >
      <div className="flex items-center justify-between mb-8">
        <div
          className="font-display text-ink/50 text-xl"
          style={{ fontVariationSettings: '"opsz" 24, "wght" 400' }}
        >
          {num}
        </div>
        <div className="text-[9px] uppercase tracking-[0.22em] text-ink/50 font-mono border border-ink/20 px-2 py-1">
          Coming soon
        </div>
      </div>
      <h3
        className="font-display text-2xl md:text-3xl mb-4 text-ink"
        style={{ fontVariationSettings: '"opsz" 36, "wght" 480, "SOFT" 50, "WONK" 1' }}
      >
        {title}
      </h3>
      <p className="text-ink/55 text-sm leading-relaxed">{body}</p>
    </div>
  )
}

function Waitlist() {
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
    <section
      id="waitlist"
      className="relative bg-forest-abyss py-32 px-8 overflow-hidden grain"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-forest to-forest-abyss opacity-50" />
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-12 bg-brass" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-brass font-mono">
            Try It Now
          </span>
          <div className="h-px w-12 bg-brass" />
        </div>
        <h2
          className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] mb-10 text-balance"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 350, "SOFT" 90, "WONK" 1' }}
        >
          The walkup waitlist is{' '}
          <span className="italic text-brass-bright">live</span> — get started today.
        </h2>
        <p className="text-bone/60 text-lg max-w-xl mx-auto mb-12 leading-relaxed text-pretty">
          Set it up in minutes, no integration required. Works alongside whatever you're already using. Be one of the first courses on Teeforce and help shape the full platform.
        </p>
        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto"
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
        <p className="mt-6 text-[11px] text-bone/45 font-mono leading-relaxed">
          No spam, no commitment. We'll get you set up and keep you in the loop as we build.
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-bone/10 py-12 px-8 bg-forest-abyss">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <TeeforceWordmark size="footer" />
          <span className="text-[10px] text-bone/40 font-mono uppercase tracking-[0.22em]">
            © 2026 · A Benjamin Golf Co. product
          </span>
        </div>
        <div className="flex items-center gap-8 text-[10px] text-bone/40 font-mono uppercase tracking-[0.25em]">
          <a href="https://benjamingolfco.com" className="hover:text-brass transition-colors">
            benjamingolfco.com
          </a>
          <a
            href="mailto:info@teeforce.golf"
            className="hover:text-brass transition-colors"
          >
            info@teeforce.golf
          </a>
        </div>
      </div>
    </footer>
  )
}
