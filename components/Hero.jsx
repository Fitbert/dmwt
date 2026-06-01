import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBreakpoint } from '../hooks/useBreakpoint'

const C = { cream: '#f5f0e8', tan: '#e8dcc8', rust: '#8b3a1a', brown: '#3d2008', ink: '#1c1008', faded: '#7a6548' }
const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } })

export default function Hero() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint()

  const headlineSize = isMobile ? 52 : isTablet ? 68 : 84
  const padding      = isMobile ? '48px 20px 56px' : isTablet ? '64px 32px' : '88px 48px'

  return (
    <section style={{ background: C.cream, position: 'relative', overflow: 'hidden', minHeight: isMobile ? 'auto' : '90vh', display: 'flex', alignItems: 'center' }}>
      <style>{`
        .hero-grid { display: grid; grid-template-columns: 1fr; gap: 48px; }
        @media (min-width: 1024px) { .hero-grid { grid-template-columns: 1fr 380px; gap: 60px; align-items: center; } }
        .protest-card { display: none; }
        @media (min-width: 768px) { .protest-card { display: block; } }
        @media (min-width: 1024px) { .protest-card { display: block; } }
      `}</style>

      {/* Paper line texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(60,30,8,0.04) 27px,rgba(60,30,8,0.04) 28px),repeating-linear-gradient(90deg,transparent,transparent 99px,rgba(60,30,8,0.018) 99px,rgba(60,30,8,0.018) 100px)` }} />

      {/* Giant lone star watermark */}
      <div style={{ position: 'absolute', right: isMobile ? '-20%' : '-4%', top: '50%', transform: 'translateY(-50%)', fontSize: isMobile ? 400 : 680, lineHeight: 1, color: C.rust, opacity: 0.045, pointerEvents: 'none', userSelect: 'none', fontFamily: 'serif' }}>★</div>

      {/* Scattered small stars */}
      {[{ top: '10%', left: '3%', size: 24, opacity: 0.12 }, { top: '80%', left: '5%', size: 16, opacity: 0.08 }].map((s, i) => (
        <div key={i} style={{ position: 'absolute', fontSize: s.size, color: C.rust, opacity: s.opacity, pointerEvents: 'none', top: s.top, left: s.left }}>★</div>
      ))}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding, width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="hero-grid">

          {/* Left: copy */}
          <div>
            <motion.div {...fadeUp(0.05)}>
              <span style={{ fontFamily: "'Special Elite', monospace", fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.faded, borderBottom: `1px solid rgba(60,30,8,0.2)`, paddingBottom: 10, display: 'block', marginBottom: 20 }}>
                Texas Property Tax Protest — Est. 2024
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.15)} style={{ fontFamily: "'Caveat', cursive", fontSize: headlineSize, fontWeight: 700, lineHeight: 0.92, color: C.brown, margin: '0 0 10px', letterSpacing: '-1.5px' }}>
              Your county's<br />been{' '}
              <span style={{ color: C.rust }}>overcharging</span><br />
              you long enough.
            </motion.h1>

            <motion.p {...fadeUp(0.25)} style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: isMobile ? 14 : 16, fontStyle: 'italic', color: C.faded, margin: '18px 0 24px', lineHeight: 1.7, maxWidth: 440 }}>
              A complete ARB protest packet, built from real data, delivered straight to your inbox.
            </motion.p>

            <motion.p {...fadeUp(0.32)} style={{ fontFamily: "'Special Elite', monospace", fontSize: isMobile ? 12 : 13, lineHeight: 1.9, color: C.ink, maxWidth: 430, marginBottom: 32, opacity: 0.8 }}>
              We pull comparable sales, run the equity analysis, and put together everything your appraisal review board needs to see — formatted proper, ready to file.
            </motion.p>

            <motion.div {...fadeUp(0.4)} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', gap: isMobile ? 12 : 24 }}>
              <Link to="/intake" style={{ fontFamily: "'Special Elite', monospace", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', background: C.rust, color: C.cream, padding: '14px 32px', textDecoration: 'none', border: `2px solid ${C.rust}`, textAlign: 'center', display: 'block' }}>
                Start My Protest →
              </Link>
              <a href="#how" style={{ fontFamily: "'Special Elite', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.faded, textDecoration: 'underline', textUnderlineOffset: 4, textAlign: 'center' }}>
                See how it works ↓
              </a>
            </motion.div>

            {/* Trust stats */}
            <motion.div {...fadeUp(0.5)} style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 20 : 36, marginTop: 36, paddingTop: 28, borderTop: '1px dashed rgba(60,30,8,0.2)' }}>
              {[{ val: '$1,240', label: 'Avg. savings / year' }, { val: '73%', label: 'Win a reduction' }, { val: '8 min', label: 'To get your packet' }].map(({ val, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: C.rust, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "'Special Elite', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.faded, marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: protest card — tablet + desktop only via CSS */}
          <motion.div className="protest-card"
            initial={{ opacity: 0, x: 32, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 1.5 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'absolute', inset: 0, background: C.tan, transform: 'rotate(3deg) translateY(6px)', border: `1.5px solid rgba(60,30,8,0.15)` }} />
            <div style={{ background: '#fffef9', border: `1.5px solid rgba(60,30,8,0.3)`, padding: '28px 26px', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 5, border: '0.5px solid rgba(60,30,8,0.08)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                {[{ label: 'Overvalued', rotate: '-4deg', color: 'rgba(122,26,26,0.7)' }, { label: 'Ready to File', rotate: '3deg', color: 'rgba(26,46,90,0.6)' }].map(({ label, rotate, color }) => (
                  <div key={label} style={{ border: `2.5px solid ${color}`, padding: '3px 10px', fontFamily: "'Special Elite', monospace", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color, transform: `rotate(${rotate})`, fontWeight: 700 }}>{label}</div>
                ))}
              </div>
              <div style={{ fontFamily: "'Special Elite', monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.faded, marginBottom: 6 }}>Protest Packet — Travis County</div>
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: 22, fontWeight: 700, color: C.brown, marginBottom: 18, lineHeight: 1.2 }}>123 Longhorn Dr<br />Austin, TX 78701</div>
              {[
                { key: 'County says',   val: '$487,000', color: '#7a1a1a' },
                { key: 'Evidence shows',val: '$412,000', color: '#1a5c2a' },
                { key: 'Comps found',   val: '5 sales',  color: C.brown },
                { key: '§42.26 equity', val: 'Included', color: C.brown },
              ].map(({ key, val, color }) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px dotted rgba(60,30,8,0.18)', fontFamily: "'Special Elite', monospace" }}>
                  <span style={{ fontSize: 11.5, color: C.faded }}>{key}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color }}>{val}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, background: C.tan, padding: '12px 14px', display: 'flex', justifyContent: 'space-between' }}>
                {[{ label: 'Est. reduction', val: '$75,000' }, { label: 'Est. savings', val: '$1,875/yr' }].map(({ label, val }) => (
                  <div key={label} style={{ textAlign: label === 'Est. savings' ? 'right' : 'left' }}>
                    <div style={{ fontFamily: "'Special Elite', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.faded }}>{label}</div>
                    <div style={{ fontFamily: "'Caveat', cursive", fontSize: 26, fontWeight: 700, color: '#1a5c2a', lineHeight: 1 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
