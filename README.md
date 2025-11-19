# 🎮 Crazy Aim Sport - Reloaded

Elite Battlefield 6 Squad Website mit Live-Stats Integration

![Squad Banner](https://images2.alphacoders.com/139/thumb-1920-1399399.jpg)

## 🚀 Features

- **Modern Design** - Sleek, responsive Battlefield-themed UI
- **Live Stats** - Integration mit Tracker.gg für echte Spieler-Stats
- **Parallax Effects** - Smooth scrolling mit dynamischen Hintergründen
- **Team Profiles** - Detaillierte Squad-Member Karten
- **Hall of Shame** - Legendäre Momente und epische Fails
- **Discord Integration** - Direkte Links zum Squad Discord

## 📂 Projekt-Struktur

```
CODEX/
├── .superdesign/
│   ├── design_iterations/
│   │   ├── bf6_team_10.html      # Hauptseite (JavaScript-only, kein Server nötig)
│   │   ├── bf6_team_9.html       # Alternative mit PHP-API
│   │   └── ...                   # Frühere Versionen
│   └── api/
│       ├── tracker-proxy.php     # PHP Backend für Live-Stats
│       ├── test-tracker.php      # API Test-Tool
│       └── README.md             # API Dokumentation
├── images/                       # Bilder und Assets
└── README.md                     # Diese Datei
```

## 🎯 Quick Start

### Option 1: Direkt öffnen (Empfohlen für GitHub Pages)

1. Öffne: `.superdesign/design_iterations/bf6_team_10.html`
2. Fertig! Keine Installation nötig.

### Option 2: Mit PHP Live-Stats

1. PHP-Server starten:
   ```bash
   php -S localhost:8000
   ```
2. Öffne: `http://localhost:8000/.superdesign/design_iterations/bf6_team_9.html`

## 📊 Stats aktualisieren

Die Stats sind aktuell hardcoded in `bf6_team_10.html`. Um sie zu aktualisieren:

1. Öffne die HTML-Datei im Editor
2. Finde die Zeile mit `const trackerStats = {`
3. Update die Werte von Tracker.gg
4. Speichern und neu laden

Siehe [STATS_UPDATE_ANLEITUNG.md](.superdesign/STATS_UPDATE_ANLEITUNG.md) für Details.

## 🌐 GitHub Pages Deployment

Die Seite ist bereit für GitHub Pages:

1. Push zu GitHub
2. Gehe zu Settings → Pages
3. Source: `main` branch, root folder
4. Die Seite wird verfügbar unter: `https://username.github.io/CODEX`

### Custom Domain (Optional)

Für eine eigene Domain:
1. Erstelle eine Datei `CNAME` mit deiner Domain
2. Stelle DNS-Records ein
3. GitHub Pages konfigurieren

## 🛠️ Technologien

- **HTML5** - Struktur
- **Tailwind CSS** - Styling (via CDN)
- **JavaScript** - Interaktivität
- **PHP** - Backend API (optional)
- **Lucide Icons** - Icon-Set

## 👥 Squad Members

- **Maex** (mad) - Zoom & Boom 200m
- **Dirk** - Tearminator
- **Markus** - ZenOps
- **Eric** - Lager & Loader
- **Benny** - Frontline Express

## 🔗 Links

- **Discord**: [Join uns](https://discord.gg/w3na5hQb)
- **Tracker.gg**: [Maex's Stats](https://tracker.gg/bf6/profile/3179257088/overview)

## 📝 To-Do / Roadmap

- [ ] Automatische Stats-Updates mit GitHub Actions
- [ ] Weitere Squad-Member Stats hinzufügen
- [ ] Match History Integration
- [ ] Mobile App Version
- [ ] Clan War Tracker

## 🤝 Contributing

Squad-Members können gerne Updates machen:

1. Fork das Repo
2. Erstelle einen Feature-Branch
3. Commit deine Änderungen
4. Push zum Branch
5. Erstelle einen Pull Request

## 📄 License

© 2024 Crazy Aim Sport - Reloaded. Alle Rechte vorbehalten (außer K/D Ratios).

Made with ❤️ and a lot of Friendly Fire.

---

**Live-Status**: 🎮 Ready to deploy | **Version**: 1.0 | **Last Update**: Oktober 2025
---

## ?? Cloudflare Pages + Stripe Checkout

Die aktuelle Codebasis enth�lt Cloudflare Pages Functions f�r den kompletten Checkout-Flow. Lies **`CLOUDFLARE_SETUP.md`** f�r die Schritt-f�r-Schritt-Einrichtung � kurz zusammengefasst:

- `npm run dev` startet `wrangler pages dev .` (lokal testen)
- `/api/checkout` erstellt Stripe Checkout Sessions (Secrets als Cloudflare Pages Secrets setzen)
- `/api/stripe-webhook` verarbeitet Stripe-Events (Signatur wird serverseitig gepr�ft)
- `wrangler pages deploy .` ver�ffentlicht Statische Seiten + Functions ohne Netlify

Damit kannst du die Seite direkt zu Cloudflare Pages pushen und den Warenkorb/Stripe-Flow Edge-native betreiben.
