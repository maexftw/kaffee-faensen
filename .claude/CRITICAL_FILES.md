# ⚠️ KRITISCHE DATEIEN - NICHT ANFASSEN

Diese Dateien enthalten wichtige Funktionalität und **DÜRFEN NICHT** geändert werden.

## 🔴 ABSOLUT VERBOTEN

### Backend & Checkout
```
functions/api/checkout.mjs
functions/api/stripe-webhook.mjs
```
**Warum:** Diese Dateien handhaben Stripe-Checkout und Zahlungen. Änderungen würden den gesamten Checkout-Prozess kaputt machen.

---

## 🟡 VORSICHTIG - Nur Design-Änderungen

### JavaScript-Dateien
```
shop/faensen_navigation.js
```

**Was du ändern DARFST:**
- CSS-Klassen in HTML-Strings
- HTML-Struktur für Design
- Text-Inhalte

**Was du NICHT ändern DARFST:**
- JavaScript-Funktionen (`handleCartClick`, etc.)
- Event Listeners
- Funktionslogik

---

## 🟢 SICHER ZUM ÄNDERN

### Design-Dateien
```
shop/homepage.html          ← Design OK
shop/shop.html              ← Design OK
shop/faensen_shop_theme.css ← Design OK
```

**Was du ändern DARFST:**
- Alle CSS-Styles
- HTML-Struktur (Design)
- Text-Inhalte
- Bilder, Icons
- Layout, Grid, Flexbox
- Farben, Schriftarten

**ABER:**
- Wichtige IDs müssen bleiben (siehe DESIGN_WORKFLOW.md)
- JavaScript-Funktionen müssen funktionieren bleiben

---

## 🔍 Wichtige IDs die bleiben müssen

### In homepage.html und shop.html:

```html
<!-- Cart Modal - MUSS bleiben -->
<div id="cartModal" class="cart-modal">
  <div id="cartModalBody"></div>
  <span id="cartTotalPrice"></span>
  <button id="checkoutBtn"></button>
</div>

<!-- Cart Count Badge - MUSS bleiben -->
<span id="cart-count"></span>

<!-- Navigation Cart Button - MUSS bleiben -->
<button id="cart-btn" class="header-cart">
```

### JavaScript-Funktionen die bleiben müssen:

```javascript
viewCart()           // Öffnet Modal
closeCart()          // Schließt Modal
renderCart()         // Rendert Items
removeFromCart()     // Entfernt Item
proceedToCheckout()  // Weiterleitung
updateCartCount()    // Aktualisiert Badge
```

---

## 📋 Quick Reference

| Datei | Ändern OK? | Was? |
|-------|-----------|------|
| `shop/homepage.html` | ✅ | Design, CSS, HTML-Struktur |
| `shop/shop.html` | ✅ | Design, CSS, HTML-Struktur |
| `shop/faensen_shop_theme.css` | ✅ | Alle CSS-Styles |
| `shop/faensen_navigation.js` | 🟡 | Nur Design-HTML, nicht Funktionen |
| `functions/api/checkout.mjs` | ❌ | **NICHT ANFASSEN** |
| `functions/api/stripe-webhook.mjs` | ❌ | **NICHT ANFASSEN** |

---

**Bei Unsicherheit: Immer fragen!**

