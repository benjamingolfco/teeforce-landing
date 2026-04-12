import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Lenis from 'lenis'

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

  return (
    <main className="min-h-screen bg-forest-abyss text-bone font-sans antialiased">
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <VisualDemo />
      <Features />
      <Waitlist />
      <Footer />
    </main>
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
      <div className="absolute inset-0 bg-gradient-to-b from-forest via-forest-abyss to-forest-abyss" />
      <div className="absolute inset-0 bg-gradient-to-br from-brass/10 via-transparent to-transparent" />

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
            <HeroDashboardPlaceholder />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// TODO: Replace HeroDashboardPlaceholder with a real screenshot of the operator dashboard.
// Capture URL: https://purple-field-0a3932a0f.4.azurestaticapps.net/course/019d608a-2356-765e-8420-f570c659f62b/pos/waitlist
// Expected content: waitlist open with 2-3 openings posted and 3 golfers in the queue.
function HeroDashboardPlaceholder() {
  const openings = [
    { time: '2:30 PM', party: 2 },
    { time: '3:00 PM', party: 4 },
  ]
  const queue = [
    { name: 'Mike Thompson', party: 2 },
    { name: 'Sarah Kim', party: 4 },
    { name: 'Dan Reeves', party: 3 },
  ]
  return (
    <div className="relative">
      <div className="relative bg-gradient-to-br from-forest-mid to-forest rounded-sm border border-bone/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-bone/10 bg-black/30">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-bone/25" />
            <div className="w-2.5 h-2.5 rounded-full bg-bone/15" />
            <div className="w-2.5 h-2.5 rounded-full bg-bone/15" />
          </div>
          <div className="flex-1 text-center font-mono text-[10px] text-bone/40 tracking-wide">
            teeforce.golf / walkup-waitlist
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-brass animate-[pulse-dot_2s_ease-in-out_infinite]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/50">
              Live
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline justify-between mb-6">
            <div
              className="font-display text-2xl text-bone"
              style={{ fontVariationSettings: '"opsz" 32, "wght" 460' }}
            >
              Walkup waitlist
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone/40">
              Thu · 11 Apr
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-brass mb-3 flex items-center gap-2">
                <span className="h-px w-4 bg-brass/50" />
                Openings
              </div>
              <div className="space-y-2">
                {openings.map((o) => (
                  <div
                    key={o.time}
                    className="flex items-center justify-between border border-brass/30 bg-brass/[0.05] px-3 py-2.5 font-mono text-[11px]"
                  >
                    <span className="text-bone/90">{o.time}</span>
                    <span className="text-brass">×{o.party}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 px-3 py-2 border border-dashed border-bone/15 font-mono text-[10px] text-bone/30">
                  + post opening
                </div>
              </div>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-brass mb-3 flex items-center gap-2">
                <span className="h-px w-4 bg-brass/50" />
                Queue
              </div>
              <div className="space-y-2">
                {queue.map((g, i) => (
                  <div
                    key={g.name}
                    className="flex items-center gap-3 border border-bone/10 bg-bone/[0.02] px-3 py-2.5 font-mono text-[11px]"
                  >
                    <span className="text-bone/40 text-[9px] w-3">{i + 1}</span>
                    <span className="flex-1 text-bone/85 truncate">{g.name}</span>
                    <span className="text-bone/50">×{g.party}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-bone/10 pt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-bone/40">
            <span>3 waiting</span>
            <span className="text-brass/80">◆ Auto-notify on</span>
          </div>
        </div>
      </div>
      <div className="absolute -top-4 -right-4 bg-brass text-forest-abyss px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] shadow-xl">
        Available now
      </div>
    </div>
  )
}

function Problem() {
  const items = [
    {
      n: '01',
      title: 'Walkups get turned away',
      body: "A group shows up ready to play but the sheet looks full. Without a waitlist, they leave — and that's revenue walking out the door.",
    },
    {
      n: '02',
      title: 'No-shows leave empty slots',
      body: 'Industry data shows 9–18% of tee times go unfilled from no-shows and cancellations. Those slots could go to the walkup golfers you just sent home.',
    },
    {
      n: '03',
      title: 'Staff are playing waitlist coordinator',
      body: "Taking names, checking the sheet, calling people back — your pro shop staff has better things to do than manage a clipboard.",
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
          Full course, walkup golfers,{' '}
          <span className="italic">no good options.</span>
        </h2>
        <p className="max-w-2xl text-lg text-ink/60 leading-relaxed mb-24 text-pretty">
          Every course deals with this. Most handle it with a clipboard or a "come back later."
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
  const steps = [
    {
      n: 'I',
      title: 'Golfer scans a QR code',
      body: "A QR code at the pro shop or clubhouse. Golfers scan it with their phone, enter name, party size, and number. Done — they're on the list.",
    },
    {
      n: 'II',
      title: 'Operator posts an opening',
      body: 'When a tee time opens up — cancellation, no-show, or a gap in the sheet — the operator posts it in Teeforce. One tap.',
    },
    {
      n: 'III',
      title: 'Next golfer gets a text',
      body: "The next person on the waitlist gets an automatic text. They tap to claim the slot. If they don't respond, it rolls to the next person.",
    },
  ]
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
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="relative pt-12"
            >
              <div className="absolute top-0 left-0 right-0 flex items-center gap-3">
                <div
                  className="font-display text-brass text-2xl"
                  style={{ fontVariationSettings: '"opsz" 32, "wght" 420' }}
                >
                  {step.n}
                </div>
                <div className="flex-1 h-px bg-bone/15" />
              </div>
              <h3
                className="font-display text-3xl mb-4 mt-6 text-bone"
                style={{ fontVariationSettings: '"opsz" 48, "wght" 450, "SOFT" 60, "WONK" 1' }}
              >
                {step.title}
              </h3>
              <p className="text-bone/55 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

type SlotStatus = 'booked' | 'open' | 'cancelled' | 'filled'
type Slot = { time: string; name: string; party: number; status: SlotStatus }
type Phase = 'idle' | 'cancel' | 'notify' | 'fill' | 'done'

const INITIAL_SLOTS: Slot[] = [
  { time: '7:00', name: 'Johnson', party: 4, status: 'booked' },
  { time: '7:08', name: 'Martinez', party: 3, status: 'booked' },
  { time: '7:16', name: 'Park', party: 2, status: 'booked' },
  { time: '7:24', name: 'Reyes', party: 4, status: 'booked' },
  { time: '7:32', name: '—', party: 0, status: 'open' },
  { time: '7:40', name: 'Chen', party: 2, status: 'booked' },
]

function VisualDemo() {
  return (
    <section className="relative py-24 px-8 bg-forest-abyss border-t border-bone/10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-12 bg-brass/50" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-brass/70 font-mono">
            The mechanic, in motion
          </span>
          <div className="h-px w-12 bg-brass/50" />
        </div>
        <TeeSheet />
      </div>
    </section>
  )
}

function TeeSheet() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const [slots, setSlots] = useState<Slot[]>(INITIAL_SLOTS)
  const [phase, setPhase] = useState<Phase>('idle')
  const [loopKey, setLoopKey] = useState(0)

  useEffect(() => {
    if (!inView) return
    const timers: number[] = []
    setSlots(INITIAL_SLOTS)
    setPhase('idle')

    timers.push(
      window.setTimeout(() => {
        setPhase('cancel')
        setSlots((s) =>
          s.map((x, i) => (i === 2 ? { ...x, status: 'cancelled' } : x)),
        )
      }, 1400),
    )
    timers.push(window.setTimeout(() => setPhase('notify'), 2700))
    timers.push(
      window.setTimeout(() => {
        setPhase('fill')
        setSlots((s) =>
          s.map((x, i) =>
            i === 2
              ? { time: '7:16', name: 'Wilson', party: 2, status: 'filled' }
              : x,
          ),
        )
      }, 3900),
    )
    timers.push(window.setTimeout(() => setPhase('done'), 5100))
    timers.push(window.setTimeout(() => setLoopKey((k) => k + 1), 9000))

    return () => {
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [inView, loopKey])

  return (
    <div ref={ref} className="relative">
      <div className="relative bg-gradient-to-br from-forest-mid to-forest rounded-sm border border-bone/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-bone/10 bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brass animate-[pulse-dot_2s_ease-in-out_infinite]" />
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/60">
              Tee sheet · Live · Thu · 11 Apr
            </div>
          </div>
          <div className="font-mono text-[10px] text-bone/40">teeforce.golf</div>
        </div>

        <div className="p-6 pb-24 font-mono text-sm">
          {slots.map((slot, i) => (
            <SlotRow key={i} slot={slot} isTarget={i === 2} phase={phase} />
          ))}
        </div>

        <AnimatePresence>
          {(phase === 'notify' || phase === 'fill' || phase === 'done') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 left-6 right-6 border border-brass/30 bg-brass/10 backdrop-blur px-4 py-3 flex items-center gap-3"
            >
              <span className="text-brass">⚡</span>
              <div className="flex-1 font-mono text-[11px] text-brass-bright leading-relaxed">
                {phase === 'notify' &&
                  'Opening posted · next on waitlist texted automatically…'}
                {phase === 'fill' &&
                  'Wilson confirmed · slot assigned · zero staff effort'}
                {phase === 'done' &&
                  'Revenue recovered without a single phone call'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute -top-4 -right-4 bg-brass text-forest-abyss px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] shadow-xl">
        06:47 AM
      </div>
    </div>
  )
}

function SlotRow({
  slot,
  isTarget,
  phase,
}: {
  slot: Slot
  isTarget: boolean
  phase: Phase
}) {
  const isActive =
    isTarget && (phase === 'cancel' || phase === 'notify' || phase === 'fill' || phase === 'done')
  return (
    <motion.div
      layout
      className={`flex items-center gap-6 py-3 border-b border-bone/5 last:border-b-0 transition-colors ${
        isActive ? 'bg-brass/5' : ''
      }`}
    >
      <div className="w-14 text-bone/70">{slot.time}</div>
      <div className="flex-1 flex items-center gap-3">
        <motion.span
          key={`${slot.name}-${slot.status}`}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          className={
            slot.status === 'cancelled'
              ? 'line-through text-ember/70'
              : slot.status === 'open'
                ? 'text-bone/30'
                : slot.status === 'filled'
                  ? 'text-brass-bright'
                  : 'text-bone/90'
          }
        >
          {slot.name}
          {slot.party > 0 && <span className="text-bone/40"> · ({slot.party})</span>}
        </motion.span>
        {slot.status === 'filled' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] uppercase tracking-[0.2em] text-brass border border-brass/40 px-1.5 py-0.5"
          >
            ← from waitlist
          </motion.span>
        )}
      </div>
      <div
        className={`text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 border ${
          slot.status === 'booked'
            ? 'border-bone/20 text-bone/50'
            : slot.status === 'cancelled'
              ? 'border-ember/40 text-ember'
              : slot.status === 'filled'
                ? 'border-brass text-brass bg-brass/10'
                : 'border-bone/10 text-bone/30'
        }`}
      >
        {slot.status}
      </div>
    </motion.div>
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
