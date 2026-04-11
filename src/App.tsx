import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Lenis from 'lenis'

const HERO_IMG =
  'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=2400&q=85'

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
      <Marquee />
      <AutoFillScene />
      <Problem />
      <Features />
      <HowItWorks />
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
          <a href="#auto-fill" className="hover:text-brass transition">
            The Moment
          </a>
          <a href="#features" className="hover:text-brass transition">
            Features
          </a>
          <a href="#how" className="hover:text-brass transition">
            Onboarding
          </a>
        </nav>
        <a
          href="#waitlist"
          className="group relative overflow-hidden border border-ember/60 px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-ember hover:text-forest-abyss transition-colors duration-500"
        >
          <span className="relative z-10">Request Access</span>
          <span className="absolute inset-0 bg-ember -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </a>
      </div>
    </header>
  )
}

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

      <div className="relative z-10 min-h-screen flex flex-col justify-between pt-32 pb-16 px-8 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-16 bg-brass/60" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-brass/90 font-mono">
            Vol. I · Arriving 2026
          </span>
        </motion.div>

        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.88] tracking-tight text-balance"
            style={{ fontVariationSettings: '"opsz" 144, "wght" 400, "SOFT" 100, "WONK" 1' }}
          >
            The tee sheet
            <br />
            <span className="italic font-light text-brass-bright">that fills itself.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 max-w-xl text-lg text-bone/70 leading-relaxed text-pretty"
          >
            Teeforce is the modern course-management platform built for operators who are tired of losing revenue to cancellations, no-shows, and five different pieces of software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 flex flex-wrap items-center gap-8"
          >
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-3 bg-ember text-forest-abyss px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium hover:bg-ember-bright transition-colors"
            >
              Request early access
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#auto-fill"
              className="text-sm text-bone/60 underline underline-offset-[6px] decoration-bone/30 hover:text-bone transition"
            >
              See how it fills itself
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="grid grid-cols-3 gap-12 pt-10 border-t border-bone/15 max-w-3xl"
        >
          <Stat value="≈12%" label="avg. no-show rate" note="industry data" />
          <Stat value="0" label="staff to auto-fill" note="hands-off" />
          <Stat value="<60s" label="time to fill slot" note="cancel → booked" />
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ value, label, note }: { value: string; label: string; note: string }) {
  return (
    <div>
      <div
        className="font-display text-4xl md:text-5xl text-bone"
        style={{ fontVariationSettings: '"opsz" 144, "wght" 300, "SOFT" 60, "WONK" 1' }}
      >
        {value}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-brass/80 font-mono">
        {label}
      </div>
      <div className="text-xs text-bone/40 mt-1">{note}</div>
    </div>
  )
}

function Marquee() {
  const items = [
    'Est. 2026',
    'Built for operators',
    'Square-integrated',
    'Waitlist-native',
    'No rip & replace',
    'A Benjamin Golf Co. product',
  ]
  const row = [...items, ...items, ...items]
  return (
    <section className="relative border-y border-bone/10 bg-forest-abyss overflow-hidden">
      <div className="flex gap-16 py-6 whitespace-nowrap w-max animate-[ticker_60s_linear_infinite]">
        {row.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-16 text-sm uppercase tracking-[0.25em] text-brass/60 font-mono"
          >
            <span className="text-brass">◆</span>
            <span>{item}</span>
          </div>
        ))}
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

function AutoFillScene() {
  return (
    <section id="auto-fill" className="relative py-32 px-8 bg-forest-abyss">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-brass" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-brass/80 font-mono">
              Chapter 01 · The Moment
            </span>
          </div>
          <h2
            className="font-display text-5xl lg:text-7xl leading-[0.95] mb-8 text-balance"
            style={{ fontVariationSettings: '"opsz" 144, "wght" 380, "SOFT" 70, "WONK" 1' }}
          >
            When a tee time opens, Teeforce moves{' '}
            <span className="italic text-brass-bright">before</span> your staff does.
          </h2>
          <p className="text-bone/60 text-lg leading-relaxed max-w-md">
            Someone cancels at 7:16 AM. Before your pro shop even sees the notification, the next person on the waitlist has been texted, confirmed, and assigned the slot.
          </p>
          <div className="mt-10 text-[10px] uppercase tracking-[0.3em] text-bone/30 font-mono flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-bone/30" />
            Watch it happen →
          </div>
        </div>
        <div className="lg:col-span-7">
          <TeeSheet />
        </div>
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
              Tee sheet · Live · Thu · 07 May
            </div>
          </div>
          <div className="font-mono text-[10px] text-bone/40">teeforce.live</div>
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
                  'Waitlist → Wilson (2) notified via SMS · awaiting confirmation…'}
                {phase === 'fill' &&
                  'Wilson confirmed · slot assigned · 7:16 AM · 48 seconds'}
                {phase === 'done' &&
                  '+ $180 revenue saved · staff effort: none'}
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

function Problem() {
  const items = [
    {
      n: '01',
      title: 'Revenue lost to no-shows',
      body: "Cancellations and no-shows leave holes in the tee sheet. By the time staff notices, it's too late to fill them.",
    },
    {
      n: '02',
      title: 'Five disconnected tools',
      body: 'Tee sheet here, POS there, inventory somewhere else. You toggle between platforms instead of running a course.',
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
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px w-12 bg-ink/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-ink/60 font-mono">
            Chapter 02 · The Problem
          </span>
        </div>
        <h2
          className="font-display text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.9] max-w-5xl mb-24 text-balance"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 350, "SOFT" 80, "WONK" 1' }}
        >
          Running a course shouldn't mean running{' '}
          <span className="italic">five systems.</span>
        </h2>
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

function Features() {
  return (
    <section id="features" className="bg-forest-abyss py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px w-12 bg-brass" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-brass/80 font-mono">
            Chapter 03 · The Kit
          </span>
        </div>
        <h2
          className="font-display text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.9] max-w-5xl mb-24 text-balance"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 380, "SOFT" 70, "WONK" 1' }}
        >
          One platform. Everything a{' '}
          <span className="italic text-brass-bright">course</span> actually needs.
        </h2>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7 border border-bone/10 p-10 md:p-12 hover:border-brass/40 transition-colors group relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-brass font-mono mb-8">
                Hero feature
              </div>
              <h3
                className="font-display text-4xl md:text-5xl mb-6 leading-[1.05]"
                style={{ fontVariationSettings: '"opsz" 60, "wght" 420, "SOFT" 50, "WONK" 1' }}
              >
                Automatic waitlist & notifications
              </h3>
              <p className="text-bone/60 max-w-md leading-relaxed">
                When a tee time opens from a cancellation or no-show, Teeforce notifies the next person on the waitlist and fills the slot — before your pro shop even sees it open.
              </p>
              <div className="mt-12 grid grid-cols-2 gap-y-6 gap-x-8 max-w-md">
                <Metric v="~12%" k="avg. no-show rate" />
                <Metric v="<60s" k="time to fill" />
                <Metric v="0" k="staff effort" />
                <Metric v="24/7" k="always on" />
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-brass/5 blur-3xl group-hover:bg-brass/10 transition-opacity duration-700" />
          </div>

          <FeatureCard
            className="col-span-12 lg:col-span-5"
            num="I"
            title="Modern tee sheet"
            body="Drag-and-drop scheduling. Instant search. A clean interface your staff can learn in minutes — not days."
          />
          <FeatureCard
            className="col-span-12 md:col-span-6 lg:col-span-4"
            num="II"
            title="Square integration"
            body="Keep your Square POS for payments and tabs. Teeforce syncs seamlessly. No rip-and-replace migrations."
          />
          <FeatureCard
            className="col-span-12 md:col-span-6 lg:col-span-4"
            num="III"
            title="Grill & bar"
            body="Food and beverage orders connected to course operations. Tab tracking, menus, and reporting in one view."
          />
          <FeatureCard
            className="col-span-12 md:col-span-6 lg:col-span-4"
            num="IV"
            title="Inventory"
            body="Pro shop and F&B inventory that syncs with your sales data. Know what's selling, what's low, what to reorder."
          />
        </div>
      </div>
    </section>
  )
}

function Metric({ v, k }: { v: string; k: string }) {
  return (
    <div>
      <div
        className="font-display text-3xl text-brass-bright"
        style={{ fontVariationSettings: '"opsz" 60, "wght" 350, "SOFT" 50, "WONK" 1' }}
      >
        {v}
      </div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-bone/40 font-mono mt-1">
        {k}
      </div>
    </div>
  )
}

function FeatureCard({
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
      className={`border border-bone/10 p-8 md:p-10 hover:border-brass/40 transition-colors group ${className}`}
    >
      <div
        className="font-display text-brass text-xl mb-8"
        style={{ fontVariationSettings: '"opsz" 24, "wght" 400' }}
      >
        {num}
      </div>
      <h3
        className="font-display text-2xl md:text-3xl mb-4"
        style={{ fontVariationSettings: '"opsz" 36, "wght" 480, "SOFT" 50, "WONK" 1' }}
      >
        {title}
      </h3>
      <p className="text-bone/55 text-sm leading-relaxed">{body}</p>
    </div>
  )
}

function HowItWorks() {
  const steps = [
    {
      n: 'I',
      title: 'Connect your Square',
      body: 'Link the Square account you already use for payments, tabs, and inventory. Nothing to rip out.',
    },
    {
      n: 'II',
      title: 'Bring your tee sheet over',
      body: 'Import your existing bookings, pricing, and course settings. We help with the migration so day one feels familiar.',
    },
    {
      n: 'III',
      title: 'Run your course',
      body: 'Manage tee times from a single dashboard and watch cancellations quietly fill themselves in the background.',
    },
  ]
  return (
    <section id="how" className="bg-forest-pale text-ink py-32 px-8 grain relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px w-12 bg-ink/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-ink/60 font-mono">
            Chapter 04 · Onboarding
          </span>
        </div>
        <h2
          className="font-display text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.9] max-w-4xl mb-24 text-balance"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 350, "SOFT" 80, "WONK" 1' }}
        >
          Up and running in <span className="italic">days, not months.</span>
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
                  className="font-display text-fairway text-2xl"
                  style={{ fontVariationSettings: '"opsz" 32, "wght" 420' }}
                >
                  {step.n}
                </div>
                <div className="flex-1 h-px bg-ink/20" />
              </div>
              <h3
                className="font-display text-3xl mb-4 mt-6"
                style={{ fontVariationSettings: '"opsz" 48, "wght" 450, "SOFT" 60, "WONK" 1' }}
              >
                {step.title}
              </h3>
              <p className="text-ink/60 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Waitlist() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
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
            Early Access
          </span>
          <div className="h-px w-12 bg-brass" />
        </div>
        <h2
          className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] mb-10 text-balance"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 350, "SOFT" 90, "WONK" 1' }}
        >
          Help us build{' '}
          <span className="italic text-brass-bright">the one</span> you've been waiting for.
        </h2>
        <p className="text-bone/60 text-lg max-w-xl mx-auto mb-12 leading-relaxed text-pretty">
          We're building Teeforce alongside real course operators. Get early access when it launches and help shape the product.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
          className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@course.com"
            disabled={sent}
            className="flex-1 bg-bone/5 border border-bone/20 px-5 py-4 text-bone placeholder:text-bone/30 focus:outline-none focus:border-brass focus:bg-bone/10 font-mono text-sm transition-colors"
          />
          <button
            type="submit"
            disabled={sent}
            className="bg-ember text-forest-abyss px-8 py-4 text-xs uppercase tracking-[0.18em] hover:bg-ember-bright transition-colors disabled:opacity-70"
          >
            {sent ? "You're on the list" : 'Request access'}
          </button>
        </form>
        <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-bone/40 font-mono">
          No spam · Cancel anytime · Launching 2026
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
            A Benjamin Golf Co. product
          </span>
        </div>
        <div className="flex items-center gap-8 text-[10px] text-bone/40 font-mono uppercase tracking-[0.25em]">
          <a href="https://benjamingolfco.com" className="hover:text-brass transition-colors">
            benjamingolfco.com
          </a>
          <a
            href="mailto:aarongbenjamin@gmail.com"
            className="hover:text-brass transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
