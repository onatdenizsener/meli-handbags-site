// TÜM METİNLER VE ÜRÜNLER BURADA.
// Kaynak: meli handbags Shopier mağazası (shopier.com/melihandbags), Kasım 2026.
// Fiyat değişince sadece buradaki "fiyat" alanını düzelt.

export const MARKA = {
  ad: 'meli handbags',
  slogan: 'Çiçek kızlar için çiçek çantalar',
  ozel: 'İstenilen boyutta ve kendi renklerimizde üretilebilmektedir.',
  eposta: 'melihandbag@gmail.com',
  magaza: 'https://www.shopier.com/melihandbags',
  onizleme: true,
}

const S = (id) => `${MARKA.magaza}/${id}`

// renk: çantanın kendi rengi, acik: zemin tonu, koyu: yazı tonu
export const RENKLER = [
  { id: 'violet', ad: 'Violet', renk: '#7a5cff', acik: '#ece8ff', koyu: '#2c1a7a', not: 'Gün batımında mora, gölgede maviye döner.' },
  { id: 'pink', ad: 'Fashion Pink', renk: '#ff3d9a', acik: '#ffe6f1', koyu: '#7a0b42', not: 'Logomuzun rengi. Plajda da şehirde de ilk bakılan çanta.' },
  { id: 'tangerine', ad: 'Tangerine', renk: '#ff7a2e', acik: '#fff0e4', koyu: '#7a2c00', not: 'Kayısı ağacından yeni toplanmış gibi.' },
  { id: 'azure', ad: 'Azure', renk: '#2fa3e6', acik: '#e4f4fd', koyu: '#0b4a72', not: 'Akşam mavisi. Kot ceketle en sevdiğimiz ikili.' },
  { id: 'ash', ad: 'Ash', renk: '#9ea3ad', acik: '#eff0f3', koyu: '#33363d', not: 'Metalik gri. Her renkle konuşur.' },
]

export const URUNLER = [
  { id: 'violet', ad: 'Violet Büyük Boy Meli', renk: 'violet', boy: 'Büyük boy', fiyat: 4850, link: S(50253859), foto: ['violet-2', 'violet-1', 'violet-3', 'violet-4'] },
  { id: 'ash', ad: 'Ash Küçük Boy Meli', renk: 'ash', boy: 'Küçük boy', fiyat: 4250, link: S(50254113), foto: ['ash-2', 'ash-1'] },
  { id: 'tangerine', ad: 'Tangerine Büyük Boy Meli', renk: 'tangerine', boy: 'Büyük boy', fiyat: 4850, link: S(50253716), foto: ['tangerine-1', 'tangerine-2'] },
  { id: 'pink', ad: 'Fashion Pink Büyük Boy Meli', renk: 'pink', boy: 'Büyük boy', fiyat: 4850, link: S(50249750), foto: ['pink-1', 'pink-2'] },
  { id: 'azure', ad: 'Azure Küçük Boy Meli', renk: 'azure', boy: 'Küçük boy', fiyat: 4250, link: S(50248589), foto: ['azure-1', 'violet-4'] },
  { id: 'nakisli', ad: 'Nakışlı Meli Küçük Boy Çanta', renk: 'pink', boy: 'Küçük boy · nakışlı', fiyat: 4900, link: S(50254412), foto: ['nakis-1', 'nakis-3', 'nakis-2'] },
]

export const ANATOMI = [
  { x: 41, y: 30, baslik: 'Örgü sap', metin: 'Boncuk dokulu, elde tutmaya ve omza atmaya uygun.' },
  { x: 56, y: 45, baslik: 'Büzgülü kumaş kese', metin: 'Desenli iç kese ağzı kapatır, eşyalar düşmez.' },
  { x: 74, y: 64, baslik: 'Çiçek süs', metin: 'Halkaya takılı küçük çiçek, her çantanın imzası.' },
  { x: 42, y: 68, baslik: 'Dalgalı gövde', metin: 'Yumuşak kıvrımlar ışıkta renk değiştiriyor gibi görünür.' },
  { x: 50, y: 83, baslik: 'meli yazısı', metin: 'Tabanın önünde markamızın adı.' },
]

export const GALERI = ['violet-4', 'pink-1', 'azure-1', 'tangerine-2', 'ash-1', 'violet-1', 'nakis-1', 'pink-2', 'violet-3']

export const TL = (n) => n.toLocaleString('tr-TR') + ' TL'
export const foto = (ad) => `./img/${ad}.webp`
