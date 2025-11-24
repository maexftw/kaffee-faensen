# Kaffee Fänsen - Vereinfachtes Deployment mit Netlify

## ✅ Was funktioniert jetzt:

### Shop-Funktionen
- ✅ **Warenkorb**: Kunden können mehrere Produkte hinzufügen
- ✅ **LocalStorage**: Warenkorb bleibt gespeichert, auch wenn Seite neu geladen wird
- ✅ **Warenkorb-Badge**: Zeigt Anzahl der Produkte in der Navigation
- ✅ **Checkout**: Alle Produkte werden zu Stripe Checkout gesendet
- ✅ **SEPA/Banküberweisung**: Nutzt dein Standard-Zahlungsprofil in Stripe

### Benötigte Services
1. **Stripe Account** (hast du bereits) ✅
2. **Netlify Account** (kostenlos, nur für 1 Function)
3. **GitHub** (für Deployment)

---

## 🚀 Deployment-Schritte

### 1. Netlify Account erstellen

1. Gehe zu [netlify.com](https://netlify.com)
2. "Sign up" → Mit GitHub verbinden
3. "Import an existing project"
4. Wähle dein GitHub Repository

### 2. Environment Variables in Netlify setzen

Netlify Dashboard → **Site settings** → **Environment variables** → **Add a variable**:

```
STRIPE_SECRET_KEY = [Dein Stripe Secret Key - beginnt mit sk_test_...]
```

**Wo findest du den Key?**
- In deiner `.env` Datei im Projekt
- Oder: [Stripe Dashboard → Developers → API Keys](https://dashboard.stripe.com/test/apikeys)

⚠️ **WICHTIG**: Für Production verwendest du deinen **Live Key** (beginnt mit `sk_live_`)

### 3. Deployment

```bash
git add .
git commit -m "Add Stripe checkout with cart"
git push
```

Netlify deployed automatisch! 🎉

### 4. Zahlungsmethoden in Stripe aktivieren

1. Gehe zu [Stripe Dashboard → Settings → Payment methods](https://dashboard.stripe.com/settings/payment_methods)
2. Aktiviere:
   - ✅ Kreditkarten (Visa, Mastercard, etc.)
   - ✅ **SEPA Lastschrift** (Banküberweisung)
   - ✅ Optional: PayPal, Klarna, etc.

**Alle Payment Links nutzen automatisch diese Einstellungen!**

---

## 🛒 Wie der Checkout funktioniert

### Für den Kunden:

1. **Produkt auswählen** (z.B. "Hammer Spezial", 250g, Filterkaffee)
2. **"In den Warenkorb"** klicken → Grüne Benachrichtigung erscheint
3. **Warenkorb-Badge** zeigt Anzahl (z.B. "3")
4. **Weitere Produkte** hinzufügen (verschiedene Sorten möglich!)
5. **Warenkorb-Icon** klicken → Übersicht der Produkte
6. **"Zur Kasse gehen"** → Weiterleitung zu Stripe
7. **Stripe Checkout**:
   - Adresse eingeben
   - Zahlungsmethode wählen (Karte, SEPA, etc.)
   - Bezahlen
8. **Success-Seite** → Bestätigung

### Technischer Ablauf:

```
Shop-Seite (localStorage)
    ↓
Netlify Function
    ↓
Stripe Checkout Session erstellen
    ↓
Weiterleitung zu Stripe
    ↓
Kunde zahlt
    ↓
Success/Cancel Page
```

---

## 📝 Dateien im Projekt

### Backend (nur 1 File!)
```
netlify/functions/create-checkout.js  → Erstellt Stripe Session
```

### Frontend
```
.superdesign/design_iterations/
├── faensen_shop_1.html              → Shop mit Warenkorb
├── faensen_navigation.js            → Navigation mit Cart Badge
├── stripe-payment-links.js          → Payment Links (nicht mehr verwendet)
└── faensen_shop_theme.css           → Styling

success.html                          → Nach erfolgreicher Zahlung
cancel.html                           → Bei Abbruch
```

### Config
```
netlify.toml                          → Netlify Konfiguration
package.json                          → Dependencies (Stripe SDK)
.env                                  → Stripe Keys (NICHT committen!)
```

---

## 🧪 Lokales Testen

### Mit Netlify CLI

```bash
# Installiere Netlify CLI
npm install -g netlify-cli

# Starte lokalen Dev Server
netlify dev
```

Die Seite läuft dann auf `http://localhost:8888` und die Functions funktionieren!

### Test-Karten

| Karte | Nummer | Ergebnis |
|-------|--------|----------|
| Visa Erfolg | 4242 4242 4242 4242 | ✅ Zahlung erfolgreich |
| Visa Abgelehnt | 4000 0000 0000 0002 | ❌ Zahlung fehlgeschlagen |

CVC: Beliebig (z.B. 123)
Datum: Beliebig in der Zukunft (z.B. 12/34)

---

## ❓ FAQ

### Warum Netlify?

Netlify hostet die **eine** kleine Function kostenlos. Du brauchst:
- Keine Datenbank
- Keinen Server
- Nur 1 Function für Checkout

**Kostenlos bis 125.000 Function Calls/Monat** → Mehr als genug!

### Kann ich später zu einem anderen Hosting wechseln?

Ja! Die Function kann auch auf:
- Vercel Functions
- AWS Lambda
- Cloudflare Workers
- Einem eigenen Server

laufen. Der Code bleibt gleich.

### Was ist mit den 110 Payment Links?

Die werden **nicht mehr verwendet**. Sie waren ein Versuch, ohne Backend zu arbeiten, aber dann hätte der Kunde nur 1 Produkt kaufen können.

Jetzt erstellen wir die Checkout Session dynamisch mit allen Produkten im Warenkorb.

### Wie füge ich Versandkosten hinzu?

In `netlify/functions/create-checkout.js` kannst du Versandoptionen hinzufügen:

```javascript
shipping_options: [
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 490, currency: 'eur' },
      display_name: 'Standardversand (3-5 Tage)'
    }
  }
]
```

### Was passiert nach erfolgreicher Zahlung?

1. Stripe leitet zur `success.html` weiter
2. Der Warenkorb wird geleert (localStorage)
3. Du bekommst eine E-Mail von Stripe
4. Optional: Webhook einrichten für automatische Bestellverwaltung

---

## 🔐 Sicherheit

✅ **API Keys**:
- Secret Key nur in Netlify Environment Variables
- Nie im Code committen (.env ist in .gitignore)

✅ **CORS**:
- Netlify Function hat CORS Headers
- Funktioniert von deiner Domain

✅ **Stripe**:
- PCI-compliant (Stripe übernimmt Zahlungsabwicklung)
- Keine Kreditkartendaten auf deinem Server

---

## 📞 Support

Bei Problemen:

1. **Netlify Function Logs**: Netlify Dashboard → Functions → Logs
2. **Stripe Logs**: [Dashboard → Developers → Logs](https://dashboard.stripe.com/logs)
3. **Browser Console**: F12 → Console (für Frontend-Fehler)

---

**Status**: ✅ Bereit für Deployment
**Komplexität**: Minimal (nur 1 Backend-Function)
**Kosten**: €0 (Netlify kostenlos, Stripe nur bei Verkäufen)

Viel Erfolg! ☕
