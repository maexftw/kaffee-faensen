# Netlify Setup - Schritt für Schritt

## 📋 Vorbereitung

Du brauchst:
- ✅ GitHub Account (hast du bereits)
- ✅ Stripe Account (hast du bereits)
- ⏳ Netlify Account (erstellen wir jetzt)

---

## 🚀 Schritt 1: Code auf GitHub pushen

Öffne Git Bash / Terminal in deinem Projekt-Ordner:

```bash
cd "i:\Wordpress_NEU\Design Projekte\CAS\CODEX"

# Prüfe Status
git status

# Füge alle Dateien hinzu
git add .

# Commit erstellen
git commit -m "Add Netlify checkout function with shopping cart"

# Zu GitHub pushen
git push origin main
```

**Wichtig**: Prüfe, dass `.env` NICHT auf GitHub ist (sollte von `.gitignore` ausgeschlossen sein)

---

## 🌐 Schritt 2: Netlify Account erstellen

### 2.1 Registrierung

1. Gehe zu **https://netlify.com**
2. Klicke auf **"Sign up"**
3. Wähle **"Sign up with GitHub"**
4. Authorisiere Netlify für deinen GitHub Account

### 2.2 Neues Projekt erstellen

1. Im Netlify Dashboard: **"Add new site"** → **"Import an existing project"**
2. Wähle **"Deploy with GitHub"**
3. Suche dein Repository: **"CODEX"** (oder wie dein Repo heißt)
4. Klicke auf das Repository

### 2.3 Build Settings

Netlify sollte die `netlify.toml` automatisch erkennen. Prüfe:

- **Branch to deploy**: `main` (oder `master`)
- **Base directory**: (leer lassen)
- **Build command**: (leer lassen)
- **Publish directory**: `.` (Punkt = aktuelles Verzeichnis)
- **Functions directory**: `netlify/functions` ✅

Klicke auf **"Deploy site"**

⏳ Warte 1-2 Minuten bis Deployment fertig ist...

---

## 🔑 Schritt 3: Environment Variables setzen

### 3.1 Zu Site Settings gehen

Im Netlify Dashboard:
1. Klicke auf **"Site settings"**
2. Im Menü links: **"Environment variables"**
3. Klicke **"Add a variable"**

### 3.2 Stripe Secret Key hinzufügen

**Variable 1:**
```
Key:   STRIPE_SECRET_KEY
Value: [Dein Stripe Secret Key aus .env Datei - beginnt mit sk_test_...]
```

**Wo findest du deinen Key?**
- In deiner `.env` Datei im Projekt
- Oder: [Stripe Dashboard → Developers → API Keys](https://dashboard.stripe.com/test/apikeys)

**Wichtig**:
- Für **Test-Modus**: `sk_test_...` (wie oben)
- Für **Production**: Verwende `sk_live_...` (aus Stripe Dashboard)

Klicke **"Create variable"**

### 3.3 Deployment neu starten

Nach dem Hinzufügen der Environment Variable:
1. Gehe zu **"Deploys"**
2. Klicke **"Trigger deploy"** → **"Clear cache and deploy site"**

⏳ Warte 1-2 Minuten...

---

## ✅ Schritt 4: Domain & URLs prüfen

### 4.1 Netlify Domain notieren

Nach dem Deployment siehst du oben deine Netlify-URL, z.B.:
```
https://adorable-cupcake-abc123.netlify.app
```

Oder falls du eine Custom Domain hast:
```
https://deine-domain.de
```

### 4.2 URLs testen

Öffne im Browser:

**Shop-Seite:**
```
https://deine-netlify-url.netlify.app/.superdesign/design_iterations/faensen_shop_1.html
```

**Success Page:**
```
https://deine-netlify-url.netlify.app/success.html
```

**Function (sollte 405 Error zeigen, weil GET nicht erlaubt):**
```
https://deine-netlify-url.netlify.app/.netlify/functions/create-checkout
```

---

## 🧪 Schritt 5: Checkout testen

### 5.1 Produkt zum Warenkorb hinzufügen

1. Öffne die Shop-Seite (von Netlify gehostet)
2. Wähle ein Produkt (z.B. "Hammer Spezial")
3. Wähle Größe (250g) und Mahlgrad (Ganze Bohne)
4. Klicke **"In den Warenkorb"**
5. Grüne Notification sollte erscheinen ✅
6. Warenkorb-Badge zeigt "1"

### 5.2 Mehrere Produkte hinzufügen

Füge 2-3 weitere Produkte hinzu (verschiedene Sorten).

### 5.3 Checkout starten

1. Klicke auf **Warenkorb-Icon** (oben rechts)
2. Du siehst alle Produkte im Alert-Dialog
3. Klicke **"OK"** (bestätigen)
4. Loading-Animation erscheint
5. Weiterleitung zu Stripe Checkout ✅

### 5.4 Stripe Checkout testen

**Test-Zahlung durchführen:**

- **Kreditkarte**: `4242 4242 4242 4242`
- **CVC**: `123`
- **Datum**: `12/34`
- **Name**: Beliebig
- **Adresse**: Beliebig (Deutschland)

Oder teste **SEPA Lastschrift**:
- Wähle "SEPA Lastschrift"
- IBAN: `DE89370400440532013000`
- Name: Beliebig

Klicke **"Bezahlen"**

### 5.5 Erfolgsmeldung

Nach erfolgreicher Zahlung:
- Weiterleitung zu `success.html` ✅
- Session ID in URL: `?session_id=cs_test_...`
- Success-Seite zeigt Bestellbestätigung

---

## 🔍 Schritt 6: Logs & Debugging

### 6.1 Netlify Function Logs

Wenn etwas nicht funktioniert:
1. Netlify Dashboard → **"Functions"**
2. Klicke auf **"create-checkout"**
3. Gehe zu **"Logs"**
4. Hier siehst du alle Requests und Fehler

### 6.2 Stripe Logs

1. Gehe zu [Stripe Dashboard → Logs](https://dashboard.stripe.com/logs)
2. Hier siehst du alle API Requests
3. Bei Fehlern steht hier die genaue Fehlermeldung

### 6.3 Browser Console

1. Öffne Shop-Seite
2. Drücke `F12` → **"Console"**
3. Hier siehst du Frontend-Fehler

---

## 🎨 Schritt 7: Custom Domain (Optional)

### Falls du eine eigene Domain hast:

1. Netlify Dashboard → **"Domain settings"**
2. **"Add custom domain"**
3. Gib deine Domain ein (z.B. `kaffeefaensen.de`)
4. Folge den Anweisungen für DNS-Einstellungen
5. Netlify generiert automatisch SSL-Zertifikat ✅

---

## ⚙️ Zahlungsmethoden konfigurieren

### Stripe Dashboard → Payment Methods

1. Gehe zu [Stripe Dashboard → Settings → Payment methods](https://dashboard.stripe.com/settings/payment_methods)

2. **Aktiviere diese Methoden:**
   - ✅ Cards (Visa, Mastercard, Amex)
   - ✅ **SEPA Debit** (Banküberweisung) ← Das brauchst du!
   - ✅ Optional: PayPal, Klarna, Giropay

3. Speichern

**Wichtig**: Alle deine Payment Links und Checkout Sessions verwenden automatisch diese Einstellungen!

---

## 📊 Test vs. Production Mode

### Test Mode (aktuell aktiv)

- Stripe Key: `sk_test_...`
- Keine echten Zahlungen
- Test-Karten funktionieren
- Ideal zum Testen

### Production Mode (für echte Verkäufe)

Wenn alles funktioniert:

1. **Stripe Dashboard** → Oben links **"View test data"** ausschalten
2. Hole **Live Keys**:
   - Gehe zu [Developers → API Keys](https://dashboard.stripe.com/apikeys)
   - Kopiere **Secret key** (beginnt mit `sk_live_`)

3. **Netlify Environment Variables** aktualisieren:
   - Site Settings → Environment variables
   - Bearbeite `STRIPE_SECRET_KEY`
   - Ersetze Test-Key durch Live-Key
   - Speichern + Neu deployen

4. **Fertig!** Jetzt werden echte Zahlungen verarbeitet 💰

---

## 🐛 Häufige Probleme

### Problem: "Function not found"

**Lösung:**
- Prüfe, ob `netlify/functions/create-checkout.js` in GitHub ist
- Prüfe `netlify.toml`: `functions = "netlify/functions"`
- Neu deployen

### Problem: "Stripe error: Invalid API Key"

**Lösung:**
- Prüfe Environment Variable in Netlify
- Key sollte mit `sk_test_` oder `sk_live_` beginnen
- Kein Leerzeichen am Anfang/Ende

### Problem: "CORS error"

**Lösung:**
- Stelle sicher, dass du die Netlify-URL verwendest (nicht `file://`)
- Prüfe, ob Function CORS Headers hat (sollte automatisch sein)

### Problem: "Items undefined"

**Lösung:**
- Prüfe Browser Console für Fehler
- Stelle sicher, dass Produkte im Warenkorb sind
- Prüfe `localStorage` (F12 → Application → Local Storage)

---

## ✅ Checkliste

Nach dem Setup sollte alles funktionieren:

- [ ] Netlify-Site ist deployed
- [ ] `STRIPE_SECRET_KEY` ist gesetzt
- [ ] Shop-Seite lädt
- [ ] Produkte können zum Warenkorb hinzugefügt werden
- [ ] Warenkorb-Badge zeigt Anzahl
- [ ] Warenkorb-Icon öffnet Übersicht
- [ ] Checkout leitet zu Stripe weiter
- [ ] Test-Zahlung funktioniert
- [ ] Success-Page erscheint
- [ ] SEPA Lastschrift ist verfügbar (in Stripe Settings)

---

## 🎉 Fertig!

Dein Shop ist jetzt live und funktioniert!

**Netlify-URL**: `https://deine-site.netlify.app`

Du kannst jetzt:
- ✅ Mehrere Produkte verkaufen
- ✅ SEPA Lastschrift akzeptieren
- ✅ Kreditkarten akzeptieren
- ✅ Automatische Rechnungen (von Stripe)

**Kosten:**
- Netlify: **€0** (bis 125.000 Function Calls/Monat)
- Stripe: **1,5% + 0,25€** pro Transaktion (nur bei Verkäufen)

Bei Fragen oder Problemen: Schau in die Function Logs oder Stripe Logs!

Viel Erfolg! ☕️🚀
