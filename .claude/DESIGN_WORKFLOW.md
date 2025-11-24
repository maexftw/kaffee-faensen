# Design Workflow für Claude

## 🎨 Wichtige Regeln

### ✅ WAS DU ÄNDERN DARFST (Design & Content)

1. **CSS Styles** (`shop/faensen_shop_theme.css`, inline `<style>` in HTML)
   - Farben, Schriftarten, Abstände
   - Layout, Grid, Flexbox
   - Animationen, Transitions
   - Responsive Breakpoints
   - Hover-Effekte, Shadows, Borders

2. **HTML Struktur** (Design-bezogen)
   - Klassen-Namen für Styling
   - HTML-Elemente für Layout
   - Text-Inhalte
   - Bilder, Icons

3. **Design-Komponenten**
   - Cards, Buttons, Modals
   - Navigation, Header, Footer
   - Hero-Sections, Sections
   - Trust-Bar, Features

### ❌ WAS DU NICHT ÄNDERN DARFST (Technik & Funktionalität)

1. **JavaScript-Funktionen** - NUR wenn explizit für Design-Änderungen nötig
   - `addToCart()` Funktion
   - `viewCart()`, `closeCart()`, `renderCart()`
   - `updateCartCount()`
   - `proceedToCheckout()`
   - `removeFromCart()`
   - Event Listeners für Cart-Modal
   - LocalStorage-Operationen

2. **Backend-Integration**
   - `functions/api/checkout.mjs` - **NICHT ANFASSEN**
   - `functions/api/stripe-webhook.mjs` - **NICHT ANFASSEN**
   - Stripe-Integration
   - Versandkosten-Berechnung

3. **Wichtige HTML-Attribute**
   - `id="cartModal"`, `id="cartModalBody"`, `id="cartTotalPrice"` - **MÜSSEN BLEIBEN**
   - `onclick="viewCart()"`, `onclick="closeCart()"` - **MÜSSEN BLEIBEN**
   - `data-lucide` Attribute für Icons
   - `href` Links zu Shop/Checkout

4. **Navigation**
   - `shop/faensen_navigation.js` - **NUR Design-Änderungen**
   - Navigation-Struktur muss funktional bleiben

---

## 📁 Projektstruktur

```
kaffee-faensen/
├── shop/
│   ├── homepage.html          ← Design-Änderungen OK
│   ├── shop.html              ← Design-Änderungen OK
│   ├── faensen_navigation.js  ← Design-Änderungen OK (aber Funktionen behalten!)
│   └── faensen_shop_theme.css ← Design-Änderungen OK
│
├── functions/
│   └── api/
│       ├── checkout.mjs       ← ❌ NICHT ANFASSEN
│       └── stripe-webhook.mjs ← ❌ NICHT ANFASSEN
│
└── .claude/
    └── DESIGN_WORKFLOW.md    ← Diese Datei
```

---

## 🎯 Design-Änderungen durchführen

### Schritt 1: Datei identifizieren
- Welche Datei muss geändert werden?
- Ist es Design oder Funktionalität?

### Schritt 2: Backup-Check
- Wichtige IDs und Funktionen identifizieren
- Sicherstellen, dass JavaScript-Funktionen weiterhin funktionieren

### Schritt 3: Änderungen machen
- Nur CSS/HTML für Design
- Keine JavaScript-Logik ändern (außer für Design-Interaktionen)

### Schritt 4: Test-Checkliste
Nach Design-Änderungen prüfen:
- [ ] Warenkorb öffnet sich noch?
- [ ] Warenkorb schließt sich noch?
- [ ] Produkte können zum Warenkorb hinzugefügt werden?
- [ ] Navigation funktioniert?
- [ ] Checkout-Button funktioniert?
- [ ] Mobile Responsive?
- [ ] Keine JavaScript-Fehler in der Console?

---

## 🔧 Wichtige IDs & Funktionen (MÜSSEN BLEIBEN)

### Cart Modal IDs:
```html
<div id="cartModal" class="cart-modal">
  <div id="cartModalBody"></div>
  <span id="cartTotalPrice"></span>
  <button id="checkoutBtn"></button>
</div>
```

### JavaScript Funktionen:
```javascript
// Diese Funktionen MÜSSEN existieren:
viewCart()           // Öffnet Cart-Modal
closeCart()          // Schließt Cart-Modal
renderCart()         // Rendert Cart-Items
removeFromCart()     // Entfernt Item aus Cart
proceedToCheckout()  // Weiterleitung zum Checkout
updateCartCount()    // Aktualisiert Badge-Zahl
```

### Navigation:
```javascript
// In faensen_navigation.js:
handleCartClick()    // Muss viewCart() aufrufen
```

---

## 🎨 Design-Bereiche zum Anpassen

### 1. Farben & Theme
- CSS Variables in `faensen_shop_theme.css`
- `--color-primary`, `--color-secondary`, etc.

### 2. Typografie
- Font-Families
- Font-Sizes
- Line-Heights

### 3. Spacing & Layout
- Padding, Margin
- Grid, Flexbox
- Container-Widths

### 4. Komponenten
- Buttons (Styles, nicht Funktionalität)
- Cards
- Modals (Design, nicht Funktionalität)
- Forms

---

## 📝 Beispiel: Sichere Design-Änderung

### ✅ RICHTIG - Design ändern:
```css
/* CSS ändern ist OK */
.btn-primary {
  background: #FF6B35;  /* Neue Farbe */
  border-radius: 12px;   /* Neue Border-Radius */
  padding: 16px 32px;    /* Neues Padding */
}
```

```html
<!-- HTML-Struktur ändern ist OK -->
<div class="hero">
  <h1 class="hero-title">Neuer Titel</h1>
  <p class="hero-subtitle">Neuer Untertitel</p>
</div>
```

### ❌ FALSCH - Funktionalität ändern:
```javascript
// ❌ NICHT die Funktion ändern!
function viewCart() {
  // Diese Funktion muss bleiben wie sie ist!
  // Nur Design-Änderungen im Modal sind OK
}
```

```html
<!-- ❌ NICHT wichtige IDs ändern! -->
<div id="cartModal">  <!-- Muss "cartModal" bleiben! -->
```

---

## 🚀 Nach Design-Änderungen

1. **Änderungen dokumentieren**
   - Was wurde geändert?
   - Welche Dateien?

2. **Commit-Message vorbereiten**
   ```
   Design: [Beschreibung der Änderung]
   Beispiel: "Design: Update button styles and hero section colors"
   ```

3. **An Composer übergeben**
   - Composer pusht die Änderungen
   - Composer testet Funktionalität

---

## ⚠️ WICHTIGE WARNUNGEN

1. **NIE `functions/api/` Dateien ändern**
   - Das würde Checkout kaputt machen!

2. **NIE Cart-Funktionalität ändern**
   - IDs müssen bleiben
   - Funktionen müssen bleiben

3. **NIE Stripe-Integration ändern**
   - Checkout würde nicht mehr funktionieren

4. **Immer testen**
   - Warenkorb testen
   - Navigation testen
   - Mobile testen

---

## 📞 Bei Unsicherheit

Wenn du nicht sicher bist, ob eine Änderung sicher ist:
1. **Frage nach** - Lieber einmal zu viel fragen
2. **Kleine Änderungen** - Schritt für Schritt
3. **Backup machen** - Git commit vor großen Änderungen

---

## ✅ Checkliste vor dem Übergeben an Composer

- [ ] Nur Design-Dateien geändert (HTML/CSS)
- [ ] Keine JavaScript-Funktionen geändert
- [ ] Keine Backend-Dateien geändert
- [ ] Wichtige IDs bleiben erhalten
- [ ] Cart-Funktionalität getestet
- [ ] Navigation getestet
- [ ] Mobile Responsive getestet
- [ ] Keine JavaScript-Fehler in Console
- [ ] Änderungen dokumentiert

---

**Viel Erfolg beim Designen! 🎨**

