# Environment Variables für Cloudflare Pages

## ⚠️ WICHTIG: Unterschied zwischen Variables und Secrets

Für dieses Projekt werden Environment Variables über **`wrangler.toml`** verwaltet. Nur **Secrets** (verschlüsselte Variablen) können über das Cloudflare Dashboard gesetzt werden.

**Siehe `SET_SECRETS.md` für Anleitung zum Setzen von Secrets!**

---

## 📋 Environment Variables (in wrangler.toml)

Diese Variablen sind bereits in `wrangler.toml` konfiguriert:

### SITE_URL
- **Wert**: `https://kaffee-faensen.pages.dev`
- **Verwaltung**: `wrangler.toml` → `[vars]` Sektion
- **Beschreibung**: Die Production-URL der Website

---

## 🔐 Secrets (müssen über Dashboard gesetzt werden)

Diese Secrets müssen über das Cloudflare Dashboard oder `wrangler secret put` gesetzt werden:

### STRIPE_SECRET_KEY
- **Wert**: `sk_live_...` (aus Stripe Dashboard kopieren)
- **Verwendung**: Wird in `functions/api/checkout.mjs` verwendet
- **⚠️ WICHTIG**: Muss als Secret gesetzt werden! Den vollständigen Key aus dem Stripe Dashboard verwenden.

### STRIPE_WEBHOOK_SECRET (später)
- **Wert**: `whsec_...` (wird nach Webhook-Setup benötigt)
- **Verwendung**: Wird in `functions/api/stripe-webhook.mjs` verwendet
- **⚠️ WICHTIG**: Muss als Secret gesetzt werden!

**📖 Vollständige Anleitung**: Siehe `SET_SECRETS.md`

---

## 🌍 Environment: Production vs. Preview

- **Production**: Für die Live-Website (`kaffee-faensen.pages.dev`)
- **Preview**: Für Preview-Deployments (optional, kann später gesetzt werden)

Setze die Variablen zunächst für **Production**. Wenn du auch Preview-Deployments testen möchtest, kannst du die gleichen Variablen auch für Preview setzen.

---

## ✅ Nach dem Setzen

Nachdem alle Variablen gesetzt sind:

1. **Trigger ein neues Deployment:**
   - Gehe zu **Deployments**
   - Klicke auf **Retry deployment** beim neuesten Deployment
   - Oder pushe einen neuen Commit zu GitHub

2. **Teste die Checkout-Funktion:**
   - Besuche: https://kaffee-faensen.pages.dev/shop/shop.html
   - Füge Produkte zum Warenkorb hinzu
   - Teste den Checkout-Flow

3. **Konfiguriere Stripe Webhook:**
   - Gehe zu: https://dashboard.stripe.com/webhooks
   - Füge Endpoint hinzu: `https://kaffee-faensen.pages.dev/api/stripe-webhook`
   - Wähle Events: `checkout.session.completed`, `checkout.session.expired`
   - Kopiere den Webhook Secret (`whsec_...`)
   - Setze `STRIPE_WEBHOOK_SECRET` im Cloudflare Dashboard

---

## 🔒 Sicherheit

- **Niemals** Secrets in Git committen!
- Secrets werden im Dashboard nach dem Setzen nicht mehr angezeigt
- Bewahre Secrets sicher auf (z.B. in einem Password Manager)
- Verwende unterschiedliche Keys für Test und Production

---

## 📝 Aktueller Status

- ✅ `SITE_URL`: In `wrangler.toml` gesetzt
- ⏳ `STRIPE_SECRET_KEY`: Muss als Secret gesetzt werden (siehe `SET_SECRETS.md`)
- ⏳ `STRIPE_WEBHOOK_SECRET`: Wird nach Webhook-Setup benötigt (siehe `SET_SECRETS.md`)

---

## 📖 Weitere Informationen

- **Secrets setzen**: Siehe `SET_SECRETS.md` für vollständige Anleitung
- **wrangler.toml**: Enthält Plain Text Environment Variables

