# GitHub-Struktur für Agentur-Website & Client-Designs

**Status:** In Planung
**Letzte Aktualisierung:** 2025-01-26
**Entwickelt mit:** Claude AI

---

## 📊 Übersicht

Diese Dokumentation beschreibt die empfohlene GitHub-Struktur für die Agentur-Website und Client-Design-Verwaltung.

---

## 🎯 Empfohlene Struktur: Setup 1 (Master-Repository)

### Repository-Übersicht

```
maexftw/
├── portfolio-website/          # Deine Hauptwebsite (Agentur)
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   └── ...
│
└── client-designs/            # Alle Client-Designs
    ├── index.html            # Übersichtsseite aller Designs
    ├── 2025-01-26-kunde-a/
    │   ├── variant-1.html
    │   ├── variant-2.html
    │   └── variant-3.html
    ├── 2025-01-26-kunde-b/
    │   └── design.html
    ├── 2025-01-27-projekt-x/
    │   └── ...
    └── ...
```

### URLs

- **Agentur-Website:** `maexftw.github.io/portfolio-website`
- **Design-Übersicht:** `maexftw.github.io/client-designs`
- **Spezifisches Design:** `maexftw.github.io/client-designs/2025-01-26-kunde-a/variant-1.html`

### Vorteile ✅

- Alles an einem Ort
- Einfach zu verwalten
- Schnell neue Designs hinzufügen
- Übersicht über alle Projekte

---

## 🔄 Alternative: Setup 2 (Separate Repositories)

### Repository-Struktur

```
maexftw/
├── website/                   # Deine Hauptwebsite
├── designs-2025-01/          # Designs Januar 2025
├── designs-2025-02/          # Designs Februar 2025
└── client-kunde-a/           # Wichtiger Kunde = eigenes Repo
```

### Vorteile ✅

- Bessere Organisation nach Monat/Kunde
- Kann einzelne Repos privat machen
- Separate Deployment-Settings

---

## 🎯 Konkrete Empfehlung (FINALE STRUKTUR)

### Repositories

1. **`maexftw.github.io`** → Deine Hauptwebsite (Agentur)
2. **`designs`** → Alle Client-Designs

### Detaillierte Ordnerstruktur im `designs` Repository

```
designs/
├── index.html                # Auto-generierte Galerie aller Designs
├── _template/                # Dein Design-Template
│   └── base.html
├── 20250126-joelle-hundetraining/
│   ├── v1-warm.html
│   ├── v2-dark.html
│   └── v3-playful.html
├── 20250126-restaurant-alpina/
│   └── design.html
├── 20250127-fitness-studio/
│   └── landing.html
└── ...
```

### Namenskonvention für Ordner

**Format:** `YYYYMMDD-projektname/`

**Beispiele:**
- `20250126-joelle-hundetraining/`
- `20250127-restaurant-alpina/`
- `20250128-fitness-studio/`

---

## 🚀 Automatisierter Workflow (Geplant)

### 1. Neues Design erstellen

```bash
./new-design.sh "Joelle Hundetraining" "warm orange friendly"
```

**Was passiert automatisch:**
- Neuer Ordner mit aktuellem Datum wird erstellt
- Template wird kopiert
- Öffnet sich in VS Code
- Bereit zum Designen!

### 2. Design publishen

```bash
./publish.sh "Joelle Hundetraining - Warmvariation fertig"
```

**Was passiert automatisch:**
- Git commit & push
- URL wird kopiert: `https://maexftw.github.io/designs/20250126-joelle-hundetraining/v1-warm.html`
- QR-Code generiert (optional)
- 30 Sekunden später: Live!

---

## 💡 Smart Features (Geplant)

### 1. Auto-Index Generierung
- Alle Designs werden automatisch auf einer Übersichtsseite gelistet
- Mit Thumbnails, Datum, Kunde
- Automatisches Update bei neuem Design

### 2. URL-Shortener Integration
- Lange URLs → Kurze Links für Kunden
- `maexftw.link/joelle1` statt `maexftw.github.io/designs/...`

### 3. Analytics
- Siehst, welcher Kunde welches Design angeschaut hat
- Wie lange, welches Device, etc.
- Privacy-freundlich

### 4. Passwort-Schutz (optional)
- Designs nur für spezifische Kunden sichtbar
- Token-basierter Zugang

---

## ✅ Nächste Schritte

### Phase 1: Agentur-Website
- [ ] Repository `maexftw.github.io` erstellen
- [ ] Hero Section designen
- [ ] Services/Leistungen definieren
- [ ] Portfolio/Showcase aufbauen
- [ ] Über mich Sektion
- [ ] Kontaktformular
- [ ] (Optional) Preise
- [ ] (Optional) Testimonials

### Phase 2: Design-Repository
- [ ] Repository `designs` erstellen
- [ ] Template-Ordner `_template/` anlegen
- [ ] Base-Template `base.html` erstellen
- [ ] Index-Generierung automatisieren

### Phase 3: Automation
- [ ] CLI-Tool `new-design.sh` entwickeln
- [ ] CLI-Tool `publish.sh` entwickeln
- [ ] Auto-Index-Generator
- [ ] (Optional) URL-Shortener
- [ ] (Optional) Analytics Integration

---

## 📋 Anforderungen für Agentur-Website

### Inhaltliche Elemente
- [ ] Hero Section (Wer bist du, was machst du)
- [ ] Services/Leistungen
- [ ] Portfolio/Showcase
- [ ] Über mich
- [ ] Kontakt
- [ ] Preise? (zu klären)
- [ ] Testimonials? (zu klären)

### Design-Stil
- [ ] Modern & minimalistisch?
- [ ] Kreativ & bunt?
- [ ] Professionell & corporate?
- [ ] Dark Mode?

### Assets benötigt
- [ ] Logo
- [ ] Firmenname
- [ ] Farben/Branding
- [ ] Texte
- [ ] Bilder/Fotos

---

## 📝 Notizen & Ideen

_Dieser Bereich kann für spontane Ideen und Notizen während der Entwicklung genutzt werden._

---

## 🔗 Verwandte Dateien

- `agency-vision.md` - Vision, Mission, Werte
- `target-audience.md` - Zielgruppe & Positionierung
- `design-preferences.md` - Design-Stil, Farben, Inspiration
- `features-roadmap.md` - Geplante Features

---

**Hinweis:** Diese Datei kann von Claude AI gelesen und erweitert werden, wenn neue Erkenntnisse oder Änderungen besprochen werden.
