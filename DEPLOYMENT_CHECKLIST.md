# ✅ Kaffee Fänsen - Deployment Checklist

Schritt-für-Schritt Anleitung zum Deployment auf Cloudflare Pages.

---

## Phase 1: Vorbereitung ✅

- [x] README.md aktualisiert
- [x] DEPLOYMENT_SUMMARY.md aktualisiert
- [x] Code ist deployment-ready
- [x] Cloudflare Pages Functions vorhanden
- [x] Netlify Functions als Backup vorhanden

---

## Phase 2: Cloudflare Pages Setup

### Option A: Via Cloudflare Dashboard (Einfach)
### Option B: Via Cloudflare API (Automatisiert) - Siehe [CLOUDFLARE-PAGES-API-GUIDE.md](CLOUDFLARE-PAGES-API-GUIDE.md)

### Schritt 1: GitHub Repository (falls noch nicht vorhanden)

```bash
# Im Projekt-Verzeichnis
cd kaffee-faensen

# Git initialisieren (falls noch nicht geschehen)
git init

# Alle Dateien hinzufügen
git add .

# Commit erstellen
git commit -m "Initial commit: Kaffee Fänsen Shop"

# GitHub Repository erstellen (auf github.com)
# Dann Remote hinzufügen:
git remote add origin https://github.com/DEIN-USERNAME/kaffee-faensen.git
git branch -M main
git push -u origin main
```

### Schritt 2: Cloudflare Account & Wrangler Login

1. **Cloudflare Account erstellen** (falls noch nicht vorhanden)
   - Gehe zu: https://dash.cloudflare.com/sign-up

2. **Wrangler Login**
   ```bash
   npm install -g wrangler
   wrangler login
   ```
   - Browser öffnet sich automatisch
   - Authorisiere Wrangler mit deinem Cloudflare Account

### Schritt 3: Cloudflare Pages Projekt erstellen

**Option A: Via Cloudflare Dashboard (Empfohlen für Einsteiger)**
1. Gehe zu: https://dash.cloudflare.com → Pages
2. Klicke "Create a project"
3. Wähle "Connect to Git"
4. Verbinde GitHub Account (falls noch nicht verbunden)
5. Wähle Repository: `kaffee-faensen`
6. Projekt-Name: `kaffee-faensen`
7. Klicke "Save and Deploy"

**Option B: Via Wrangler CLI**
```bash
cd kaffee-faensen
wrangler pages project create kaffee-faensen
```

**Option C: Via Cloudflare API (Automatisiert)**
Falls du bereits eine Cloudflare API-Konfiguration hast (z.B. aus Kost-Projekt):
- Siehe: [CLOUDFLARE-PAGES-API-GUIDE.md](CLOUDFLARE-PAGES-API-GUIDE.md)
- Erweitere API Token Permissions um Pages-Rechte
- Verwende bestehende `.cloudflare-config.json` oder erstelle neue

### Schritt 4: Build Settings prüfen

Im Cloudflare Pages Dashboard:
- **Framework preset**: None
- **Build command**: (leer lassen)
- **Build output directory**: `/` (root)
- **Root directory**: (leer lassen)

---

## Phase 3: Stripe Setup

### Schritt 1: Stripe Account & API Keys

1. **Stripe Account erstellen** (falls noch nicht vorhanden)
   - Gehe zu: https://stripe.com
   - Erstelle Account (Test Mode ist Standard)

2. **API Keys holen**
   - Dashboard → Developers → API Keys
   - Kopiere **Secret Key** (beginnt mit `sk_test_...` für Test Mode)
   - **Wichtig**: Für Production später `sk_live_...` verwenden

### Schritt 2: Environment Variables setzen

**Via Cloudflare Dashboard:**
1. Pages → `kaffee-faensen` → Settings → Environment Variables
2. Klicke "Add variable" für jede Variable:

   **Production:**
   ```
   STRIPE_SECRET_KEY = sk_test_... (oder sk_live_...)
   STRIPE_WEBHOOK_SECRET = whsec_... (wird später gesetzt)
   SITE_URL = https://kaffee-faensen.pages.dev (wird nach erstem Deploy verfügbar)
   ```

**Via Wrangler CLI:**
```bash
# Nach erstem Deploy, wenn SITE_URL bekannt ist:
wrangler pages secret put STRIPE_SECRET_KEY
# Eingabe: sk_test_... (oder sk_live_...)

wrangler pages secret put STRIPE_WEBHOOK_SECRET
# Eingabe: whsec_... (wird nach Webhook-Setup gesetzt)

wrangler pages secret put SITE_URL
# Eingabe: https://kaffee-faensen.pages.dev
```

---

## Phase 4: Erster Deploy

### Schritt 1: Deploy ausführen

**Option A: Automatisch (wenn GitHub verbunden)**
- Push zu GitHub: `git push`
- Cloudflare Pages deployed automatisch

**Option B: Manuell via Wrangler**
```bash
cd kaffee-faensen
npm run deploy
```

### Schritt 2: Deployment URL notieren

Nach dem Deploy siehst du die URL:
```
https://kaffee-faensen.pages.dev
```
**Wichtig**: Diese URL für `SITE_URL` verwenden!

---

## Phase 5: Stripe Webhook Setup

### Schritt 1: Webhook Endpoint erstellen

1. Gehe zu: Stripe Dashboard → Developers → Webhooks
2. Klicke "Add endpoint"
3. **Endpoint URL**: `https://kaffee-faensen.pages.dev/api/stripe-webhook`
4. **Description**: "Kaffee Fänsen Checkout Webhook"

### Schritt 2: Events auswählen

Wähle diese Events:
- ✅ `checkout.session.completed`
- ✅ `checkout.session.expired`
- ✅ `payment_intent.succeeded`
- ✅ `payment_intent.payment_failed`

Klicke "Add endpoint"

### Schritt 3: Webhook Secret kopieren

1. Nach Erstellung: Klicke auf den neuen Webhook
2. Kopiere **Signing secret** (beginnt mit `whsec_...`)
3. Setze als Environment Variable:

```bash
wrangler pages secret put STRIPE_WEBHOOK_SECRET
# Eingabe: whsec_...
```

**Oder via Dashboard:**
- Pages → Settings → Environment Variables
- Bearbeite `STRIPE_WEBHOOK_SECRET`
- Füge `whsec_...` ein

### Schritt 4: Deployment neu starten

Nach Secret-Update:
- Pages → Deployments → Latest
- Klicke "Retry deployment" oder pushe neuen Commit

---

## Phase 6: Testing

### Schritt 1: Shop-Seite öffnen

Öffne: `https://kaffee-faensen.pages.dev/shop/shop.html`

**Prüfe:**
- [ ] Seite lädt korrekt
- [ ] Alle 11 Produkte werden angezeigt
- [ ] Navigation funktioniert
- [ ] Warenkorb-Icon sichtbar

### Schritt 2: Warenkorb testen

1. Wähle ein Produkt (z.B. "Hammer Spezial")
2. Wähle Größe: 250g
3. Wähle Mahlgrad: Ganze Bohne
4. Klicke "In den Warenkorb"
5. **Prüfe:**
   - [ ] Grüne Notification erscheint
   - [ ] Warenkorb-Badge zeigt "1"

### Schritt 3: Checkout testen

1. Füge 2-3 weitere Produkte hinzu
2. Klicke auf Warenkorb-Icon
3. Klicke "Zur Kasse gehen"
4. **Prüfe:**
   - [ ] Weiterleitung zu Stripe Checkout
   - [ ] Alle Produkte werden angezeigt
   - [ ] Versandoptionen sichtbar

### Schritt 4: Test-Zahlung

**Stripe Test-Karte:**
- **Kartennummer**: `4242 4242 4242 4242`
- **CVC**: `123`
- **Ablaufdatum**: `12/34`
- **Name**: Beliebig
- **Adresse**: Beliebig (Deutschland)

**Oder SEPA Lastschrift:**
- Wähle "SEPA Lastschrift"
- IBAN: `DE89370400440532013000`

Klicke "Bezahlen"

### Schritt 5: Success-Page prüfen

**Nach Zahlung:**
- [ ] Weiterleitung zu `success.html`
- [ ] Session ID in URL: `?session_id=cs_test_...`
- [ ] Success-Meldung wird angezeigt

### Schritt 6: Webhook prüfen

1. Stripe Dashboard → Webhooks → Latest events
2. **Prüfe:**
   - [ ] `checkout.session.completed` Event vorhanden
   - [ ] Status: "Succeeded" (grün)

**Oder Cloudflare Logs:**
```bash
wrangler pages deployment tail kaffee-faensen
```

---

## Phase 7: Production Launch

### Schritt 1: Stripe auf Live Mode umstellen

1. Stripe Dashboard → Oben links "View test data" ausschalten
2. Gehe zu: Developers → API Keys
3. Kopiere **Live Secret Key** (beginnt mit `sk_live_...`)

### Schritt 2: Live Keys setzen

**Via Dashboard:**
- Pages → Settings → Environment Variables
- Bearbeite `STRIPE_SECRET_KEY`
- Ersetze Test-Key durch Live-Key

**Via CLI:**
```bash
wrangler pages secret put STRIPE_SECRET_KEY
# Eingabe: sk_live_...
```

### Schritt 3: Live Webhook erstellen

1. Stripe Dashboard → Webhooks
2. Erstelle neuen Webhook für **Live Mode**
3. Endpoint: `https://kaffee-faensen.pages.dev/api/stripe-webhook`
4. Events: Gleiche wie Test-Webhook
5. Secret kopieren und als `STRIPE_WEBHOOK_SECRET` setzen

### Schritt 4: Finale Tests

- [ ] Test-Zahlung mit Live-Keys (kleiner Betrag)
- [ ] Webhook empfängt Events
- [ ] Success-Page funktioniert
- [ ] Alle Features getestet

---

## ✅ Deployment abgeschlossen!

Deine Website ist jetzt live unter:
```
https://kaffee-faensen.pages.dev
```

**Shop-URL:**
```
https://kaffee-faensen.pages.dev/shop/shop.html
```

---

## 🔧 Troubleshooting

### Problem: "Function not found"

**Lösung:**
- Prüfe ob `functions/api/checkout.mjs` existiert
- Prüfe Build-Logs im Cloudflare Dashboard
- Prüfe ob `wrangler.toml` korrekt ist

### Problem: "Stripe error: Invalid API Key"

**Lösung:**
- Prüfe Environment Variable `STRIPE_SECRET_KEY`
- Key sollte mit `sk_test_` oder `sk_live_` beginnen
- Kein Leerzeichen am Anfang/Ende
- Prüfe Test vs. Live Mode

### Problem: "Webhook signature invalid"

**Lösung:**
- Prüfe `STRIPE_WEBHOOK_SECRET` Environment Variable
- Secret sollte mit `whsec_` beginnen
- Prüfe ob Webhook-Endpoint korrekt ist
- Deployment nach Secret-Update neu starten

### Problem: "CORS error"

**Lösung:**
- Stelle sicher, dass du die Cloudflare Pages URL verwendest
- Prüfe `CORS_ALLOW_ORIGIN` Environment Variable (falls gesetzt)
- Prüfe Function Code für CORS Headers

---

## 📞 Hilfe & Support

- **Cloudflare Setup**: [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md)
- **Cloudflare API Setup**: [CLOUDFLARE-API-SETUP.md](CLOUDFLARE-API-SETUP.md)
- **Cloudflare Pages API Guide**: [CLOUDFLARE-PAGES-API-GUIDE.md](CLOUDFLARE-PAGES-API-GUIDE.md)
- **Deployment Summary**: [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)
- **Stripe Docs**: https://stripe.com/docs
- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages

---

**Viel Erfolg! ☕🚀**

