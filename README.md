# ☕ Kaffee Fänsen - Traditionelle Rösterei seit 1844

Handwerklich gerösteter Kaffee aus Hamm. Seit über 90 Jahren rösten wir mit Leidenschaft. Jede Bohne handverlesen, jede Röstung ein Meisterwerk.

![Kaffee Fänsen Logo](public/images/logotext.avif)

## 🚀 Features

- **Modern Shop Design** - Responsive, user-friendly coffee shop interface
- **11 Premium Coffee Varieties** - From classic blends to specialty roasts
- **Stripe Payment Integration** - Secure checkout with multiple payment methods
- **Shopping Cart** - Add multiple products with size and grind selection
- **Cloudflare Pages Deployment** - Fast, edge-optimized hosting
- **Netlify Backup** - Alternative deployment option available

## 📂 Projekt-Struktur

```
kaffee-faensen/
├── shop/
│   ├── homepage.html          # Homepage
│   ├── shop.html              # Shop page with 11 products
│   ├── faensen_navigation.js  # Navigation component
│   ├── faensen_shop_theme.css # Theme styles
│   └── stripe-payment-links.js # Stripe payment links
├── functions/
│   └── api/
│       ├── checkout.mjs       # Cloudflare Pages Function (Stripe checkout)
│       └── stripe-webhook.mjs # Cloudflare Pages Function (webhook handler)
├── netlify/
│   └── functions/             # Netlify Functions (backup)
│       ├── create-checkout.js
│       └── stripe-webhook.js
├── public/
│   └── images/                 # Product images and logos
├── index.html                  # Entry point (redirects to homepage)
├── success.html                # Success page after payment
├── cancel.html                 # Cancel page
├── wrangler.toml               # Cloudflare Pages configuration
├── netlify.toml                # Netlify configuration (backup)
└── package.json                # Dependencies and scripts
```

## 🎯 Quick Start

### Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Lokalen Development-Server starten (Cloudflare Pages)
npm run dev

# Öffne http://localhost:8788
```

### Deployment zu Cloudflare Pages

```bash
# Wrangler Login (einmalig)
wrangler login

# Projekt deployen
npm run deploy
```

Siehe [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) für detaillierte Anleitung.

## ☕ Produkte

Der Shop bietet 11 verschiedene Kaffeesorten:

1. **Hammer Spezial** - Würziger Hochland-Arabica mit nussiger Note (Bestseller)
2. **Café Haus** - Harmonischer Genuss mit ausgewogener Säure
3. **Maragogype** - Die edle Elefantenbohne mit fruchtiger Note (Premium)
4. **Ratsherren Mischung** - Kräftiger Genuss mit feiner Kakaonote
5. **Peru** - Vollmundiger Hochland-Genuss mit feiner Säure (Neu)
6. **Brasil** - Mild-aromatischer Klassiker mit Schokoladennote
7. **Espresso** - Intensive Röstung für perfekten Espresso-Genuss (Bestseller)
8. **Crème** - Samtige Crema mit vollmundigem Körper
9. **Cappuccino** - Perfekt abgestimmt für cremigen Milchkaffee
10. **Naturmild** - Besonders bekömmlich mit milder Röstung
11. **Säurearm** - Magenschonend geröstet für empfindliche Genießer

**Verfügbare Größen:** 250g, 500g  
**Mahlgrade:** Ganze Bohne, Filterkaffee, Siebträger, French Press, Espressokanne

## 🛠️ Technologien

- **HTML5** - Struktur
- **CSS3** - Custom theme with CSS variables
- **JavaScript (Vanilla)** - Shopping cart, checkout flow
- **Stripe** - Payment processing
- **Cloudflare Pages** - Hosting & Edge Functions
- **Netlify** - Backup hosting option
- **Lucide Icons** - Icon-Set

## 💳 Payment Setup

### Stripe Konfiguration

1. **Stripe Account erstellen**: https://stripe.com
2. **API Keys holen**: Dashboard → Developers → API Keys
3. **Environment Variables setzen** (Cloudflare Pages):
   - `STRIPE_SECRET_KEY` (sk_test_... oder sk_live_...)
   - `STRIPE_WEBHOOK_SECRET` (whsec_...)
   - `SITE_URL` (z.B. https://kaffee-faensen.pages.dev)

### Webhook Setup

1. Stripe Dashboard → Developers → Webhooks
2. Endpoint: `https://your-domain.pages.dev/api/stripe-webhook`
3. Events: `checkout.session.completed`, `payment_intent.succeeded`, etc.
4. Secret kopieren und als `STRIPE_WEBHOOK_SECRET` setzen

## 🌐 Deployment

### Cloudflare Pages (Primary)

1. Repository zu GitHub pushen
2. Cloudflare Dashboard → Pages → Create Project
3. GitHub Repository verbinden
4. Build Settings:
   - Framework: None
   - Build command: (leer)
   - Output directory: `/`
5. Environment Variables setzen (siehe oben)
6. Deploy!

Siehe [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) für Details.

### Netlify (Backup)

Netlify Functions sind als Backup-Option verfügbar. Siehe [NETLIFY_SETUP.md](NETLIFY_SETUP.md) für Setup.

## 📝 NPM Scripts

```bash
npm run dev      # Startet lokalen Cloudflare Pages Dev-Server
npm run deploy   # Deployt zu Cloudflare Pages
npm run build    # Build (statische Seite, kein Build-Step nötig)
npm run stripe:products  # Generiert Stripe Payment Links
```

## 🔗 Wichtige Links

- **Cloudflare Setup**: [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md)
- **Netlify Setup**: [NETLIFY_SETUP.md](NETLIFY_SETUP.md)
- **Deployment Guide**: [DEPLOYMENT_SIMPLE.md](DEPLOYMENT_SIMPLE.md)
- **Quick Start**: [QUICK_START.md](QUICK_START.md)

## ✅ Features Status

- [x] Shop-Seite mit 11 Produkten
- [x] Warenkorb-Funktionalität
- [x] Größen- und Mahlgrad-Auswahl
- [x] Stripe Checkout Integration
- [x] Cloudflare Pages Functions
- [x] Netlify Functions (Backup)
- [x] Success/Cancel Pages
- [x] Responsive Design
- [x] Navigation Component

## 🐛 Troubleshooting

### Checkout funktioniert nicht

- Prüfe Environment Variables in Cloudflare Pages
- Prüfe Stripe API Keys (Test vs. Live Mode)
- Prüfe Browser Console für Fehler
- Prüfe Cloudflare Function Logs

### Webhook empfängt keine Events

- Prüfe Webhook Secret in Environment Variables
- Prüfe Webhook URL in Stripe Dashboard
- Prüfe Cloudflare Function Logs

### Produkte werden nicht angezeigt

- Prüfe Browser Console
- Prüfe ob `shop.html` korrekt geladen wird
- Prüfe JavaScript-Fehler

## 📄 License

© 2024 Kaffee Fänsen. Alle Rechte vorbehalten.

---

**Status**: ✅ Ready for Production | **Version**: 1.0 | **Last Update**: Januar 2025
