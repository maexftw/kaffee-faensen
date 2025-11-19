# Faensen Web Standards

Gemeinsame Prinzipien für jedes Projekt – orientiert an modernen UX-Laws, Web-Performance- und SEO-Guidelines.

---

## 1. Experience Principles

- **Laws of UX aktiv anwenden**: Hick (wenige Optionen), Fitts (große Targets), Jakob (bekannte Muster), Doherty (Feedback < 400 ms), Prägnanz (klare Visuelle Hierarchie).  
- **8‑px Grid & Design Tokens**: Typografie-Scale, Farben, Spacing, Radius, Shadows als Variablen pflegen.  
- **Mobile-first & Fluid Layouts**: Breakpoints planen (≤640, ≤1024, ≤1440, >1440). Jede Section braucht min. Padding & max-widths.  
- **Animationen mit Purpose**: Kurze Duration, `prefers-reduced-motion` respektieren, CSS statt JS wo möglich.

## 2. Accessibility (WCAG 2.1 AA)

- Semantische HTML-Struktur (Landmarks, Heading-Hierarchie, Listen, Buttons).  
- Farbkontraste ≥ 4.5:1 (Text), ≥ 3:1 (Large Text/UI).  
- Fokus-Styling sichtbar auf allen interaktiven Elementen, Tastaturzugänglichkeit gewährleistet.  
- ARIA/Labels für Formulare, `alt`-Texte für Bilder, Transkripte für Medien.  
- Prüfung mit Lighthouse A11y + manuelle Checks (NVDA/VoiceOver, Keyboard-Only).

## 3. Performance & Lighthouse

- **Ziele**: Lighthouse 90+ in Performance/Accessibility/Best Practices/SEO.  
- **Core Web Vitals**: LCP < 2.5 s, CLS < 0.1, INP/TBT < 200 ms.  
- **Optimierungen**: Kritisches CSS inline, CSS/JS min, Bilder als AVIF/WebP + Lazy Loading, Fonts `display=swap`, HTTP-Caching (immutable für Assets).  
- Monitoring: PageSpeed/Lighthouse CI, Cloudflare Analytics, Sentry/Logflare für Fehler.

## 4. SEO & Content

- Einzigartige `title`, `meta description`, `og:`/`twitter:`-Tags pro Seite.  
- Strukturierte Daten (JSON-LD) für Produkte, Organisation, Breadcrumbs.  
- Saubere URL-Struktur, Semantische H1–H6, interne Verlinkung, Robots/Sitemap aktuell halten.  
- Performance & Mobile-Friendly als Ranking-Factor beachten (CWV).  
- Inhalte: klare Value Proposition oben, Trust-Elemente, CTA pro Section, Local SEO wenn relevant.

## 5. Technik & Deployment

- Edge Hosting (Cloudflare Pages/Workers), Functions für Checkout/Webhooks/API.  
- CI/CD mit Tests (Lint, Unit/Visual, Lighthouse Budget), Preview Deploys.  
- Secrets nur via Env-Variablen, DSGVO-konforme Telemetrie, Cookies nur wenn nötig.  
- Logging & Monitoring: Cloudflare Observability, Error Tracking, Uptime Alerts.

## 6. Umsetzung & QA

1. **Plan** – Referenz sammeln, Content-Strategie & IA definieren.  
2. **Design** – SuperDesign/Cursor, Tokens finalisieren, Responsive Prototypes.  
3. **Build** – Komponenten modular, semantisches HTML, Tests parallel.  
4. **QA** – Lighthouse (Desktop+Mobile), Axe/Accessibility-Check, Browserstack (Safari, Firefox, Chrome, Edge), Responsiveness (320px–4k).  
5. **SEO/Content Review** – Titles/Descriptions, Schema, Analytics & Consent.  
6. **Release** – Edge Deploy, Live Smoke Test, Monitoring aktivieren.

## 7. Checklist

- [ ] UX-Laws angewendet, CTA klar, Copy geprüft.  
- [ ] WCAG 2.1 AA: Kontrast, Fokus, Screenreader, Keyboard.  
- [ ] Performance Budget eingehalten, Lighthouse ≥90, CWV grün.  
- [ ] Meta/OG/Structured Data gesetzt, Sitemap/Robots aktuell.  
- [ ] Edge Functions + Env Secrets konfiguriert, Logging aktiviert.  
- [ ] QA-Protokoll dokumentiert, Regressionen geprüft.

> Diese Datei gehört in jedes neue Projekt (Template), damit alle Beteiligten denselben Qualitätsrahmen besitzen.
