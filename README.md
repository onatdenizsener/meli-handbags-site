# meli handbags web sitesi

flixgamestudios.com / BTO ile aynı yöntem: **React 18 + Vite 5**, içerik tek dosyada, yayın **Vercel**.

| Parça | Yer |
|---|---|
| Ürünler, fiyatlar, renkler, metinler | `src/data.js` |
| Bölümler (giriş, koleksiyon, renk seçici, anatomi, nakışlı, özel sipariş, galeri) | `src/App.jsx` |
| Logo, çiçek, çanta çizimi, görünür olunca hook'u | `src/ortak.jsx` |
| Açılış animasyonu | `src/Acilis.jsx` |
| Renkler ve hareketler | `src/styles.css` |
| Fotoğraflar (Shopier mağazasından, WebP) | `public/img/` |

Fiyat değişirse `src/data.js` → `URUNLER` → `fiyat`. Önizleme şeridini kaldırmak için `MARKA.onizleme: false`.

```
npm install
npm run dev
```
