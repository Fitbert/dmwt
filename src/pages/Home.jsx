// src/pages/Home.jsx
import Navbar from '../components/Navbar'
import Hero   from '../components/Hero'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Link }   from 'react-router-dom'
import { useBreakpoint } from '../hooks/useBreakpoint'

const C = { cream: '#f5f0e8', tan: '#e8dcc8', rust: '#8b3a1a', brown: '#3d2008', ink: '#1c1008', faded: '#7a6548' }

const STEPS = [
  { num: '01', title: 'Enter your property', body: 'Type your address or upload your appraisal notice. We pull county records automatically — no digging required.', note: 'All 254 Texas counties' },
  { num: '02', title: 'We build the case',   body: 'Comparable sales, equity analysis, condition notes — assembled into a clean, ARB-ready packet built for your county.', note: 'Both arguments included' },
  { num: '03', title: 'You file, you fight', body: "Download your complete PDF protest packet, formatted for your county's ARB. Hearing prep with talking points available too.", note: 'Ready in under 8 minutes' },
]

const TIERS = [
  {
    name: 'Evidence Packet', price: '$29', highlight: false, cta: 'Get Evidence Packet',
    desc: 'Everything you need to file a strong protest.',
    items: ['Cover page & property summary', 'One-page evidence summary', 'Comparable sales grid (5 comps)', 'Equity / uniformity analysis (§42.26)', 'Condition documentation guide', 'Filing checklist'],
  },
  {
    name: 'Hearing Prep', price: '$59', highlight: true, cta: 'Get Hearing Prep',
    desc: 'Full packet + a complete walkthrough for your ARB hearing.',
    items: ['Everything in Evidence Packet', 'Opening statement script', 'Argument talking points', 'ARB objection & response guide', 'Deadline & submission checklist', 'Priority turnaround'],
  },
]

export default function Home() {
  const { isMobile, isTablet } = useBreakpoint()
  const px  = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const spy = isMobile ? '56px' : '80px'

  return (
    <div style={{ background: C.cream, fontFamily: "'Special Elite', monospace" }}>
      <style>{`
        .steps-grid { display: grid; grid-template-columns: 1fr; border: 1.5px solid rgba(60,30,8,0.2); }
        @media (min-width: 640px)  { .steps-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .steps-grid { grid-template-columns: repeat(3,1fr); } }
        .step-cell { border-bottom: 1px dashed rgba(60,30,8,0.18); }
        @media (min-width: 640px)  { .step-cell { border-bottom: none; border-right: 1px dashed rgba(60,30,8,0.18); } }
        @media (min-width: 640px)  { .step-cell:nth-child(2n) { border-right: none; } }
        @media (min-width: 1024px) { .step-cell { border-right: 1px dashed rgba(60,30,8,0.18); } }
        @media (min-width: 1024px) { .step-cell:last-child { border-right: none; } }
        .stats-row { display: flex; flex-wrap: wrap; justify-content: space-around; gap: 20px; }
        @media (min-width: 640px) { .stats-row { flex-wrap: nowrap; gap: 0; } }
        .pricing-grid { display: grid; grid-template-columns: 1fr; border: 1.5px solid rgba(60,30,8,0.25); max-width: 760px; margin: 0 auto; }
        @media (min-width: 640px) { .pricing-grid { grid-template-columns: 1fr 1fr; } }
        .tier-divider { border-bottom: 1.5px solid rgba(60,30,8,0.25); }
        @media (min-width: 640px) { .tier-divider { border-bottom: none; border-right: 1.5px solid rgba(60,30,8,0.25); } }
      `}</style>

      <Navbar />
      <Hero />

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: `${spy} ${px}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-5%', bottom: '-10%', fontSize: isMobile ? 280 : 500, color: C.rust, opacity: 0.03, pointerEvents: 'none', userSelect: 'none' }}>★</div>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 52 : 72, fontWeight: 700, color: 'rgba(60,30,8,0.08)', lineHeight: 1 }}>§</span>
              <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 36 : 48, fontWeight: 700, color: C.brown, margin: 0 }}>How it works</h2>
            </div>
            <p style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', fontSize: isMobile ? 13 : 15, color: C.faded, marginTop: 8, maxWidth: 480 }}>
              No attorney. No confusing forms. A complete protest packet built from public records.
            </p>
          </motion.div>

          <div className="steps-grid">
            {STEPS.map(({ num, title, body, note }, i) => (
              <motion.div key={num} className="step-cell"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ padding: isMobile ? '24px 20px' : '32px 28px' }}
              >
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 44 : 60, fontWeight: 700, color: 'rgba(60,30,8,0.09)', lineHeight: 1, marginBottom: 8 }}>{num}</div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 14 : 15, fontWeight: 700, color: C.brown, margin: '0 0 10px' }}>{title}</h3>
                <p style={{ fontSize: 12, lineHeight: 1.9, color: C.faded, margin: '0 0 14px' }}>{body}</p>
                <div style={{ fontSize: 10.5, color: C.rust, borderTop: '1px dashed rgba(60,30,8,0.18)', paddingTop: 10, letterSpacing: '0.06em' }}>✓ {note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ background: C.brown, padding: `24px ${px}`, borderTop: '2px solid #1c1008', borderBottom: '2px solid #1c1008' }}>
        <div className="stats-row" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {[{ val: '$1,240', label: 'Avg. annual savings' }, { val: '73%', label: 'Win a reduction' }, { val: '254', label: 'Texas counties' }, { val: 'May 15', label: 'Protest deadline' }].map(({ val, label }) => (
            <div key={label} style={{ textAlign: 'center', padding: isMobile ? '4px 0' : '0 24px' }}>
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 30 : 38, fontWeight: 700, color: C.tan, lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: "'Special Elite', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,220,200,0.5)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIAL */}
      <div style={{ background: C.tan, padding: `${isMobile ? '36px' : '48px'} ${px}`, borderBottom: '1px solid rgba(60,30,8,0.15)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', gap: isMobile ? 16 : 32, alignItems: 'center' }}>
          <div style={{ fontSize: isMobile ? 36 : 80, color: C.rust, opacity: 0.5, lineHeight: 1, flexShrink: 0 }}>★</div>
          <div>
            <p style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: isMobile ? 15 : 18, fontStyle: 'italic', color: C.brown, lineHeight: 1.7, margin: '0 0 12px' }}>
              "Saved $1,800 on my Travis County taxes last year. Took me less time than making a pot of coffee — and I drink a lot of coffee."
            </p>
            <p style={{ fontFamily: "'Special Elite', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.faded }}>— Sandra M., Austin TX</p>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <section id="pricing" style={{ padding: `${spy} ${px}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '-5%', top: '10%', fontSize: isMobile ? 240 : 420, color: C.rust, opacity: 0.03, pointerEvents: 'none', userSelect: 'none' }}>★</div>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 44, textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 38 : 52, fontWeight: 700, color: C.brown, margin: '0 0 12px' }}>One flat fee. No surprises.</h2>
            <p style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', fontSize: isMobile ? 13 : 15, color: C.faded, maxWidth: 440, margin: '0 auto' }}>
              Pay once, get a professional packet. Save even one month of taxes and you've already broken even.
            </p>
          </motion.div>

          <div className="pricing-grid">
            {TIERS.map(({ name, price, desc, items, highlight, cta }, i) => (
              <motion.div key={name} className={i === 0 ? 'tier-divider' : ''}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: isMobile ? '28px 24px' : '36px 32px', background: highlight ? C.brown : C.cream, position: 'relative' }}
              >
                {highlight && (
                  <div style={{ position: 'absolute', top: -1, left: isMobile ? 20 : 32, background: C.rust, padding: '4px 14px', fontFamily: "'Special Elite', monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.cream }}>
                    Most popular
                  </div>
                )}
                <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 26 : 30, fontWeight: 700, color: highlight ? C.tan : C.brown, margin: '0 0 6px' }}>{name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 38 : 46, fontWeight: 700, color: C.rust, lineHeight: 1 }}>{price}</span>
                  <span style={{ fontFamily: "'Special Elite', monospace", fontSize: 11, color: highlight ? 'rgba(232,220,200,0.5)' : C.faded }}>/ property</span>
                </div>
                <p style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', fontSize: 13, color: highlight ? 'rgba(232,220,200,0.6)' : C.faded, marginBottom: 22 }}>{desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {items.map(item => (
                    <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontFamily: "'Special Elite', monospace", fontSize: 12, color: highlight ? 'rgba(232,220,200,0.8)' : C.ink }}>
                      <span style={{ color: C.rust, flexShrink: 0 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <Link to="/intake" style={{ display: 'block', textAlign: 'center', fontFamily: "'Special Elite', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '13px 24px', textDecoration: 'none', background: highlight ? C.rust : 'transparent', color: highlight ? C.cream : C.rust, border: `2px solid ${C.rust}` }}>
                  {cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}