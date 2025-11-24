# 🚀 Kaffee Fänsen - Deployment Status

**Stand:** Januar 2025  
**Projekt:** kaffee-faensen  
**Platform:** Cloudflare Pages

---

## ✅ Was wurde bereits erledigt

### 1. Projekt-Setup
- ✅ Cloudflare Pages Projekt erstellt: `kaffee-faensen`
- ✅ Projekt-URL: `https://kaffee-faensen.pages.dev`
- ✅ Production Branch: `main`
- ✅ Deployment vorhanden

### 2. API-Integration
- ✅ Cloudflare API Token konfiguriert (aus Kost-Projekt)
- ✅ API Token hat Pages-Permissions
- ✅ Account ID ermittelt: `0b89c7fb41809fb9a2c2e78999e9a02e`
- ✅ Deployment-Scripts erstellt

### 3. Dokumentation
- ✅ README.md aktualisiert
- ✅ DEPLOYMENT_SUMMARY.md erstellt
- ✅ DEPLOYMENT_CHECKLIST.md erstellt
- ✅ API-Setup-Dokumentation erstellt

### 4. Stripe-Keys
- ✅ Public Key vorhanden: `pk_live_51Qux1QA474V2RPC70UGsqm5kVzdp4zdFKuyl1L0DZy2LiDbzwGIiQNR78SHXdMDIB6jZgE8O061OvRKTXMra5tTs009lPwFNzL`

---

## ⏳ Noch zu erledigen

### 1. Environment Variables setzen

**Im Cloudflare Dashboard:**
1. Gehe zu: https://dash.cloudflare.com → Pages → `kaffee-faensen` → Settings → Environment Variables
2. Füge folgende Variables hinzu:

| Variable | Type | Wert | Status |
|----------|------|------|--------|
| `SITE_URL` | Plain text | `https://kaffee-faensen.pages.dev` | ⏳ |
| `STRIPE_PUBLISHABLE_KEY` | Plain text | `pk_live_51Qux1QA474V2RPC70UGsqm5kVzdp4zdFKuyl1L0DZy2LiDbzwGIiQNR78SHXdMDIB6jZgE8O061OvRKTXMra5tTs009lPwFNzL` | ⏳ |
| `STRIPE_SECRET_KEY` | **Secret text** | `sk_live_...` (aus Stripe Dashboard) | ⏳ |
| `STRIPE_WEBHOOK_SECRET` | **Secret text** | `whsec_...` (nach Webhook-Setup) | ⏳ |

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

### 3. GitHub Repository verbinden (falls noch nicht geschehen)

1. Cloudflare Dashboard → Pages → `kaffee-faensen` → Settings → Builds & deployments
2. "Connect to Git" klicken
3. GitHub Repository auswählen
4. Branch: `main`
5. Build Settings:
   - Framework: None
   - Build command: (leer)
   - Output directory: `/`

### 4. Testing

Nachdem alles konfiguriert ist:

1. **Shop-Seite öffnen:**
   - URL: `https://kaffee-faensen.pages.dev/shop/shop.html`

2. **Checkout testen:**
   - Produkt zum Warenkorb hinzufügen
   - Zur Kasse gehen
   - Test-Zahlung durchführen

3. **Webhook prüfen:**
   - Stripe Dashboard → Webhooks → Latest events
   - Prüfe ob Events ankommen

---

## 📋 Schnellstart-Anleitung (für später)

### Schritt 1: Stripe Secret Key holen

1. Gehe zu: https://dashboard.stripe.com/apikeys
2. Finde "Secret key" (beginnt mit `sk_live_`)
3. Klicke "Reveal" um den Key zu sehen
4. Kopiere den Key

### Schritt 2: Environment Variables setzen

**Option A: Via Cloudflare Dashboard (Empfohlen)**
- Gehe zu: https://dash.cloudflare.com → Pages → `kaffee-faensen` → Settings → Environment Variables
- Füge alle 4 Variables hinzu (siehe Tabelle oben)

**Option B: Via Script (falls API verfügbar)**
```powershell
# Script anpassen mit Secret Key, dann ausführen:
powershell -ExecutionPolicy Bypass -File set-stripe-variables.ps1
```

### Schritt 3: Webhook konfigurieren

- Siehe Abschnitt "Stripe Webhook konfigurieren" oben

### Schritt 4: Testen

- Shop öffnen und Checkout testen

---

## 🔧 Nützliche Scripts

Alle Scripts befinden sich im Projekt-Root:

- `deploy-cloudflare-pages-simple.ps1` - Deployment-Script
- `get-project-details.ps1` - Projekt-Info abrufen
- `test-pages-api.ps1` - API-Verbindung testen
- `set-env-vars-correct.ps1` - Environment Variables Info

---

## 📞 Wichtige Links

- **Cloudflare Dashboard:** https://dash.cloudflare.com → Pages → `kaffee-faensen`
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Stripe API Keys:** https://dashboard.stripe.com/apikeys
- **Stripe Webhooks:** https://dashboard.stripe.com/webhooks
- **Projekt-URL:** https://kaffee-faensen.pages.dev

---

## ✅ Checkliste für später

- [ ] Stripe Secret Key holen (`sk_live_...`)
- [ ] Environment Variables im Cloudflare Dashboard setzen:
  - [ ] SITE_URL
  - [ ] STRIPE_PUBLISHABLE_KEY
  - [ ] STRIPE_SECRET_KEY (Secret text!)
  - [ ] STRIPE_WEBHOOK_SECRET (Secret text!)
- [ ] Stripe Webhook konfigurieren
- [ ] Webhook Secret als Environment Variable setzen
- [ ] GitHub Repository verbinden (falls nötig)
- [ ] Shop testen
- [ ] Checkout-Flow testen
- [ ] Webhook-Events prüfen

---

**Status:** ⏳ Wartet auf Environment Variables Setup

**Nächster Schritt:** Stripe Secret Key holen und Environment Variables setzen

