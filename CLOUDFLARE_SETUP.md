# Cloudflare Pages + Stripe Setup

Dieses Projekt ist jetzt für Cloudflare Pages vorbereitet (inkl. Functions für Checkout & Webhook). So richtest du alles ein:

---

## 1. Lokale Vorbereitung
1. `npm install`
2. `npm run dev` startet `wrangler pages dev .` (Pages + Functions lokal auf http://localhost:8788)

---

## 2. Cloudflare Pages Projekt anlegen
1. `wrangler login`
2. `wrangler pages project create kaffee-faensen` (oder UI)
3. Repository mit Cloudflare verbinden (Pages Dashboard) **oder** lokal deployen:
   ```bash
   npm run deploy
   ```
   Das deployt den aktuellen Stand aus dem Ordner `.` inkl. `functions/`.

---

## 3. Environment Variablen / Secrets
Setze die Secrets im Pages-Projekt (Dashboard oder CLI):

```bash
wrangler pages secret put STRIPE_SECRET_KEY
wrangler pages secret put STRIPE_WEBHOOK_SECRET
wrangler pages secret put STRIPE_PUBLISHABLE_KEY   # Falls du ihn im Frontend nutzt
wrangler pages secret put SITE_URL                 # z.B. https://kaffee-faensen.pages.dev
```

Optional: `CORS_ALLOW_ORIGIN` wenn du die Checkout-Function nur für bestimmte Domains öffnen willst.

---

## 4. Stripe-Webhooks
1. Webhook-Endpunkt: `https://<deine-domain>/api/stripe-webhook`
2. Events: `checkout.session.completed`, `checkout.session.expired`, `payment_intent.succeeded`, `payment_intent.payment_failed`
3. Secret kopieren und als `STRIPE_WEBHOOK_SECRET` setzen.

---

## 5. Checkout testen
1. Im Shop Warenkorb füllen.
2. Checkout löst POST auf `/api/checkout` aus → Stripe Checkout öffnet.
3. Testkarte (`4242 4242 4242 4242`) nutzen.
4. Nach Erfolg sollte `success.html` laden und der Webhook loggt das Event (Cloudflare Logs).

---

## 6. Deployment / CI
- Push auf `main` → Cloudflare Pages baut automatisch (wenn verbunden).
- Alternativ: `npm run deploy`.
- Logs ansehen: `wrangler pages deployment tail kaffee-faensen`

---

## 7. Nächste Schritte
- Optional: zusätzliche Functions (z.B. `get-session-details`) bauen.
- Durable Objects / KV für persistente Warenkörbe ergänzen.
- Payment Links Script (`shop/stripe-payment-links.js`) bei Preisänderungen neu generieren (`npm run stripe:products`).

Viel Erfolg! 🎉
