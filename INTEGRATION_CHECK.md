# 🔌 Kaffee Fänsen - Integration Check

**Stand:** Januar 2025  
**Lokale URL:** http://localhost:8000/shop/shop.html  
**Production URL:** https://kaffee-faensen.pages.dev/shop/shop.html

---

## ✅ Was funktioniert bereits

### 1. Frontend (Shop-Seite)
- ✅ **Homepage:** `shop/homepage.html` - Korrekte Zeichencodierung wiederhergestellt
- ✅ **Shop:** `shop/shop.html` - Korrekte Zeichencodierung wiederhergestellt
- ✅ **Checkout-Endpoint:** Auf Cloudflare Pages (`/api/checkout`) umgestellt
- ✅ **Produktliste:** 11 Kaffeesorten mit Preisen, Größen, Mahlgraden
- ✅ **Warenkorb:** Funktioniert lokal

### 2. Backend (Cloudflare Pages Functions)
- ✅ **Checkout Function:** `functions/api/checkout.mjs`
  - Erstellt Stripe Checkout Sessions
  - Unterstützt Versandoptionen (Standard, kostenlos ab 30€)
  - Länder: DE, AT, CH
  - Benötigt: `STRIPE_SECRET_KEY`, `SITE_URL`
  
- ✅ **Webhook Function:** `functions/api/stripe-webhook.mjs`
  - Verarbeitet Stripe Events
  - Signatur-Verifizierung implementiert
  - Events: `checkout.session.completed`, `checkout.session.expired`, `payment_intent.*`
  - Benötigt: `STRIPE_WEBHOOK_SECRET`

### 3. Cloudflare Pages Setup
- ✅ **Projekt erstellt:** `kaffee-faensen`
- ✅ **URL:** https://kaffee-faensen.pages.dev
- ✅ **Functions:** Bereit für Deployment
- ✅ **Config:** `wrangler.toml` vorhanden

---

## ⚠️ Was noch fehlt / zu prüfen

### 1. Environment Variables (KRITISCH)

**Im Cloudflare Dashboard setzen:**
https://dash.cloudflare.com → Pages → `kaffee-faensen` → Settings → Environment Variables

| Variable | Type | Status | Wert |
|----------|------|--------|------|
| `SITE_URL` | Plain text | ⏳ | `https://kaffee-faensen.pages.dev` |
| `STRIPE_PUBLISHABLE_KEY` | Plain text | ✅ | `pk_live_51Qux1QA474V2RPC70UGsqm5kVzdp4zdFKuyl1L0DZy2LiDbzwGIiQNR78SHXdMDIB6jZgE8O061OvRKTXMra5tTs009lPwFNzL` |
| `STRIPE_SECRET_KEY` | **Secret text** | ⏳ | `sk_live_...` (aus Stripe Dashboard holen) |
| `STRIPE_WEBHOOK_SECRET` | **Secret text** | ⏳ | `whsec_...` (nach Webhook-Setup) |

**Wichtig:** 
- `STRIPE_SECRET_KEY` und `STRIPE_WEBHOOK_SECRET` müssen als **"Secret text"** markiert werden!
- `STRIPE_SECRET_KEY` holen von: https://dashboard.stripe.com/apikeys

### 2. Stripe Webhook konfigurieren

**Nachdem Environment Variables gesetzt sind:**

1. Gehe zu: https://dashboard.stripe.com → Developers → Webhooks
2. Klicke "Add endpoint"
3. **Endpoint URL:** `https://kaffee-faensen.pages.dev/api/stripe-webhook`
4. **Events auswählen:**
   - ✅ `checkout.session.completed`
   - ✅ `checkout.session.expired`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
5. Klicke "Add endpoint"
6. **Webhook Secret kopieren** (beginnt mit `whsec_...`)
7. Als `STRIPE_WEBHOOK_SECRET` in Cloudflare Pages setzen

### 3. GitHub Repository verbinden

**Falls noch nicht geschehen:**

1. Cloudflare Dashboard → Pages → `kaffee-faensen` → Settings → Builds & deployments
2. "Connect to Git" klicken
3. GitHub Repository auswählen
4. Branch: `main` (oder `master`)
5. Build Settings:
   - Framework: None
   - Build command: (leer)
   - Output directory: `/`

**Oder manuell pushen:**
- Git Repository initialisiert ✅
- Commit erstellt ✅
- Remote Repository noch nicht verbunden ⏳

### 4. Frontend prüfen

**Lokale Tests:**
- ✅ Zeichencodierung korrekt
- ✅ Shop-Seite lädt
- ✅ Produkte werden angezeigt
- ⏳ Checkout-Flow testen (benötigt Environment Variables)

**Production Tests (nach Deployment):**
- ⏳ Shop-Seite öffnen: https://kaffee-faensen.pages.dev/shop/shop.html
- ⏳ Produkt zum Warenkorb hinzufügen
- ⏳ Zur Kasse gehen
- ⏳ Checkout-Session wird erstellt
- ⏳ Weiterleitung zu Stripe funktioniert
- ⏳ Zahlung testen (Test-Modus)
- ⏳ Success-Seite prüfen
- ⏳ Webhook-Events prüfen

---

## 🔍 Code-Überprüfung

### Checkout Function (`functions/api/checkout.mjs`)
- ✅ CORS Headers korrekt
- ✅ Site URL aus Environment oder Request
- ✅ Line Items Mapping korrekt
- ✅ Versandoptionen definiert
- ✅ Länder-Einschränkung (DE, AT, CH)
- ✅ Error Handling vorhanden
- ⚠️ Benötigt: `STRIPE_SECRET_KEY` Environment Variable

### Webhook Function (`functions/api/stripe-webhook.mjs`)
- ✅ Signatur-Verifizierung implementiert
- ✅ Event-Handling für alle wichtigen Events
- ✅ Error Handling vorhanden
- ⚠️ Benötigt: `STRIPE_WEBHOOK_SECRET` Environment Variable

### Shop Frontend (`shop/shop.html`)
- ✅ Checkout-Endpoint korrigiert: `/api/checkout`
- ✅ Fetch-Request korrekt formatiert
- ✅ Error Handling vorhanden
- ✅ Weiterleitung zu Stripe implementiert

---

## 📋 Nächste Schritte

### Sofort (für lokale Tests):
1. ✅ Encoding-Fehler behoben
2. ✅ Checkout-Endpoint korrigiert
3. ✅ Git Commit erstellt

### Vor Production-Deployment:
1. ⏳ **Stripe Secret Key holen** (`sk_live_...`)
2. ⏳ **Environment Variables in Cloudflare setzen**
3. ⏳ **Stripe Webhook konfigurieren**
4. ⏳ **Webhook Secret als Environment Variable setzen**
5. ⏳ **GitHub Repository verbinden** (oder manuell deployen)

### Nach Deployment:
1. ⏳ Shop-Seite öffnen und prüfen
2. ⏳ Checkout-Flow testen
3. ⏳ Webhook-Events prüfen
4. ⏳ Success/Cancel-Seiten testen

---

## 🔗 Wichtige Links

- **Cloudflare Dashboard:** https://dash.cloudflare.com → Pages → `kaffee-faensen`
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Stripe API Keys:** https://dashboard.stripe.com/apikeys
- **Stripe Webhooks:** https://dashboard.stripe.com/webhooks
- **Projekt-URL:** https://kaffee-faensen.pages.dev
- **Lokale URL:** http://localhost:8000/shop/shop.html

---

**Status:** ✅ Frontend korrigiert, ⏳ Backend-Konfiguration ausstehend

