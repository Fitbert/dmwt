import { useState } from 'react'
import { Download, Home, AlertTriangle, TrendingDown, DollarSign, ChevronRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const propertyData = (() => {
    try { return JSON.parse(localStorage.getItem('propertyData')) || {} }
    catch { return {} }
  })()

  const [selectedTier, setSelectedTier] = useState(null)

  const countyValue = 425000
  const estimatedValue = 381000
  const valueDifference = countyValue - estimatedValue
  const annualSavings = 1140
  const confidenceScore = 87

  const comparableHomes = [
    { address: '123 Maple Dr',   sqft: 1950, value: 365000, year: 2004, bed: 3, bath: 2 },
    { address: '421 Oak Ridge',  sqft: 2010, value: 372000, year: 2006, bed: 3, bath: 2 },
    { address: '88 Cedar Ln',    sqft: 1875, value: 359000, year: 2003, bed: 3, bath: 2 },
    { address: '212 Bluebell St',sqft: 1990, value: 368000, year: 2005, bed: 3, bath: 2 },
    { address: '55 Mesquite Way', sqft: 2040, value: 378000, year: 2007, bed: 4, bath: 2 },
  ]

  const myPpsf = (countyValue / (propertyData?.sqft || 2020)).toFixed(0)
  const avgCompPpsf = (
    comparableHomes.reduce((s, h) => s + h.value / h.sqft, 0) / comparableHomes.length
  ).toFixed(0)

  const gold = '#c9873a'
  const navy = '#0f1a2e'

  return (
    <div className="min-h-screen" style={{ background: '#f5f3ef', fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      {/* Top bar */}
      <header style={{ background: navy, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span style={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, color: '#fff', fontSize: 18 }}>
              Don't Mess
            </span>
            <span style={{ background: gold, color: navy, fontFamily: '"Playfair Display", serif', fontWeight: 900, fontSize: 18, borderRadius: 6, padding: '1px 8px' }}>
              WithTax
            </span>
            <span style={{ color: gold, fontSize: 16 }}>★</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm" style={{ color: '#94a3b8' }}>
              <Home size={15} />
              <span>{propertyData?.address || '123 Longhorn Dr, Austin TX'}</span>
            </div>
            <button
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: gold, color: navy }}
            >
              <Download size={15} />
              Download Packet
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* ── HERO RESULT BANNER ── */}
        <div
          className="relative overflow-hidden rounded-2xl p-10 text-white"
          style={{ background: navy }}
        >
          {/* grid texture */}
          <div className="pointer-events-none absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(201,135,58,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(201,135,58,0.05) 1px,transparent 1px)`,
            backgroundSize: '48px 48px',
          }} />

          <div className="relative grid gap-8 lg:grid-cols-3">
            {/* Left: headline */}
            <div className="lg:col-span-2">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: 'rgba(201,135,58,0.15)', color: gold }}
              >
                <Star size={11} fill={gold} /> Analysis complete
              </span>
              <h1 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, fontSize: 44, lineHeight: 1.05, color: '#fff' }}>
                Your county is overcharging<br />
                <span style={{ color: gold }}>${valueDifference.toLocaleString()}</span> in taxes.
              </h1>
              <p className="mt-4 text-base" style={{ color: '#94a3b8', maxWidth: 520 }}>
                Based on {comparableHomes.length} comparable properties in your area, your assessed value is significantly above market. You have a strong case to protest.
              </p>
              <div className="mt-6 flex flex-wrap gap-6">
                {[
                  { label: 'County says', val: `$${countyValue.toLocaleString()}`, sub: 'Current assessment', color: '#f87171' },
                  { label: 'Evidence shows', val: `$${estimatedValue.toLocaleString()}`, sub: 'Based on comps', color: gold },
                  { label: 'Est. annual savings', val: `$${annualSavings.toLocaleString()}`, sub: 'If protest succeeds', color: '#34d399' },
                ].map(({ label, val, sub, color }) => (
                  <div key={label}>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#64748b' }}>{label}</p>
                    <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 28, fontWeight: 900, color, lineHeight: 1 }}>{val}</p>
                    <p className="text-xs mt-1" style={{ color: '#475569' }}>{sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: confidence meter */}
            <div
              className="flex flex-col items-center justify-center rounded-xl p-6 text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,135,58,0.2)' }}
            >
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#64748b' }}>Protest strength</p>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke={gold} strokeWidth="10"
                  strokeDasharray={`${(confidenceScore / 100) * 314} 314`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <text x="60" y="55" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900" fontFamily='"Playfair Display",serif'>{confidenceScore}</text>
                <text x="60" y="72" textAnchor="middle" fill="#94a3b8" fontSize="11">out of 100</text>
              </svg>
              <p className="mt-3 font-bold text-lg" style={{ color: gold }}>Strong Case</p>
              <p className="text-xs mt-1" style={{ color: '#64748b' }}>Your evidence supports a meaningful reduction</p>
            </div>
          </div>
        </div>

        {/* ── EQUITY ALERT ── */}
        <div
          className="mt-6 flex items-start gap-4 rounded-xl px-6 py-4"
          style={{ background: 'rgba(234,88,12,0.08)', border: '1px solid rgba(234,88,12,0.2)' }}
        >
          <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" style={{ color: '#ea580c' }} />
          <div>
            <p className="text-sm font-semibold" style={{ color: '#9a3412' }}>
              Unequal appraisal detected — you're being taxed at ${myPpsf}/sqft vs. your neighbors' ${avgCompPpsf}/sqft average.
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#c2410c' }}>
              Texas Tax Code §42.26 entitles you to protest on this basis alone. Both arguments are included in your packet.
            </p>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* LEFT: comps table + property summary */}
          <div className="space-y-6 lg:col-span-2">

            {/* Comps table */}
            <div className="rounded-2xl bg-white p-6" style={{ border: '1px solid #e8e2d9' }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, fontSize: 22, color: navy }}>
                    Comparable sales
                  </h2>
                  <p className="text-sm mt-0.5" style={{ color: '#64748b' }}>
                    Used to build your market value argument
                  </p>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{ background: 'rgba(201,135,58,0.1)', color: gold }}
                >
                  {comparableHomes.length} comps found
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid #f1ede7' }}>
                      {['Address', 'Sqft', '$/sqft', 'Value', 'Year'].map(h => (
                        <th key={h} className="pb-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparableHomes.map((h, i) => {
                      const ppsf = (h.value / h.sqft).toFixed(0)
                      const isLower = ppsf < myPpsf
                      return (
                        <tr key={i} style={{ borderBottom: '1px solid #f8f5f0' }}>
                          <td className="py-3.5 font-medium" style={{ color: navy }}>{h.address}</td>
                          <td style={{ color: '#475569' }}>{h.sqft.toLocaleString()}</td>
                          <td>
                            <span
                              className="rounded px-2 py-0.5 text-xs font-semibold"
                              style={isLower
                                ? { background: '#dcfce7', color: '#15803d' }
                                : { background: '#fee2e2', color: '#dc2626' }
                              }
                            >
                              ${ppsf}
                            </span>
                          </td>
                          <td className="font-semibold" style={{ color: '#15803d' }}>${h.value.toLocaleString()}</td>
                          <td style={{ color: '#94a3b8' }}>{h.year}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr style={{ borderTop: '2px solid #f1ede7' }}>
                      <td className="pt-3 text-xs font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }} colSpan={2}>Your property</td>
                      <td className="pt-3">
                        <span className="rounded px-2 py-0.5 text-xs font-bold" style={{ background: '#fee2e2', color: '#dc2626' }}>
                          ${myPpsf}
                        </span>
                      </td>
                      <td className="pt-3 font-bold" style={{ color: '#dc2626' }}>${countyValue.toLocaleString()}</td>
                      <td className="pt-3 text-xs" style={{ color: '#94a3b8' }}>County</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Property summary */}
            <div className="rounded-2xl bg-white p-6" style={{ border: '1px solid #e8e2d9' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, fontSize: 22, color: navy }}>
                Property record
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-y-5 md:grid-cols-4">
                {[
                  { label: 'County', value: propertyData?.county || 'Travis' },
                  { label: 'Square feet', value: propertyData?.sqft || '2,020' },
                  { label: 'Bedrooms', value: propertyData?.beds || '3' },
                  { label: 'Bathrooms', value: propertyData?.baths || '2' },
                  { label: 'Year built', value: propertyData?.yearBuilt || '2005' },
                  { label: 'Lot size', value: propertyData?.lotSize || 'N/A' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>{label}</p>
                    <p className="font-semibold text-base" style={{ color: navy }}>{value}</p>
                  </div>
                ))}
              </div>
              {propertyData?.condition && (
                <div className="mt-5 rounded-xl px-4 py-3 text-sm" style={{ background: '#f8f5f0', color: '#475569' }}>
                  <span className="font-semibold" style={{ color: navy }}>Condition notes: </span>
                  {propertyData.condition}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: packet purchase */}
          <div className="space-y-4">

            {/* Deadline pill */}
            <div
              className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ background: 'rgba(201,135,58,0.08)', border: '1px solid rgba(201,135,58,0.25)' }}
            >
              <TrendingDown size={16} style={{ color: gold }} />
              <div>
                <p className="text-xs font-bold" style={{ color: gold }}>Protest deadline: May 15</p>
                <p className="text-xs" style={{ color: '#92400e' }}>Or 30 days from your notice</p>
              </div>
            </div>

            {/* Tier cards */}
            {[
              {
                id: 'evidence',
                name: 'Evidence Packet',
                price: '$29',
                badge: null,
                desc: 'Complete PDF protest packet, ready to file.',
                items: [
                  'Cover page & property summary',
                  'One-page evidence summary',
                  'Comparable sales grid (5 comps)',
                  'Equity / uniformity analysis',
                  'Condition documentation guide',
                ],
              },
              {
                id: 'hearing',
                name: 'Hearing Prep',
                price: '$59',
                badge: 'Most popular',
                desc: 'Full packet + walkthrough for your ARB hearing.',
                items: [
                  'Everything in Evidence Packet',
                  'Opening statement script',
                  'Argument talking points',
                  'ARB objections & responses',
                  'Deadline & filing checklist',
                ],
              },
            ].map((tier) => {
              const active = selectedTier === tier.id
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className="w-full rounded-2xl p-5 text-left transition-all"
                  style={{
                    background: active ? navy : '#fff',
                    border: active ? `2px solid ${gold}` : '1px solid #e8e2d9',
                  }}
                >
                  {tier.badge && (
                    <span
                      className="mb-3 inline-block rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider"
                      style={{ background: 'rgba(201,135,58,0.15)', color: gold }}
                    >
                      {tier.badge}
                    </span>
                  )}
                  <div className="flex items-baseline justify-between">
                    <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: 17, color: active ? '#fff' : navy }}>
                      {tier.name}
                    </p>
                    <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, fontSize: 22, color: gold }}>
                      {tier.price}
                    </p>
                  </div>
                  <p className="text-xs mt-1 mb-3" style={{ color: active ? '#94a3b8' : '#64748b' }}>{tier.desc}</p>
                  <ul className="space-y-1.5">
                    {tier.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs" style={{ color: active ? '#cbd5e0' : '#475569' }}>
                        <span style={{ color: gold, lineHeight: '18px' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </button>
              )
            })}

            <button
              disabled={!selectedTier}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold transition-all"
              style={selectedTier
                ? { background: gold, color: navy, cursor: 'pointer' }
                : { background: '#e2ddd7', color: '#94a3b8', cursor: 'not-allowed' }
              }
            >
              <Download size={16} />
              {selectedTier ? `Get ${selectedTier === 'evidence' ? 'Evidence Packet' : 'Hearing Prep'} →` : 'Select a packet above'}
            </button>

            <p className="text-center text-xs" style={{ color: '#94a3b8' }}>
              One-time fee · Instant PDF download
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="mt-8 rounded-xl px-6 py-4 text-xs leading-relaxed"
          style={{ background: '#fff', border: '1px solid #e8e2d9', color: '#94a3b8' }}
        >
          For informational purposes only. Not legal, tax, or appraisal advice.
          Values and savings estimates are based on publicly available records and
          user-submitted information. Results vary by county and property. Always
          verify deadlines with your local appraisal district.
        </div>
      </div>
    </div>
  )
}
