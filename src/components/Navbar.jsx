import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useBreakpoint } from '../hooks/useBreakpoint'

const C = { cream: '#f5f0e8', tan: '#e8dcc8', rust: '#8b3a1a', brown: '#3d2008', faded: '#7a6548' }

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { isMobile, isTablet }    = useBreakpoint()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change / resize to desktop
  useEffect(() => { if (!isMobile && !isTablet) setMenuOpen(false) }, [isMobile, isTablet])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Caveat:wght@600;700&family=Libre+Baskerville:ital,wght@0,700;1,400&display=swap');
        .nav-link:hover  { color: #3d2008 !important; }
        .nav-cta:hover   { background: #8b3a1a !important; color: #f5f0e8 !important; }
        .hamburger       { background: none; border: none; cursor: pointer; padding: 4px; display: flex; flex-direction: column; gap: 5px; }
        .hamburger span  { display: block; width: 24px; height: 2px; background: #3d2008; transition: all 0.2s; transform-origin: center; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu { overflow: hidden; transition: max-height 0.3s ease, opacity 0.3s ease; }
        .mobile-menu.open  { max-height: 300px; opacity: 1; }
        .mobile-menu.closed { max-height: 0; opacity: 0; }
      `}</style>

      {/* Deadline bar — hide on smallest phones */}
      <div style={{ background: C.rust, padding: isMobile ? '8px 16px' : '9px 32px', display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'space-between', gap: 12 }}>
        {!isMobile && (
          <span style={{ fontFamily: "'Special Elite', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)' }}>
            ⚠ Protest deadline
          </span>
        )}
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 18 : 22, fontWeight: 700, color: C.cream }}>
          {isMobile ? '⚠ Protest deadline: May 15, 2026' : 'May 15, 2026'}
        </span>
        {!isMobile && (
          <span style={{ fontFamily: "'Special Elite', monospace", fontSize: 10, color: 'rgba(245,240,232,0.45)', letterSpacing: '0.05em' }}>
            Or 30 days from your notice — whichever is later
          </span>
        )}
      </div>

      {/* Main nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(245,240,232,0.97)' : C.cream,
        borderBottom: `2px solid ${C.brown}`,
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        transition: 'all 0.2s ease',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '12px 16px' : isTablet ? '13px 24px' : '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 24 : 30, fontWeight: 700, color: C.brown, letterSpacing: '-0.5px', lineHeight: 1 }}>
              Don't Mess<span style={{ color: C.rust, margin: '0 5px' }}>★</span>WithTax
            </span>
          </Link>

          {/* Desktop links */}
          {!isMobile && !isTablet && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              {[['#how', 'How It Works'], ['#pricing', 'Pricing']].map(([href, label]) => (
                <a key={href} href={href} className="nav-link" style={{ fontFamily: "'Special Elite', monospace", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.faded, textDecoration: 'none', transition: 'color 0.15s' }}>
                  {label}
                </a>
              ))}
              <Link to="/intake" className="nav-cta" style={{ fontFamily: "'Special Elite', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', border: `2px solid ${C.rust}`, color: C.rust, padding: '8px 20px', textDecoration: 'none', background: 'transparent', transition: 'all 0.15s', display: 'inline-block' }}>
                Start Free →
              </Link>
            </div>
          )}

          {/* Tablet — just CTA + hamburger */}
          {isTablet && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Link to="/intake" className="nav-cta" style={{ fontFamily: "'Special Elite', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', border: `2px solid ${C.rust}`, color: C.rust, padding: '7px 16px', textDecoration: 'none', background: 'transparent', transition: 'all 0.15s' }}>
                Start Free →
              </Link>
              <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
                <span /><span /><span />
              </button>
            </div>
          )}

          {/* Mobile — hamburger only */}
          {isMobile && (
            <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
              <span /><span /><span />
            </button>
          )}
        </div>

        {/* Mobile / tablet dropdown menu */}
        {(isMobile || isTablet) && (
          <div className={`mobile-menu ${menuOpen ? 'open' : 'closed'}`} style={{ borderTop: `1px dashed rgba(60,30,8,0.2)`, background: C.cream }}>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[['#how', 'How It Works'], ['#pricing', 'Pricing']].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Special Elite', monospace", fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.faded, textDecoration: 'none', padding: '14px 0', borderBottom: `1px dashed rgba(60,30,8,0.15)`, display: 'block' }}>
                  {label}
                </a>
              ))}
              <Link to="/intake" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Special Elite', monospace", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', background: C.rust, color: C.cream, padding: '14px 0', textDecoration: 'none', textAlign: 'center', marginTop: 12, display: 'block' }}>
                Start Free Analysis →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
