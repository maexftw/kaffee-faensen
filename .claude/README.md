# Claude Design Workspace

Willkommen! Dieser Ordner enthält alle Informationen, die du brauchst, um sicher am Design zu arbeiten.

## 📚 Dokumentation

1. **`DESIGN_WORKFLOW.md`** - Hauptanleitung
   - Was du ändern darfst
   - Was du NICHT ändern darfst
   - Schritt-für-Schritt Anleitung
   - Checklisten

2. **`CRITICAL_FILES.md`** - Kritische Dateien
   - Liste aller Dateien die nicht geändert werden dürfen
   - Wichtige IDs und Funktionen
   - Quick Reference

## 🎯 Schnellstart

1. **Lies `DESIGN_WORKFLOW.md`** - Verstehe die Regeln
2. **Lies `CRITICAL_FILES.md`** - Kenne die Verbote
3. **Arbeite am Design** - Nur HTML/CSS ändern
4. **Teste Funktionalität** - Warenkorb muss funktionieren
5. **Übergib an Composer** - Composer pusht die Änderungen

## ⚠️ Wichtigste Regel

**NIE `functions/api/` Dateien ändern!**
Diese Dateien handhaben Stripe-Checkout und Zahlungen.

## ✅ Design-Änderungen sind OK in:

- `shop/homepage.html`
- `shop/shop.html`
- `shop/faensen_shop_theme.css`
- Design-HTML in `shop/faensen_navigation.js`

## ❌ Funktionalität NICHT ändern:

- JavaScript-Funktionen
- Backend-Dateien (`functions/api/`)
- Wichtige HTML-IDs
- Event Listeners

---

**Viel Erfolg! 🎨**

