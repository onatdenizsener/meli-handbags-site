import { useEffect, useRef, useState } from 'react'

export const azHareket = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Bölüm ekrana girince bir kez "ic" sınıfı alır (Flix / BTO yöntemi).
export function useGorunur(esik = 0.2) {
  const ref = useRef(null)
  const [ic, setIc] = useState(false)
  useEffect(() => {
    if (azHareket() || !('IntersectionObserver' in window)) { setIc(true); return }
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIc(true); o.disconnect() } }, { threshold: esik })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [esik])
  return [ref, ic]
}

export function Rv({ as: Etiket = 'div', className = '', gecikme = 0, children, style, ...p }) {
  const [ref, ic] = useGorunur(0.15)
  return (
    <Etiket ref={ref} className={`rv ${ic ? 'ic' : ''} ${className}`} {...p} style={{ '--g': `${gecikme}ms`, ...style }}>
      {children}
    </Etiket>
  )
}

// Kaydırma ilerlemesi: öğe ekranın altına girince 0, üstünden çıkınca 1
export function useKaydirma() {
  const ref = useRef(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    if (azHareket()) return
    let k
    const hesapla = () => {
      k = null
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      const v = (innerHeight - r.top) / (innerHeight + r.height)
      setP(Math.max(0, Math.min(1, v)))
    }
    const dinle = () => { if (!k) k = requestAnimationFrame(hesapla) }
    hesapla()
    addEventListener('scroll', dinle, { passive: true })
    addEventListener('resize', dinle)
    return () => { removeEventListener('scroll', dinle); removeEventListener('resize', dinle); cancelAnimationFrame(k) }
  }, [])
  return [ref, p]
}

// Logodaki çiçek: 5 yuvarlak yaprak, ortası delik
export function Cicek({ renk = 'currentColor', orta = '#fff', className = '', boyut }) {
  return (
    <svg viewBox="-50 -50 100 100" className={`cicek ${className}`} width={boyut} height={boyut} aria-hidden="true">
      <g fill={renk}>
        {[0, 72, 144, 216, 288].map((a) => (
          <circle key={a} cx="0" cy="-25" r="22" transform={`rotate(${a})`} />
        ))}
        <circle r="24" />
      </g>
      <circle r="10" fill={orta} />
    </svg>
  )
}

// "meli" logosu: noktasız ı'nın üstünde bordo çiçek
export function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`} lang="en" aria-label="meli">
      <span className="logo-h" style={{ '--i': 0 }}>m</span>
      <span className="logo-h" style={{ '--i': 1 }}>e</span>
      <span className="logo-h" style={{ '--i': 2 }}>l</span>
      <span className="logo-h logo-i" style={{ '--i': 3 }}>
        ı<Cicek renk="#7d1846" orta="#fff5f8" className="logo-cicek" />
      </span>
    </span>
  )
}

// Çanta çizimi (özel sipariş önizlemesi): dalgalı gövde, büzgülü kese, örgü sap, çiçek süs
export function CantaCizim({ renk, olcek = 1 }) {
  return (
    <svg viewBox="0 0 220 220" className="canta-cizim" aria-hidden="true">
      <defs>
        <pattern id="kese" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#e8455f" />
          <circle cx="7" cy="7" r="4" fill="#ff9ab8" />
          <circle cx="0" cy="0" r="2.4" fill="#ffd27a" />
          <circle cx="14" cy="14" r="2.4" fill="#ffd27a" />
        </pattern>
        <linearGradient id="parlak" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".45" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".18" />
        </linearGradient>
      </defs>
      <g className="canta-g" style={{ transform: `scale(${olcek})` }}>
        <path className="canta-sap" d="M70 92 C 64 22, 156 22, 150 92" />
        <path d="M52 98 C 58 70, 78 84, 88 72 C 100 60, 118 82, 130 68 C 142 58, 160 76, 168 98 Z" fill="url(#kese)" />
        <path className="canta-govde" style={{ fill: renk }}
          d="M48 96 C 44 128, 34 156, 48 188 C 84 198, 138 198, 172 188 C 186 156, 176 128, 172 96 C 150 88, 132 104, 110 96 C 88 88, 70 104, 48 96 Z" />
        <path d="M48 96 C 44 128, 34 156, 48 188 C 84 198, 138 198, 172 188 C 186 156, 176 128, 172 96 C 150 88, 132 104, 110 96 C 88 88, 70 104, 48 96 Z" fill="url(#parlak)" />
        <path d="M70 130 C 86 120, 100 142, 116 130 M120 156 C 134 146, 150 164, 162 152" stroke="#fff" strokeOpacity=".35" strokeWidth="5" fill="none" strokeLinecap="round" />
        <text x="110" y="184" textAnchor="middle" className="canta-yazi">meli</text>
        <g transform="translate(178 132)">
          <circle r="7" fill="none" stroke="#c9ccd4" strokeWidth="3" cy="-14" />
          <g transform="scale(.26)">
            <g fill="#ff8a3d">
              {[0, 72, 144, 216, 288].map((a) => <circle key={a} cx="0" cy="-25" r="22" transform={`rotate(${a})`} />)}
              <circle r="24" />
            </g>
            <circle r="9" fill="#fff" />
          </g>
        </g>
      </g>
    </svg>
  )
}
