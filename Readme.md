# MindMapMe

**MindMapMe**, fikirlerinizi hiyerarşik ve görsel olarak organize etmenizi sağlayan modern bir zihin haritası uygulamasıdır. Next.js ve Tailwind CSS ile geliştirilen bu proje, sade arayüzü ve güçlü yapısıyla bireysel üretkenliği artırmayı hedefler.

## Demo

[Canlı Demo](https://mind-map-me.vercel.app) - Uygulamayı hemen deneyin!

## Özellikler

- **Minimal Tasarım** - Sezgisel ve odaklanmayı kolaylaştıran arayüz
- **Sürükle & Bırak** - Düğümleri kolayca hareket ettirin ve organize edin
- **Dinamik Bağlantılar** - Otomatik çizilen hiyerarşik bağlantı çizgileri
- **Otomatik Kaydetme** - Çalışmanız localStorage ile güvenli şekilde saklanır
- **Responsive Tasarım** - Tüm cihazlarda mükemmel görüntüleme
- **Yüksek Performans** - Next.js ve Tailwind CSS optimizasyonları
- **Özelleştirilebilir** - Kendi ihtiyaçlarınıza göre genişletilebilir yapı

## Teknoloji Stack'i

| Teknoloji     | Versiyon | Açıklama                            |
|---------------|----------|-------------------------------------|
| **Next.js**   | 14.x     | React tabanlı modern framework      |
| **TypeScript**| 5.x      | Tip güvenliği ve geliştirme deneyimi|
| **Tailwind CSS**| 3.x   | Utility-first CSS framework         |
| **Zustand**   | Latest   | Hafif ve etkili state yönetimi      |

## 📁 Proje Yapısı

```
mindmapme/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global stiller
│   ├── layout.tsx         # Ana layout bileşeni
│   └── page.tsx           # Ana sayfa
├── components/            # UI bileşenleri
│   ├── ui/               # Temel UI bileşenleri
│   └── MindMap/          # Zihin haritası bileşenleri
├── hooks/                # Özel React hook'ları
├── lib/                  # Yardımcı fonksiyonlar ve utilities
├── store/                # Zustand store yapılandırmaları
├── types/                # TypeScript tip tanımları
├── public/               # Statik dosyalar (favicon, görüntüler)
└── README.md            # Bu dosya
```

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+ 
- npm, yarn veya pnpm

### Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/kullaniciadi/mindmapme.git

# Proje dizinine geçin
cd mindmapme

# Bağımlılıkları yükleyin
pnpm install
# veya
npm install
# veya  
yarn install

# Geliştirme sunucusunu başlatın
pnpm dev
# veya
npm run dev
# veya
yarn dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışmaya başlayacak.

## 🔧 Kullanılabilir Komutlar

```bash
# Geliştirme sunucusunu başlat
pnpm dev

# Production build oluştur
pnpm build

# Production sunucusunu başlat
pnpm start

# Lint kontrolü yap
pnpm lint

# TypeScript tip kontrolü
pnpm type-check
```

## 📖 Kullanım

1. **Yeni Düğüm Ekleme**: Ana düğüme tıklayın ve yeni bir alt düğüm ekleyin
2. **Düğüm Düzenleme**: Herhangi bir düğüme çift tıklayarak içeriğini düzenleyin
3. **Düğüm Taşıma**: Sürükle-bırak ile düğümleri yeniden konumlandırın
4. **Otomatik Kaydetme**: Değişiklikleriniz otomatik olarak tarayıcınızda saklanır

## 🤝 Katkıda Bulunma

Katkılarınız memnuniyetle karşılanır! Lütfen aşağıdaki adımları takip edin:

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

### Geliştirme Kuralları

- TypeScript kullanımına dikkat edin
- Kod formatlaması için ESLint ve Prettier kullanın
- Commit mesajlarında [Conventional Commits](https://www.conventionalcommits.org/) standardını takip edin

## 🐛 Hata Bildirimi

Bir hata bulduysanız, lütfen [GitHub Issues](https://github.com/kullaniciadi/mindmapme/issues) sayfasından bildirin. Hata raporunuzda şunları belirtin:

- İşletim sistemi ve tarayıcı bilgileri
- Hatayı yeniden oluşturma adımları
- Beklenen ve gerçekleşen davranış
- Varsa ekran görüntüsü

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Detaylar için `LICENSE` dosyasını inceleyebilirsiniz.

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) ekibine harika framework için
- [Tailwind CSS](https://tailwindcss.com/) topluluğuna utility-first yaklaşım için
- [Zustand](https://github.com/pmndrs/zustand) geliştiricilerine basit state yönetimi için

---

**MindMapMe** ile düşüncelerinizi görselleştirin ve produktivitенizi artırın! 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kullaniciadi/mindmapme)
