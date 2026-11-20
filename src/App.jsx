import { useEffect, useMemo, useState } from 'react'
import Lenis from 'lenis'
import Acilis from './Acilis.jsx'
import { Rv, Logo, Cicek, CantaCizim, useGorunur, useKaydirma, azHareket } from './ortak.jsx'
import { MARKA, RENKLER, URUNLER, ANATOMI, GALERI, TL, foto } from './data.js'

const renkBul = (id) => RENKLER.find((r) => r.id === id)

function useYumusakKaydirma() {
  useEffect(() => {
    if (azHareket()) return
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 })
    window.__lenis = lenis
    let k
    const d = (t) => { lenis.raf(t); k = requestAnimationFrame(d) }
    k = requestAnimationFrame(d)
    return () => { cancelAnimationFrame(k); lenis.destroy(); window.__lenis = null }
  }, [])
}

const git = (e, id) => {
  e.preventDefault()
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/* ---------------- Üst menü ---------------- */
function Ust() {
  const [acik, setAcik] = useState(false)
  const [kaydi, setKaydi] = useState(false)
  useEffect(() => {
    const f = () => setKaydi(scrollY > 30)
    f(); addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  const menu = [['koleksiyon', 'Koleksiyon'], ['renkler', 'Renkler'], ['nakisli', 'Nakışlı'], ['ozel', 'Özel sipariş'], ['iletisim', 'İletişim']]
  return (
    <header className={`ust ${kaydi ? 'kaydi' : ''} ${acik ? 'acik' : ''}`}>
      <div className="kap ust-ic">
        <a href="#ust" className="ust-logo" onClick={(e) => git(e, 'ust')}><Logo /></a>
        <nav className="menu" aria-label="Ana menü">
          {menu.map(([id, ad]) => <a key={id} href={`#${id}`} onClick={(e) => { git(e, id); setAcik(false) }}>{ad}</a>)}
        </nav>
        <a className="dugme dugme-dolu ust-al" href={MARKA.magaza} target="_blank" rel="noopener">Mağazaya git</a>
        <button className="menu-dugme" aria-label="Menüyü aç" aria-expanded={acik} onClick={() => setAcik(!acik)}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}

/* ---------------- Giriş ---------------- */
function Giris() {
  const [s, setS] = useState(0)
  const sira = ['violet', 'pink', 'tangerine', 'azure', 'ash']
  const fotolar = { violet: 'violet-3', pink: 'pink-2', tangerine: 'tangerine-1', azure: 'azure-1', ash: 'ash-2' }
  useEffect(() => {
    if (azHareket()) return
    const t = setInterval(() => setS((x) => (x + 1) % sira.length), 3200)
    return () => clearInterval(t)
  }, [])
  const r = renkBul(sira[s])
  return (
    <section id="ust" className="giris" style={{ '--r': r.renk, '--ra': r.acik, '--rk': r.koyu }}>
      <div className="giris-zemin" aria-hidden="true">
        {[...Array(9)].map((_, i) => (
          <span key={i} className="ucan" style={{ '--x': `${(i * 37) % 100}%`, '--d': `${14 + (i % 4) * 4}s`, '--g': `${-i * 2.3}s`, '--b': `${22 + (i % 3) * 18}px` }}>
            <Cicek renk="#fff" orta="var(--ra)" />
          </span>
        ))}
      </div>
      <div className="kap giris-ic">
        <div className="giris-yazi">
          <p className="ust-etiket rv-yuk" style={{ '--g': '0ms' }}><Cicek boyut={16} renk="var(--rk)" orta="var(--ra)" /> {MARKA.slogan}</p>
          <h1 className="rv-yuk" style={{ '--g': '80ms' }}>
            Her renk<br />bir <em>çiçek</em>.
          </h1>
          <p className="giris-alt rv-yuk" style={{ '--g': '160ms' }}>
            Dalgalı gövdesi, büzgülü kumaş kesesi ve örgü sapıyla meli; plajda, şehirde, düğünde aynı neşeyle taşınır.
            {' '}{MARKA.ozel}
          </p>
          <div className="giris-dugmeler rv-yuk" style={{ '--g': '240ms' }}>
            <a className="dugme dugme-dolu" href="#koleksiyon" onClick={(e) => git(e, 'koleksiyon')}>Koleksiyonu gör</a>
            <a className="dugme dugme-cizgi" href="#ozel" onClick={(e) => git(e, 'ozel')}>Kendi rengini seç</a>
          </div>
          <ul className="giris-rozet rv-yuk" style={{ '--g': '320ms' }}>
            <li>Ücretsiz kargo</li><li>Shopier ile güvenli ödeme</li><li>İsteğe göre boy ve renk</li>
          </ul>
        </div>
        <div className="giris-sahne">
          <div className="blob">
            {sira.map((id, i) => (
              <img key={id} src={foto(fotolar[id])} alt={`${renkBul(id).ad} meli çanta`} className={i === s ? 'aktif' : ''} loading={i ? 'lazy' : 'eager'} />
            ))}
          </div>
          <div className="giris-renk" aria-live="polite">
            <span className="nokta" /> <b>{r.ad}</b>
          </div>
          <div className="giris-noktalar">
            {sira.map((id, i) => (
              <button key={id} aria-label={renkBul(id).ad} className={i === s ? 'aktif' : ''} style={{ '--c': renkBul(id).renk }} onClick={() => setS(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Kayan bant ---------------- */
function Bant() {
  const kelime = ['Violet', 'Fashion Pink', 'Tangerine', 'Azure', 'Ash', 'Nakışlı']
  const satir = (
    <span className="bant-satir">
      {kelime.map((k) => <span key={k} lang="en">{k}<Cicek boyut={26} renk="#fff" orta="var(--pembe)" /></span>)}
    </span>
  )
  return <div className="bant" aria-hidden="true"><div className="bant-ic">{satir}{satir}</div></div>
}

/* ---------------- Renk seçici ---------------- */
function Renkler() {
  const [sec, setSec] = useState('violet')
  const [onceki, setOnceki] = useState(null)
  const r = renkBul(sec)
  const urun = URUNLER.find((u) => u.id === sec)
  const degistir = (id) => { if (id === sec) return; setOnceki(sec); setSec(id) }
  return (
    <section id="renkler" className="renkler" style={{ '--r': r.renk, '--ra': r.acik, '--rk': r.koyu }}>
      <div className="kap renkler-ic">
        <div className="renkler-yazi">
          <Rv as="p" className="ust-etiket">Renk kartelası</Rv>
          <Rv as="h2" gecikme={60}>Rengini seç,<br />çantan açsın.</Rv>
          <Rv className="secici" gecikme={120} role="radiogroup" aria-label="Renk">
            {RENKLER.map((x) => (
              <button key={x.id} role="radio" aria-checked={x.id === sec} className={x.id === sec ? 'aktif' : ''} onClick={() => degistir(x.id)} style={{ '--c': x.renk }}>
                <Cicek renk={x.renk} orta="#fff" /><span lang="en">{x.ad}</span>
              </button>
            ))}
          </Rv>
          <div className="renk-bilgi" key={sec}>
            <h3 lang="en">{r.ad}</h3>
            <p>{r.not}</p>
            <p className="renk-fiyat"><span>{urun.boy}</span> <b>{TL(urun.fiyat)}</b></p>
            <a className="dugme dugme-renk" href={urun.link} target="_blank" rel="noopener">Shopier'de satın al</a>
            <p className="kucuk">Başka boy mu istiyorsun? <a href="#ozel" onClick={(e) => git(e, 'ozel')}>Özel sipariş ver</a>.</p>
          </div>
        </div>
        <div className="renkler-foto">
          {onceki && <img key={'o' + onceki} src={foto(URUNLER.find((u) => u.id === onceki).foto[0])} alt="" className="alt-katman" />}
          <img key={sec} src={foto(urun.foto[0])} alt={urun.ad} className="ust-katman" />
          <span className="renkler-damga" lang="en">{r.ad}</span>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Koleksiyon ---------------- */
function Kart({ u, i }) {
  const r = renkBul(u.renk)
  return (
    <Rv as="article" className="kart" gecikme={(i % 3) * 90} style={{ '--c': r.renk, '--ca': r.acik }}>
      <a href={u.link} target="_blank" rel="noopener" className="kart-foto">
        <img src={foto(u.foto[0])} alt={u.ad} loading="lazy" />
        <img src={foto(u.foto[1])} alt="" loading="lazy" className="ikinci" />
        <span className="kart-kargo">Ücretsiz kargo</span>
      </a>
      <div className="kart-alt">
        <div>
          <h3>{u.ad}</h3>
          <p>{u.boy}</p>
        </div>
        <b>{TL(u.fiyat)}</b>
      </div>
      <a href={u.link} target="_blank" rel="noopener" className="kart-al">Satın al <span aria-hidden="true">→</span></a>
    </Rv>
  )
}

function Koleksiyon() {
  return (
    <section id="koleksiyon" className="bolum koleksiyon">
      <div className="kap">
        <div className="bolum-bas">
          <Rv as="p" className="ust-etiket">Koleksiyon · {URUNLER.length} çanta</Rv>
          <Rv as="h2" gecikme={60}>Küçük boy, büyük boy,<br />hepsi çiçekli.</Rv>
          <Rv as="p" gecikme={120} className="bolum-aciklama">Bütün çantalar ücretsiz kargoyla gelir. Ödeme Shopier üzerinden güvenle yapılır.</Rv>
        </div>
        <div className="kartlar">{URUNLER.map((u, i) => <Kart key={u.id} u={u} i={i} />)}</div>
      </div>
    </section>
  )
}

/* ---------------- Anatomi ---------------- */
function Anatomi() {
  const [ref, ic] = useGorunur(0.35)
  const [aktif, setAktif] = useState(null)
  return (
    <section className="bolum anatomi">
      <div className="kap anatomi-ic">
        <div className="anatomi-yazi">
          <Rv as="p" className="ust-etiket">Yakından bak</Rv>
          <Rv as="h2" gecikme={60}>Bir meli'nin anatomisi</Rv>
          <ol className="anatomi-liste">
            {ANATOMI.map((a, i) => (
              <Rv as="li" key={a.baslik} gecikme={120 + i * 70} onMouseEnter={() => setAktif(i)} onMouseLeave={() => setAktif(null)} className={aktif === i ? 'aktif' : ''}>
                <span className="no">{i + 1}</span>
                <div><b>{a.baslik}</b><span>{a.metin}</span></div>
              </Rv>
            ))}
          </ol>
        </div>
        <div ref={ref} className={`anatomi-foto ${ic ? 'ic' : ''}`}>
          <img src={foto('tangerine-2')} alt="Kayısı ağacına asılı Tangerine meli çanta" loading="lazy" />
          {ANATOMI.map((a, i) => (
            <button key={a.baslik} className={`isaret ${aktif === i ? 'aktif' : ''}`} style={{ left: `${a.x}%`, top: `${a.y}%`, '--g': `${400 + i * 160}ms` }}
              onMouseEnter={() => setAktif(i)} onMouseLeave={() => setAktif(null)} onFocus={() => setAktif(i)} onBlur={() => setAktif(null)} aria-label={a.baslik}>
              <span>{i + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Nakışlı: piksel çiçek ---------------- */
const N = 15
const PIKSEL = (() => {
  const c = (N - 1) / 2, h = []
  const yap = [[c, c - 3.6], [c, c + 3.6], [c - 3.6, c], [c + 3.6, c]]
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const yaprak = yap.some(([px, py]) => Math.hypot(x - px, y - py) < 2.9)
    const orta = Math.hypot(x - c, y - c) < 1.2
    const kose = [[1, 1], [N - 2, 1], [1, N - 2], [N - 2, N - 2]].some(([px, py]) => Math.abs(x - px) + Math.abs(y - py) < 2)
    h.push({ dolu: (yaprak && !orta) || kose, u: Math.hypot(x - c, y - c) })
  }
  return h
})()

function Nakisli() {
  const [ref, ic] = useGorunur(0.3)
  const [kRef, p] = useKaydirma()
  const u = URUNLER.find((x) => x.id === 'nakisli')
  return (
    <section id="nakisli" className="nakisli" ref={kRef}>
      <div className="kap nakisli-ic">
        <div ref={ref} className={`piksel ${ic ? 'ic' : ''}`} style={{ '--n': N }} aria-hidden="true">
          {PIKSEL.map((d, i) => <span key={i} className={d.dolu ? 'dolu' : ''} style={{ '--g': `${d.u * 70}ms` }} />)}
        </div>
        <div className="nakisli-yazi">
          <Rv as="p" className="ust-etiket">Yeni · Nakışlı Meli</Rv>
          <Rv as="h2" gecikme={60}>Gövdesine işlenmiş çiçekler.</Rv>
          <Rv as="p" gecikme={120}>Nakışlı Meli'nin yüzeyi küçük kare deliklerden oluşan çiçek desenleriyle kaplı. Işık içinden geçer, desenli iç kese delikli yüzeyin ardından görünür. Siyah, pembe, sarı-turuncu ve mavi tonlarıyla küçük boy.</Rv>
          <Rv className="nakisli-al" gecikme={180}>
            <b>{TL(u.fiyat)}</b>
            <a className="dugme dugme-dolu" href={u.link} target="_blank" rel="noopener">Nakışlı Meli'yi al</a>
          </Rv>
        </div>
        <div className="nakisli-fotolar" style={{ '--p': p }}>
          <img src={foto('nakis-1')} alt="Merdivende beş renkli Nakışlı Meli" loading="lazy" className="nf1" />
          <img src={foto('nakis-2')} alt="Nakışlı Meli'nin delikli çiçek deseni yakından" loading="lazy" className="nf2" />
        </div>
      </div>
    </section>
  )
}

/* ---------------- Özel sipariş ---------------- */
const BOYLAR = [
  { id: 'kucuk', ad: 'Küçük boy', olcek: 0.8, fiyat: 'Hazır modeller 4.250 TL' },
  { id: 'buyuk', ad: 'Büyük boy', olcek: 0.95, fiyat: 'Hazır modeller 4.850 TL' },
  { id: 'ozel', ad: 'İstediğin ölçü', olcek: 1.08, fiyat: 'Fiyatı ölçüye göre konuşuyoruz' },
]

function Ozel() {
  const [boy, setBoy] = useState('buyuk')
  const [renk, setRenk] = useState('pink')
  const [not, setNot] = useState('')
  const b = BOYLAR.find((x) => x.id === boy)
  const r = renkBul(renk)
  const mail = useMemo(() => {
    const konu = `Özel sipariş: ${r.ad} / ${b.ad}`
    const govde = `Merhaba meli,\n\nŞöyle bir çanta istiyorum:\n- Renk: ${r.ad}\n- Boy: ${b.ad}\n${not ? `- Not: ${not}\n` : ''}\nAd soyad:\nTelefon:\n`
    return `mailto:${MARKA.eposta}?subject=${encodeURIComponent(konu)}&body=${encodeURIComponent(govde)}`
  }, [r, b, not])
  return (
    <section id="ozel" className="bolum ozel" style={{ '--r': r.renk, '--ra': r.acik, '--rk': r.koyu }}>
      <div className="kap ozel-ic">
        <div className="ozel-sahne">
          <div className={`ozel-cizim boy-${boy}`}><CantaCizim renk={r.renk} olcek={b.olcek} /></div>
          {boy === 'ozel' && <span className="olcu-cizgi" aria-hidden="true">? cm</span>}
          <div className="ozel-etiket"><b lang="en">{r.ad}</b> · {b.ad}</div>
        </div>
        <div className="ozel-yazi">
          <Rv as="p" className="ust-etiket">Özel sipariş</Rv>
          <Rv as="h2" gecikme={60}>Senin boyun, senin rengin.</Rv>
          <Rv as="p" gecikme={120}>{MARKA.ozel} Seçimini yap, e-postan hazır gelsin. Gerisini birlikte konuşalım.</Rv>
          <div className="adim">
            <span className="adim-no">1</span>
            <div><b>Boy</b>
              <div className="cipler">
                {BOYLAR.map((x) => <button key={x.id} className={x.id === boy ? 'aktif' : ''} aria-pressed={x.id === boy} onClick={() => setBoy(x.id)}>{x.ad}</button>)}
              </div>
              <small>{b.fiyat}</small>
            </div>
          </div>
          <div className="adim">
            <span className="adim-no">2</span>
            <div><b>Renk</b>
              <div className="cipler renk-cip">
                {RENKLER.map((x) => (
                  <button key={x.id} className={x.id === renk ? 'aktif' : ''} aria-pressed={x.id === renk} onClick={() => setRenk(x.id)} style={{ '--c': x.renk }}>
                    <i /> <span lang="en">{x.ad}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="adim">
            <span className="adim-no">3</span>
            <div><b>Notun</b>
              <textarea rows="2" placeholder="Örn. nedime çantası, 6 adet, düğün tarihi…" value={not} onChange={(e) => setNot(e.target.value)} />
            </div>
          </div>
          <a className="dugme dugme-renk" href={mail}>E-postayı hazırla</a>
          <p className="kucuk">E-posta uygulaman açılır, bilgiler hazır yazılı gelir: <a href={`mailto:${MARKA.eposta}`}>{MARKA.eposta}</a></p>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Galeri ---------------- */
function Galeri() {
  const [ref, p] = useKaydirma()
  return (
    <section className="galeri" ref={ref} aria-label="Galeri">
      <div className="kap">
        <Rv as="h2" className="galeri-baslik">Güneşte, denizde,<br />şehirde.</Rv>
      </div>
      <div className="galeri-serit" style={{ transform: `translateX(${-p * 38}%)` }}>
        {GALERI.map((g, i) => (
          <figure key={g} className={`gf gf-${i % 3}`}><img src={foto(g)} alt="" loading="lazy" /></figure>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Alt bilgi ---------------- */
function Alt() {
  return (
    <footer id="iletisim" className="alt">
      <div className="kap">
        <div className="alt-ust">
          <Rv as="h2">Sorun mu var,<br />fikrin mi var? <em>Yaz.</em></Rv>
          <Rv gecikme={80} className="alt-iletisim">
            <a className="alt-eposta" href={`mailto:${MARKA.eposta}`}>{MARKA.eposta}</a>
            <a className="dugme dugme-beyaz" href={MARKA.magaza} target="_blank" rel="noopener">Shopier mağazası</a>
          </Rv>
        </div>
        <div className="alt-guven">
          <div><Cicek boyut={34} renk="var(--pembe)" orta="var(--murdum)" /><b>Ücretsiz kargo</b><span>Mağazadaki bütün ürünler ücretsiz kargoyla gönderilir.</span></div>
          <div><Cicek boyut={34} renk="#ff8a3d" orta="var(--murdum)" /><b>Güvenli ödeme</b><span>Ödemeler Shopier altyapısıyla alınır, sipariş takibi Shopier'den yapılır.</span></div>
          <div><Cicek boyut={34} renk="#7a5cff" orta="var(--murdum)" /><b>Özel üretim</b><span>{MARKA.ozel}</span></div>
        </div>
        <div className="alt-alt">
          <Logo className="alt-logo" />
          <p>{MARKA.slogan}</p>
          <nav>
            <a href={MARKA.magaza} target="_blank" rel="noopener">Mesafeli satış sözleşmesi</a>
            <a href={MARKA.magaza} target="_blank" rel="noopener">Ön bilgilendirme formu</a>
            <a href={MARKA.magaza} target="_blank" rel="noopener">KVKK</a>
          </nav>
          <small>© {new Date().getFullYear()} meli handbags</small>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useYumusakKaydirma()
  return (
    <>
      <Acilis />
      {MARKA.onizleme && <div className="onizleme">Tasarım önizlemesidir. Bilgiler meli handbags'in Shopier mağazasından alınmıştır.</div>}
      <Ust />
      <main>
        <Giris />
        <Bant />
        <Koleksiyon />
        <Renkler />
        <Anatomi />
        <Nakisli />
        <Ozel />
        <Galeri />
      </main>
      <Alt />
    </>
  )
}
