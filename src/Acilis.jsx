// Açılış: "meli" harfleri zıplayarak dizilir, ı'nın üstünde çiçek açar,
// sonra o çiçek büyüyüp ekranı pembeye boyar ve sayfayı açar.
// Oturum başına bir kez, ~2 sn. Tıklayınca/tuşa basınca geçilir. "Hareketi azalt" açıksa gösterilmez.
import { useEffect, useRef, useState } from 'react'
import { Logo, Cicek, azHareket } from './ortak.jsx'

const ANAHTAR = 'meli-acilis'
const goruldu = () => { try { return sessionStorage.getItem(ANAHTAR) === '1' } catch { return false } }

export default function Acilis() {
  const [durum, setDurum] = useState(() => (azHareket() || goruldu() ? 'yok' : 'kuruluyor'))
  const ref = useRef(null)

  useEffect(() => {
    const kok = document.documentElement
    if (durum === 'yok') { kok.classList.remove('acilis'); return }
    kok.classList.add('acilis')
    if (durum === 'kuruluyor') {
      const t = setTimeout(() => setDurum('aciliyor'), 1700)
      const gec = () => setDurum('aciliyor')
      addEventListener('keydown', gec, { once: true })
      return () => { clearTimeout(t); removeEventListener('keydown', gec) }
    }
    if (durum === 'aciliyor') {
      const c = ref.current?.querySelector('.logo-cicek')?.getBoundingClientRect()
      if (c) {
        ref.current.style.setProperty('--cx', `${c.left + c.width / 2}px`)
        ref.current.style.setProperty('--cy', `${c.top + c.height / 2}px`)
      }
      try { sessionStorage.setItem(ANAHTAR, '1') } catch {}
      const t = setTimeout(() => setDurum('yok'), 1100)
      return () => clearTimeout(t)
    }
  }, [durum])

  if (durum === 'yok') return null
  return (
    <div ref={ref} className={`acilis-ekran ${durum}`} onClick={() => setDurum('aciliyor')} aria-hidden="true">
      <Logo className="acilis-logo" />
      <div className="acilis-patlama"><Cicek renk="#ff5fa8" orta="#fff5f8" /></div>
    </div>
  )
}
