# Secrets für Cloudflare Pages setzen

## ⚠️ WICHTIG: Secrets vs. Environment Variables

- **Environment Variables** (Plain Text): Werden über `wrangler.toml` verwaltet
- **Secrets** (Encrypted): Müssen über Cloudflare Dashboard oder `wrangler secret put` gesetzt werden

---

## 🔐 Secrets die gesetzt werden müssen

### 1. STRIPE_SECRET_KEY
- **Wert**: `sk_live_...` (aus Stripe Dashboard kopieren)
- **Verwendung**: Wird in `functions/api/checkout.mjs` verwendet, um Stripe Checkout Sessions zu erstellen
- **⚠️ WICHTIG**: Den vollständigen Key aus dem Stripe Dashboard kopieren und hier als Secret setzen

### 2. STRIPE_WEBHOOK_SECRET (später)
- **Wert**: `whsec_...` (wird nach Webhook-Setup benötigt)
- **Verwendung**: Wird in `functions/api/stripe-webhook.mjs` verwendet, um Webhook-Signaturen zu verifizieren

---

## 📋 Methode 1: Cloudflare Dashboard (Empfohlen)

1. **Gehe zu Cloudflare Dashboard:**
   - https://dash.cloudflare.com
   - Navigiere zu **Workers & Pages** → **Pages**

2. **Wähle das Projekt:**
   - Klicke auf **kaffee-faensen**

3. **Gehe zu Settings:**
   - Klicke auf **Settings** (oben im Menü)
   - Scrolle zu **Environment Variables**

4. **Füge Secrets hinzu:**
   - Klicke auf **Add variable**
   - **Variable name**: `STRIPE_SECRET_KEY`
   - **Value**: Den vollständigen Stripe Secret Key aus dem Stripe Dashboard einfügen (`sk_live_...`)
   - **⚠️ WICHTIG**: Wähle **"Secret Text"** oder aktiviere **"Encrypt"**
   - Klicke auf **Save**

5. **Wiederhole für STRIPE_WEBHOOK_SECRET** (später, nach Webhook-Setup)

---

## 💻 Methode 2: Wrangler CLI

Alternativ kannst du Secrets auch über die Kommandozeile setzen:

```powershell
# Navigiere zum Projekt-Verzeichnis
cd D:\Arbeit\Workflow\Faensen\kaffee-faensen

# Setze STRIPE_SECRET_KEY
wrangler secret put STRIPE_SECRET_KEY
# Dann den vollständigen Stripe Secret Key eingeben (sk_live_...)

# Später: Setze STRIPE_WEBHOOK_SECRET
wrangler secret put STRIPE_WEBHOOK_SECRET
# Dann den Wert eingeben: whsec_...
```

**Hinweis**: Du musst vorher mit `wrangler login` eingeloggt sein.

---

## ✅ Environment Variables in wrangler.toml

Die folgenden Variablen sind bereits in `wrangler.toml` konfiguriert:

```toml
[vars]
SITE_URL = "https://kaffee-faensen.pages.dev"
```

Diese werden automatisch beim Deployment verwendet.

---

## 🔍 Prüfen ob Secrets gesetzt sind

### Über Dashboard:
- Gehe zu **Settings** → **Environment Variables**
- Secrets werden als `***hidden***` angezeigt (Wert ist nicht sichtbar)

### Über Wrangler CLI:
```powershell
wrangler secret list
```

---

## 📝 Aktueller Status

- ✅ `SITE_URL`: In `wrangler.toml` gesetzt
- ⏳ `STRIPE_SECRET_KEY`: Muss als Secret gesetzt werden
- ⏳ `STRIPE_WEBHOOK_SECRET`: Wird nach Webhook-Setup benötigt

---

## 🚀 Nach dem Setzen

1. **Trigger ein neues Deployment:**
   - Push einen neuen Commit zu GitHub, oder
   - Gehe zu **Deployments** → **Retry deployment**

2. **Teste die Checkout-Funktion:**
   - Besuche: https://kaffee-faensen.pages.dev/shop/shop.html
   - Füge Produkte zum Warenkorb hinzu
   - Teste den Checkout-Flow

3. **Konfiguriere Stripe Webhook:**
   - Gehe zu: https://dashboard.stripe.com/webhooks
   - Füge Endpoint hinzu: `https://kaffee-faensen.pages.dev/api/stripe-webhook`
   - Wähle Events: `checkout.session.completed`, `checkout.session.expired`
   - Kopiere den Webhook Secret (`whsec_...`)
   - Setze `STRIPE_WEBHOOK_SECRET` als Secret

---

## 🔒 Sicherheit

- **Niemals** Secrets in Git committen!
- Secrets werden im Dashboard nach dem Setzen nicht mehr angezeigt
- Bewahre Secrets sicher auf (z.B. in einem Password Manager)
- Verwende unterschiedliche Keys für Test und Production

