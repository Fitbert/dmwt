import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Clock, Star, CheckCircle } from 'lucide-react'

const gold = '#c9873a'
const navy = '#0f1a2e'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
})

const steps = [
  {
    icon: CheckCircle,
    title: 'Submission received',
    desc: 'Your property details are in — we have everything we need.',
    done: true,
  },
  {
    icon: Clock,
    title: 'Manual review in progress',
    desc: 'We\'re pulling your county data, running comps, and building your case.',
    done: false,
  },
  {
    icon: Mail,
    title: 'Packet delivered to your inbox',
    desc: 'Your protest-ready PDF arrives within 24–48 hours.',
    done: false,
  },
]

export default function ThankYou() {
  return (
    <div
      className="min-h-screen"
      style={{ background: '#f5f3ef', fontFamily: '"DM Sans", system-ui, sans-serif' }}
    >
      {/* Minimal nav */}
      <header style={{ background: navy, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span style={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, color: '#fff', fontSize: 18 }}>
              Don't Mess
            </span>
            <span
              style={{
                background: gold, color: navy,
                fontFamily: '"Playfair Display", serif',
                fontWeight: 900, fontSize: 18,
                borderRadius: 6, padding: '1px 8px',
              }}
            >
              WithTax
            </span>
            <span style={{ color: gold, fontSize: 16 }}>★</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-57px)] max-w-2xl flex-col items-center justify-center px-6 py-16">

        {/* Star badge */}
        <motion.div {...fadeUp(0.05)}>
          <div
            className="mb-8 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: 'rgba(201,135,58,0.12)', border: `2px solid rgba(201,135,58,0.3)` }}
          >
            <Star size={36} fill={gold} style={{ color: gold }} />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.12)}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 900,
            fontSize: 42,
            color: navy,
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          We're on it, partner.
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-4 text-center text-base leading-relaxed"
          style={{ color: '#64748b', maxWidth: 420 }}
        >
          Your property submission is in. We'll manually review your county
          data and comparable homes, then deliver your complete protest packet
          straight to your inbox.
        </motion.p>

        {/* Timeline */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 w-full rounded-2xl bg-white p-8"
          style={{ border: '1px solid #e8e2d9' }}
        >
          <p
            className="mb-6 text-xs font-bold uppercase tracking-widest"
            style={{ color: gold }}
          >
            What happens next
          </p>

          <div className="space-y-0">
            {steps.map(({ icon: Icon, title, desc, done }, i) => (
              <div key={title} className="flex gap-4">
                {/* Left: icon + connector */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                    style={
                      done
                        ? { background: gold, color: navy }
                        : { background: '#f1ede7', color: '#94a3b8' }
                    }
                  >
                    <Icon size={16} />
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="my-1 w-px flex-1"
                      style={{
                        background: done ? gold : '#e8e2d9',
                        minHeight: 32,
                        opacity: done ? 0.4 : 1,
                      }}
                    />
                  )}
                </div>

                {/* Right: text */}
                <div className="pb-6">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: done ? navy : '#94a3b8' }}
                  >
                    {title}
                    {done && (
                      <span
                        className="ml-2 rounded-full px-2 py-0.5 text-xs font-bold"
                        style={{ background: 'rgba(201,135,58,0.12)', color: gold }}
                      >
                        Done
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-sm" style={{ color: '#94a3b8' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Turnaround callout */}
          <div
            className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: 'rgba(201,135,58,0.06)', border: '1px solid rgba(201,135,58,0.2)' }}
          >
            <Clock size={16} style={{ color: gold, flexShrink: 0 }} />
            <p className="text-sm" style={{ color: '#92400e' }}>
              <span className="font-bold">24–48 hour turnaround.</span> Check
              your inbox — and your spam folder just in case.
            </p>
          </div>
        </motion.div>

        {/* Protest deadline reminder */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-5 w-full rounded-xl px-5 py-4 flex items-start gap-3"
          style={{ background: '#fff', border: '1px solid #e8e2d9' }}
        >
          <span style={{ fontSize: 18, lineHeight: '24px' }}>⚠️</span>
          <p className="text-sm" style={{ color: '#475569' }}>
            <span className="font-semibold" style={{ color: navy }}>
              Protest deadline: May 15, 2026.
            </span>{' '}
            You have plenty of time — we'll make sure your packet is ready well
            before the wire.
          </p>
        </motion.div>

        {/* Back home */}
        <motion.div {...fadeUp(0.48)} className="mt-8">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: '#94a3b8' }}
          >
            ← Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
