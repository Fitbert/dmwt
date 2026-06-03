import { Link } from 'react-router-dom'
import { useBreakpoint } from '../hooks/useBreakpoint'
 
const C = { cream: '#f5f0e8', tan: '#e8dcc8', rust: '#8b3a1a', brown: '#3d2008', faded: '#7a6548' }
 
export default function Footer() {
  const { isMobile, isTablet } = useBreakpoint()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
 
  return (
    <footer style={{ background: C.brown, borderTop: '2px solid #1c1008', fontFamily: "'Special Elite', monospace" }}>
      <style>{`
        .footer-grid { display: grid; grid-template-columns: 1fr; gap: 36px; }
        @media (min-width: 640px)  { .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; } }
        @media (min-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: 48px; } }
        .footer-bottom { display: flex; flex-direction: column; text-align: center; gap: 8px; }
        @media (min-width: 640px)  { .footer-bottom { flex-direction: row; justify-content: space-between; text-align: left; } }
      `}</style>
 
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: `${isMobile ? '40px' : '56px'} ${px} 28px` }}>
        <div className="footer-grid" style={{ marginBottom: 40 }}>
 
          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'block', marginBottom: 14 }}>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 24 : 28, fontWeight: 700, color: C.tan }}>
                Don't Mess<span style={{ color: C.rust, margin: '0 5px' }}>★</span>WithTax
              </span>
            </Link>
            <p style={{ fontSize: 12, lineHeight: 1.9, color: 'rgba(232,220,200,0.5)', maxWidth: 260 }}>
              Helping Texas homeowners build professional property tax protest packets — fast, affordable, DIY.
            </p>
          </div>
 
          {/* Links */}
          <div>
            <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,220,200,0.3)', marginBottom: 18 }}>Product</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[['#how', 'How It Works'], ['#pricing', 'Pricing'], ['/intake', 'Start Analysis']].map(([href, label]) => (
                href.startsWith('#')
                  ? <a key={href} href={href} style={{ fontSize: 12, letterSpacing: '0.06em', color: 'rgba(232,220,200,0.5)', textDecoration: 'none' }}>{label}</a>
                  : <Link key={href} to={href} style={{ fontSize: 12, letterSpacing: '0.06em', color: 'rgba(232,220,200,0.5)', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
          </div>
 
          {/* Deadline */}
          <div>
            <div style={{ border: '1.5px solid rgba(139,58,26,0.4)', padding: '20px', background: 'rgba(139,58,26,0.08)' }}>
              <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.rust, margin: '0 0 6px' }}>⚠ Protest deadline</p>
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: 30, fontWeight: 700, color: C.tan, lineHeight: 1, margin: '0 0 6px' }}>May 15, 2027</p>
              <p style={{ fontSize: 11, color: 'rgba(232,220,200,0.4)', lineHeight: 1.6, margin: '0 0 14px' }}>Or 30 days from your appraisal notice — whichever is later.</p>
              <Link to="/intake" style={{ fontFamily: "'Special Elite', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: C.rust, color: C.cream, padding: '8px 16px', textDecoration: 'none', display: 'inline-block' }}>
                Start now →
              </Link>
            </div>
          </div>
        </div>
 
        {/* Bottom */}
        <div className="footer-bottom" style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: 22, alignItems: 'center' }}>
          <p style={{ fontSize: 11, color: 'rgba(232,220,200,0.3)', letterSpacing: '0.04em', margin: 0 }}>
            © {new Date().getFullYear()} DontMessWithTax.com · All rights reserved.
          </p>
          <p style={{ fontSize: 11, color: 'rgba(232,220,200,0.22)', maxWidth: 420, lineHeight: 1.6, margin: 0 }}>
            For informational purposes only. Not legal or tax advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
 