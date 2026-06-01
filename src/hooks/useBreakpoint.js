// src/hooks/useBreakpoint.js
// Drop this in src/hooks/ and import wherever you need responsive logic in JS

import { useState, useEffect } from 'react'

export function useBreakpoint() {
  const [bp, setBp] = useState(() => getBreakpoint(window.innerWidth))

  useEffect(() => {
    const handler = () => setBp(getBreakpoint(window.innerWidth))
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    isMobile:  bp === 'mobile',   // < 640px
    isTablet:  bp === 'tablet',   // 640–1023px
    isDesktop: bp === 'desktop',  // 1024px+
    bp,
  }
}

function getBreakpoint(w) {
  if (w < 640)  return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}
