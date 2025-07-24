# AirdropHub - Kripto Airdrop Bilgi Paylaşım Sitesi

Modern ve responsive bir airdrop bilgi paylaşım platformu. Headless CMS entegrasyonu ile dinamik içerik yönetimi.

## 🚀 Özellikler

- **Responsive Tasarım**: Mobil ve desktop uyumlu
- **Modern UI/UX**: Tailwind CSS ile modern arayüz
- **Headless CMS Desteği**: Strapi, Contentful, Sanity, Netlify CMS
- **Animasyonlar**: Smooth scroll ve hover efektleri
- **Filtreleme**: Durum, kategori ve blockchain bazında filtreleme
- **Detay Sayfaları**: Her airdrop için detaylı bilgi sayfası
- **GitHub Pages Ready**: Statik site olarak yayınlanabilir

## 📁 Proje Yapısı

```
kriptomaster/
├── index.html              # Ana sayfa
├── detail.html             # Airdrop detay sayfası
├── css/
│   └── styles.css          # Özel CSS stilleri
├── js/
│   ├── main.js             # Ana JavaScript
│   ├── detail.js           # Detay sayfası JavaScript
│   └── cms-integration.js  # Headless CMS entegrasyonu
└── README.md               # Bu dosya
```

## 🛠️ Kurulum

### 1. Projeyi İndirin
```bash
git clone https://github.com/kullaniciadi/kriptomaster.git
cd kriptomaster
```

### 2. Yerel Sunucu ile Test Edin
```bash
# Python ile
python -m http.server 8000

# Node.js ile
npx serve .

# PHP ile
php -S localhost:8000
```

Tarayıcınızda `http://localhost:8000` adresine gidin.

## 🔧 Headless CMS Kurulumu

### Seçenek 1: Strapi (Önerilen)

1. **Strapi Kurulumu**
```bash
npx create-strapi-app@latest airdrop-cms --quickstart
```

2. **Content Type Oluşturma**
- Admin panelinde "Content-Types Builder" > "Create new collection type"
- Aşağıdaki alanları ekleyin:
  - `title` (Text)
  - `description` (Rich Text)
  - `image` (Media)
  - `status` (Enumeration: active, upcoming, ended)
  - `endDate` (Date)
  - `reward` (Text)
  - `requirements` (JSON)
  - `link` (Text)
  - `category` (Text)
  - `blockchain` (Text)
  - `estimatedValue` (Text)

3. **API Token Oluşturma**
- Settings > API Tokens > Create new API Token
- Token'ı kopyalayın

4. **JavaScript Konfigürasyonu**
```javascript
// js/cms-integration.js dosyasında
this.config.strapi = {
    baseUrl: 'http://localhost:1337/api',
    token: 'your-strapi-token'
};
```

### Seçenek 2: Contentful

1. **Contentful Hesabı Oluşturun**
- [contentful.com](https://contentful.com) adresine gidin
- Ücretsiz hesap oluşturun

2. **Content Model Oluşturma**
- Content Model > Add Content Type
- "Airdrop" adında yeni content type oluşturun
- Gerekli alanları ekleyin

3. **API Keys**
- Settings > API keys > Content delivery / preview tokens
- Space ID ve Access Token'ı kopyalayın

4. **JavaScript Konfigürasyonu**
```javascript
this.config.contentful = {
    spaceId: 'your-space-id',
    accessToken: 'your-access-token',
    environment: 'master'
};
```

### Seçenek 3: Sanity

1. **Sanity Kurulumu**
```bash
npm install -g @sanity/cli
sanity init --template clean --create-project "Airdrop Hub"
```

2. **Schema Oluşturma**
```javascript
// schemas/airdrop.js
export default {
  name: 'airdrop',
  title: 'Airdrop',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'description', title: 'Description', type: 'text'},
    {name: 'image', title: 'Image', type: 'image'},
    {name: 'status', title: 'Status', type: 'string', options: {list: ['active', 'upcoming', 'ended']}},
    {name: 'endDate', title: 'End Date', type: 'date'},
    {name: 'reward', title: 'Reward', type: 'string'},
    {name: 'requirements', title: 'Requirements', type: 'array', of: [{type: 'string'}]},
    {name: 'link', title: 'Link', type: 'url'},
    {name: 'category', title: 'Category', type: 'string'},
    {name: 'blockchain', title: 'Blockchain', type: 'string'},
    {name: 'estimatedValue', title: 'Estimated Value', type: 'string'}
  ]
}
```

3. **JavaScript Konfigürasyonu**
```javascript
this.config.sanity = {
    projectId: 'your-project-id',
    dataset: 'production',
    apiVersion: '2024-01-01'
};
```

### Seçenek 4: Netlify CMS

1. **Netlify CMS Kurulumu**
- `admin/index.html` dosyası oluşturun
- `admin/config.yml` dosyası oluşturun

2. **Config Dosyası**
```yaml
# admin/config.yml
backend:
  name: git-gateway
  branch: main

media_folder: "images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "airdrops"
    label: "Airdrops"
    folder: "_data/airdrops"
    create: true
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Description", name: "description", widget: "text"}
      - {label: "Image", name: "image", widget: "image"}
      - {label: "Status", name: "status", widget: "select", options: ["active", "upcoming", "ended"]}
      - {label: "End Date", name: "endDate", widget: "datetime"}
      - {label: "Reward", name: "reward", widget: "string"}
      - {label: "Requirements", name: "requirements", widget: "list"}
      - {label: "Link", name: "link", widget: "string"}
      - {label: "Category", name: "category", widget: "string"}
      - {label: "Blockchain", name: "blockchain", widget: "string"}
      - {label: "Estimated Value", name: "estimatedValue", widget: "string"}
```

## 🚀 GitHub Pages Deployment

### 1. Repository Oluşturun
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/kullaniciadi/kriptomaster.git
git push -u origin main
```

### 2. GitHub Pages Ayarları
- Repository > Settings > Pages
- Source: Deploy from a branch
- Branch: main
- Folder: / (root)

### 3. Custom Domain (Opsiyonel)
- Settings > Pages > Custom domain
- Domain adınızı girin (örn: airdrophub.com)

## 📝 CMS Kullanımı

### CMS Seçimi
```javascript
// Hangi CMS'i kullanacağınızı belirtin
window.cmsIntegration.setCMS('strapi'); // veya 'contentful', 'sanity', 'netlify'
```

### Veri Ekleme
1. CMS admin panelinize girin
2. Yeni airdrop oluşturun
3. Gerekli bilgileri doldurun
4. Yayınlayın

### API Çağrıları
```javascript
// Tüm airdropları getir
const airdrops = await window.cmsIntegration.fetchAirdrops();

// Filtreli airdroplar
const activeAirdrops = await window.cmsIntegration.fetchAirdrops({ status: 'active' });

// Tek airdrop
const airdrop = await window.cmsIntegration.fetchAirdrop(1);
```

## 🎨 Özelleştirme

### Renkler
```javascript
// tailwind.config.js veya index.html içinde
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',    // Ana renk
                secondary: '#1E40AF',  // İkincil renk
                accent: '#F59E0B'      // Vurgu rengi
            }
        }
    }
}
```

### Animasyonlar
CSS dosyasında animasyonları özelleştirebilirsiniz:
```css
/* css/styles.css */
.hero-title {
    animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

## 🔍 SEO Optimizasyonu

### Meta Tags
```html
<meta name="description" content="Kripto dünyasının en güncel airdrop bilgileri">
<meta name="keywords" content="airdrop, kripto, cryptocurrency, token">
<meta property="og:title" content="AirdropHub">
<meta property="og:description" content="Kripto airdrop bilgileri">
<meta property="og:image" content="https://yoursite.com/og-image.jpg">
```

### Sitemap
```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yoursite.com/</loc>
        <lastmod>2024-01-01</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
```

## 📊 Analytics

### Google Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛡️ Güvenlik

### CORS Ayarları
CMS'inizde CORS ayarlarını yapılandırın:
```javascript
// Strapi için
// config/middlewares.js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 İletişim

- Website: [https://airdropHub.com](https://airdropHub.com)
- Email: info@airdropHub.com
- Twitter: [@AirdropHub](https://twitter.com/AirdropHub)

## 🙏 Teşekkürler

- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Font Awesome](https://fontawesome.com) - İkonlar
- [CryptoLogos](https://cryptologos.cc) - Kripto logoları

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! 