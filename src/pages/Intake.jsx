// src/pages/Intake.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useBreakpoint } from '../hooks/useBreakpoint'

const C = { cream: '#f5f0e8', tan: '#e8dcc8', rust: '#8b3a1a', brown: '#3d2008', ink: '#1c1008', faded: '#7a6548' }

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

const TX_COUNTIES = ['Travis','Harris','Dallas','Bexar','Tarrant','Collin','Denton','Fort Bend','Montgomery','Williamson','El Paso','Hidalgo','Galveston','Nueces','Bell','Jefferson','Brazoria','McLennan','Webb','Hays','Smith','Lubbock','Cameron','Parker','Comal','Brazos','Midland','Ector','Randall','Tom Green']

const STEPS = [
  { id: 'property',  label: 'Property',  icon: '⌂' },
  { id: 'details',   label: 'Details',   icon: '≡' },
  { id: 'condition', label: 'Condition', icon: '✎' },
]

export default function Intake() {
  const navigate = useNavigate()
  const { isMobile, isTablet } = useBreakpoint()
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'

  const [step,    setStep]    = useState(0)
  const [loading, setLoading] = useState(false)
  const [form,    setForm]    = useState({
    address: '', county: '', appraisedValue: '',
    sqft: '', beds: '', baths: '', yearBuilt: '', lotSize: '', garage: '',
    extras: [], conditionGrade: '', issues: [], condition: '',
    uploadedNotice: null,
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const canNext = () => {
    if (step === 0) return form.address && form.county && form.appraisedValue
    if (step === 1) return form.sqft && form.beds && form.baths && form.yearBuilt
    return true
  }


const handleSubmit = async () => {
  setLoading(true)

  try {
    await fetch(`${BACKEND_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        property: form,
        comps: [],
        tier: 'evidence',
      }),
    })

    navigate('/thank-you')
  } catch (err) {
    console.error(err)
    navigate('/thank-you')
  } finally {
    setLoading(false)
  }
}

  const inputStyle = (val) => ({
    width: '100%', fontFamily: "'Special Elite', monospace", fontSize: 13,
    padding: '11px 14px', background: '#fffef9', color: C.ink,
    border: `1.5px solid ${val ? C.rust : 'rgba(60,30,8,0.2)'}`,
    outline: 'none', transition: 'border-color 0.15s',
  })

  const labelStyle = {
    display: 'block', fontFamily: "'Special Elite', monospace",
    fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
    color: C.faded, marginBottom: 7,
  }

  return (
    <div style={{ minHeight: '100vh', background: C.cream, fontFamily: "'Special Elite', monospace", position: 'relative', overflow: 'hidden' }}>
      {/* Star watermark */}
      <div style={{ position: 'fixed', right: '-10%', top: '50%', transform: 'translateY(-50%)', fontSize: 600, color: C.rust, opacity: 0.03, pointerEvents: 'none', userSelect: 'none' }}>★</div>

      {/* Paper texture */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(60,30,8,0.03) 27px,rgba(60,30,8,0.03) 28px)` }} />

      {/* Nav */}
      <header style={{ background: C.brown, borderBottom: '2px solid #1c1008', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: `14px ${px}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 22 : 28, fontWeight: 700, color: C.tan }}>
              Don't Mess<span style={{ color: C.rust, margin: '0 5px' }}>★</span>WithTax
            </span>
          </Link>
          <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,220,200,0.4)' }}>
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
      </header>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: `48px ${px} 80px`, position: 'relative', zIndex: 1 }}>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 36 }}>
          {STEPS.map(({ label, icon }, i) => {
            const done   = i < step
            const active = i === step
            return (
              <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <div style={{
                    width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${done || active ? C.rust : 'rgba(60,30,8,0.2)'}`,
                    background: done ? C.rust : active ? 'transparent' : 'transparent',
                    fontFamily: "'Special Elite', monospace", fontSize: 13,
                    color: done ? C.cream : active ? C.rust : 'rgba(60,30,8,0.3)',
                    transition: 'all 0.2s',
                  }}>
                    {done ? '✓' : icon}
                  </div>
                  {!isMobile && (
                    <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: active ? C.brown : done ? C.rust : 'rgba(60,30,8,0.35)', fontWeight: active ? 600 : 400 }}>
                      {label}
                    </span>
                  )}
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 1, margin: '0 12px', borderTop: `1px dashed ${done ? C.rust : 'rgba(60,30,8,0.2)'}`, transition: 'border-color 0.2s' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Card */}
        <div style={{ background: '#fffef9', border: '1.5px solid rgba(60,30,8,0.2)', padding: isMobile ? '28px 20px' : '40px 36px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 4, border: '0.5px solid rgba(60,30,8,0.06)', pointerEvents: 'none' }} />

          {/* STEP 0 */}
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: C.brown, margin: '0 0 6px' }}>Tell us about your property</h2>
              <p style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', fontSize: 13, color: C.faded, margin: '0 0 28px' }}>
                Enter your address or upload your appraisal notice.
              </p>

              {/* Upload notice */}
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, border: '2px dashed rgba(139,58,26,0.3)', padding: '24px', cursor: 'pointer', marginBottom: 24, background: 'rgba(139,58,26,0.02)', transition: 'background 0.15s' }}>
                <span style={{ fontSize: 24 }}>📄</span>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Special Elite', monospace", fontSize: 12, color: C.brown, margin: '0 0 4px' }}>Upload appraisal notice <span style={{ color: C.faded }}>(optional)</span></p>
                  <p style={{ fontSize: 11, color: C.faded }}>PDF or image · We'll extract your values automatically</p>
                </div>
                {form.uploadedNotice && <span style={{ fontSize: 11, color: C.rust }}>✓ {form.uploadedNotice.name}</span>}
                <input type="file" accept=".pdf,image/*" style={{ display: 'none' }} onChange={e => set('uploadedNotice', e.target.files[0])} />
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={labelStyle}>Property address *</label>
                  <input type="text" placeholder="123 Longhorn Dr, Austin TX 78701" value={form.address} onChange={e => set('address', e.target.value)} style={inputStyle(form.address)} onFocus={e => e.target.style.borderColor = C.rust} onBlur={e => e.target.style.borderColor = form.address ? C.rust : 'rgba(60,30,8,0.2)'} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18 }}>
                  <div>
                    <label style={labelStyle}>County *</label>
                    <select value={form.county} onChange={e => set('county', e.target.value)} style={{ ...inputStyle(form.county), appearance: 'none' }}>
                      <option value="">Select county</option>
                      {TX_COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>County appraised value *</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontFamily: "'Special Elite', monospace", fontSize: 13, color: C.faded }}>$</span>
                      <input type="number" placeholder="425,000" value={form.appraisedValue} onChange={e => set('appraisedValue', e.target.value)} style={{ ...inputStyle(form.appraisedValue), paddingLeft: 28 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: C.brown, margin: '0 0 6px' }}>Property details</h2>
              <p style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', fontSize: 13, color: C.faded, margin: '0 0 28px' }}>
                These help us find the most accurate comparable properties.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3,1fr)', gap: 16 }}>
                {[
                  { key: 'sqft',      label: 'Square footage *', placeholder: '2,020' },
                  { key: 'yearBuilt', label: 'Year built *',     placeholder: '2005'  },
                  { key: 'beds',      label: 'Bedrooms *',       placeholder: '3'     },
                  { key: 'baths',     label: 'Bathrooms *',      placeholder: '2'     },
                  { key: 'lotSize',   label: 'Lot size (sqft)',  placeholder: '8,500' },
                  { key: 'garage',    label: 'Garage spaces',    placeholder: '2'     },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <input type="number" placeholder={placeholder} value={form[key] || ''} onChange={e => set(key, e.target.value)} style={inputStyle(form[key])} onFocus={e => e.target.style.borderColor = C.rust} onBlur={e => e.target.style.borderColor = form[key] ? C.rust : 'rgba(60,30,8,0.2)'} />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 22 }}>
                <label style={labelStyle}>Property features</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Homestead exemption', 'Pool', 'HOA community', 'New construction'].map(opt => (
                    <button key={opt} onClick={() => { const e = form.extras || []; set('extras', e.includes(opt) ? e.filter(x => x !== opt) : [...e, opt]) }}
                      style={{ fontFamily: "'Special Elite', monospace", fontSize: 11, letterSpacing: '0.06em', border: `1.5px solid ${(form.extras || []).includes(opt) ? C.rust : 'rgba(60,30,8,0.2)'}`, color: (form.extras || []).includes(opt) ? C.rust : C.faded, padding: '6px 14px', background: (form.extras || []).includes(opt) ? 'rgba(139,58,26,0.06)' : 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: C.brown, margin: '0 0 6px' }}>Condition & defects</h2>
              <p style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', fontSize: 13, color: C.faded, margin: '0 0 28px' }}>
                Any issues that affect value become evidence in your packet.
              </p>

              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>Overall condition</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                  {['Poor','Fair','Average','Good'].map(g => (
                    <button key={g} onClick={() => set('conditionGrade', g)}
                      style={{ fontFamily: "'Special Elite', monospace", fontSize: 12, letterSpacing: '0.06em', border: `2px solid ${form.conditionGrade === g ? C.rust : 'rgba(60,30,8,0.2)'}`, color: form.conditionGrade === g ? C.cream : C.faded, padding: '10px 4px', background: form.conditionGrade === g ? C.rust : 'transparent', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center' }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>Known issues</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Foundation issues','Roof damage','HVAC needs replacement','Water damage','Outdated electrical','Plumbing issues','No central air','Deferred maintenance','Flood zone'].map(issue => (
                    <button key={issue} onClick={() => { const is = form.issues || []; set('issues', is.includes(issue) ? is.filter(x => x !== issue) : [...is, issue]) }}
                      style={{ fontFamily: "'Special Elite', monospace", fontSize: 11, letterSpacing: '0.04em', border: `1.5px solid ${(form.issues || []).includes(issue) ? C.rust : 'rgba(60,30,8,0.2)'}`, color: (form.issues || []).includes(issue) ? C.rust : C.faded, padding: '6px 12px', background: (form.issues || []).includes(issue) ? 'rgba(139,58,26,0.06)' : 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}>
                      {issue}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>Additional notes</label>
                <textarea rows={4} placeholder="Describe any condition issues, recent repairs, or factors affecting value..." value={form.condition} onChange={e => set('condition', e.target.value)}
                  style={{ ...inputStyle(form.condition), resize: 'vertical', lineHeight: 1.7 }}
                  onFocus={e => e.target.style.borderColor = C.rust} onBlur={e => e.target.style.borderColor = 'rgba(60,30,8,0.2)'} />
              </div>

              {/* Packet preview */}
              <div style={{ background: 'rgba(139,58,26,0.05)', border: '1px dashed rgba(139,58,26,0.25)', padding: '16px' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.rust, marginBottom: 10 }}>Your packet will include</p>
                {['5 comparable sales from your area', 'Equity / uniformity analysis ($/sqft vs. neighbors)', 'One-page ARB evidence summary', 'Filing checklist & deadline reminder',
                  ...(form.conditionGrade && form.conditionGrade !== 'Good' ? ['Condition evidence section'] : []),
                  ...((form.issues || []).length > 0 ? ['Property defect documentation'] : []),
                ].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: C.faded, marginBottom: 6 }}>
                    <span style={{ color: C.rust }}>✓</span>{item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
              style={{ fontFamily: "'Special Elite', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1.5px solid rgba(60,30,8,0.2)', color: C.faded, padding: '10px 22px', background: 'transparent', cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1, transition: 'all 0.15s' }}>
              ← Back
            </button>

            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canNext()}
                style={{ fontFamily: "'Special Elite', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', border: `2px solid ${canNext() ? C.rust : 'rgba(60,30,8,0.2)'}`, color: canNext() ? C.cream : 'rgba(60,30,8,0.3)', padding: '10px 28px', background: canNext() ? C.rust : 'transparent', cursor: canNext() ? 'pointer' : 'not-allowed', transition: 'all 0.15s' }}>
                Continue →
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading}
                style={{ fontFamily: "'Special Elite', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', border: `2px solid ${C.brown}`, color: C.cream, padding: '10px 28px', background: C.brown, cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.15s' }}>
                {loading ? 'Submitting...' : 'Submit My Property →'}
              </button>
            )}
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(60,30,8,0.35)', marginTop: 16 }}>
          Your data is used only to generate your protest packet and is never sold.
        </p>
      </div>
    </div>
  )
}