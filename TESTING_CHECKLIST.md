# Testing Checklist - Kaffee Fänsen Integration

## ✅ Aktueller Status

- ✅ **GitHub Repository**: Gepusht und verbunden
- ✅ **Cloudflare Pages**: Deployment aktiviert
- ✅ **STRIPE_SECRET_KEY**: Als Secret gesetzt
- ✅ **SITE_URL**: In `wrangler.toml` konfiguriert

---

## 🧪 Tests die durchgeführt werden sollten

### 1. Frontend-Tests

#### Shop-Seite öffnen
- [ ] URL: https://kaffee-faensen.pages.dev/shop/shop.html
- [ ] Seite lädt ohne Fehler
- [ ] Produkte werden angezeigt
- [ ] Navigation funktioniert

#### Warenkorb-Funktionalität
- [ ] Produkt zum Warenkorb hinzufügen
- [ ] Warenkorb-Anzahl wird aktualisiert
- [ ] Mehrere Produkte hinzufügen
- [ ] Warenkorb-Ansicht öffnen

### 2. Checkout-Flow Test

#### Checkout starten
- [ ] Produkte im Warenkorb haben
- [ ] "Zur Kasse" Button klicken
- [ ] Loading-Indikator wird angezeigt
- [ ] Weiterleitung zu Stripe Checkout erfolgt

#### Stripe Checkout
- [ ] Stripe Checkout-Seite öffnet sich
- [ ] Produkte werden korrekt angezeigt
- [ ] Versandoptionen sind verfügbar
- [ ] Preise sind korrekt

#### Test-Zahlung (Stripe Test Mode)
- [ ] Test-Kartendaten eingeben:
  - Karte: `4242 4242 4242 4242`
  - Ablaufdatum: Beliebige zukünftige Daten
  - CVC: Beliebige 3 Ziffern
- [ ] Zahlung abschließen
- [ ] Weiterleitung zu Success-Seite

#### Success-Seite
- [ ] Erfolgreiche Weiterleitung zu `/success.html`
- [ ] Success-Message wird angezeigt
- [ ] Session-ID wird korrekt übergeben

### 3. Backend-Function Tests

#### Checkout-Endpoint
- [ ] Endpoint erreichbar: `/api/checkout`
- [ ] POST-Request mit Cart-Items funktioniert
- [ ] Response enthält `url` für Stripe Checkout
- [ ] Fehlerbehandlung bei leerem Warenkorb

#### Error-Handling
- [ ] Leerer Warenkorb → Fehler-Message
- [ ] Ungültige Daten → Fehler-Message
- [ ] Network-Error → Fehler-Message

### 4. Browser-Konsole prüfen

#### Keine Fehler
- [ ] Keine JavaScript-Errors
- [ ] Keine CORS-Errors
- [ ] Keine 404/500 Errors
- [ ] Keine Stripe-API-Errors

#### Network-Tab
- [ ] `/api/checkout` Request erfolgreich (200)
- [ ] Response-Zeit akzeptabel (< 2 Sekunden)
- [ ] Keine fehlgeschlagenen Requests

---

## 🔧 Bekannte Probleme / Zu prüfen

### Response-Struktur
Die `checkout.mjs` Function gibt zurück:
```javascript
{ sessionId: session.id, url: session.url }
```

Das Frontend (`shop.html`) erwartet:
```javascript
const { url } = await response.json();
```

**Status**: ✅ Sollte funktionieren, da `url` vorhanden ist

---

## 🚀 Nächste Schritte nach erfolgreichem Test

### 1. Stripe Webhook konfigurieren
- [ ] Gehe zu: https://dashboard.stripe.com/webhooks
- [ ] Füge Endpoint hinzu: `https://kaffee-faensen.pages.dev/api/stripe-webhook`
- [ ] Wähle Events:
  - `checkout.session.completed`
  - `checkout.session.expired`
  - `payment_intent.succeeded`
- [ ] Kopiere Webhook Secret (`whsec_...`)
- [ ] Setze `STRIPE_WEBHOOK_SECRET` im Cloudflare Dashboard

### 2. Webhook testen
- [ ] Test-Zahlung durchführen
- [ ] Webhook-Events in Stripe Dashboard prüfen
- [ ] Webhook-Logs in Cloudflare prüfen

### 3. Production-Ready machen
- [ ] Alle Tests erfolgreich
- [ ] Webhook funktioniert
- [ ] Error-Logging aktiviert
- [ ] Monitoring eingerichtet

---

## 📝 Test-Protokoll

**Datum**: _______________
**Tester**: _______________

### Ergebnisse:

**Frontend**:
- Shop-Seite: [ ] ✅ [ ] ❌
- Warenkorb: [ ] ✅ [ ] ❌
- Navigation: [ ] ✅ [ ] ❌

**Checkout**:
- Checkout-Start: [ ] ✅ [ ] ❌
- Stripe-Redirect: [ ] ✅ [ ] ❌
- Zahlung: [ ] ✅ [ ] ❌
- Success-Seite: [ ] ✅ [ ] ❌

**Backend**:
- Checkout-Endpoint: [ ] ✅ [ ] ❌
- Error-Handling: [ ] ✅ [ ] ❌

**Browser-Konsole**:
- Errors: [ ] Keine [ ] Fehler gefunden
- Network: [ ] Alle Requests OK [ ] Fehler gefunden

**Notizen**:
_________________________________________________
_________________________________________________
_________________________________________________

---

## 🔗 Nützliche Links

- **Shop-Seite**: https://kaffee-faensen.pages.dev/shop/shop.html
- **Cloudflare Dashboard**: https://dash.cloudflare.com → Workers & Pages → Pages → kaffee-faensen
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Stripe Webhooks**: https://dashboard.stripe.com/webhooks
- **GitHub Repository**: https://github.com/maexftw/kaffee-faensen

