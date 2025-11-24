# Zahlungsmethoden - Kaffee Fänsen

## ✅ Aktuell aktivierte Zahlungsmethoden

### 1. Kreditkarte (Card)
- **Typ**: `card`
- **Verfügbar für**: Alle Länder (DE, AT, CH)
- **Abwicklung**: Sofort
- **Gebühren**: Standard Stripe-Gebühren

### 2. SEPA Direct Debit (Banküberweisung)
- **Typ**: `sepa_debit`
- **Verfügbar für**: Deutschland, Österreich, Schweiz (SEPA-Länder)
- **Abwicklung**: 1-2 Werktage
- **Gebühren**: Niedrigere Gebühren als Kreditkarten
- **Vorteil**: Geringere Transaktionskosten, vertraute Zahlungsmethode für deutsche Kunden
- **Status**: ✅ Aktiviert (muss im Stripe Dashboard aktiviert sein)

---

## 🔧 Konfiguration

Die Zahlungsmethoden werden in `functions/api/checkout.mjs` konfiguriert:

```javascript
'payment_method_types[0]': 'card',
'payment_method_types[1]': 'sepa_debit',
```

---

## 📋 SEPA Direct Debit Details

### Was ist SEPA Direct Debit?
SEPA Direct Debit ermöglicht es Kunden, Zahlungen direkt von ihrem Bankkonto zu autorisieren. Dies ist die Standard-Banküberweisungsmethode für den deutschen Markt.

### Kundenerlebnis:
1. Kunde wählt "Banküberweisung" im Checkout
2. Kunde gibt IBAN und Name ein
3. Kunde autorisiert die Lastschrift
4. Zahlung wird innerhalb von 1-2 Werktagen abgewickelt

### Voraussetzungen:
- Stripe-Konto muss SEPA Direct Debit aktiviert haben
- Kunde muss in einem SEPA-Land wohnen
- Billing-Adresse wird automatisch gesammelt (bereits konfiguriert)

---

## 🚫 Nicht mehr aktiviert

Die folgenden Zahlungsmethoden wurden entfernt, da sie für den deutschen Markt nicht relevant sind:

- **Bancontact**: Belgische Zahlungsmethode
- **EPS**: Österreichische Zahlungsmethode (nicht mehr benötigt, da SEPA Direct Debit für AT verfügbar ist)

---

## 🔍 Stripe Dashboard Einstellungen

Um SEPA Direct Debit zu aktivieren (falls noch nicht geschehen):

1. Gehe zu: https://dashboard.stripe.com/settings/payment_methods
2. Suche nach "SEPA Direct Debit"
3. Klicke auf "Aktivieren"
4. Folge den Anweisungen zur Verifizierung

---

## 🧪 Testen

### Test-Kreditkarte:
- Karte: `4242 4242 4242 4242`
- Ablaufdatum: Beliebige zukünftige Daten
- CVC: Beliebige 3 Ziffern

### Test-SEPA Direct Debit:
- IBAN: `DE89370400440532013000` (Test-IBAN)
- Name: Beliebiger Name
- Stripe zeigt Test-Modus an

**Hinweis**: Im Test-Modus werden SEPA-Zahlungen sofort als erfolgreich markiert, auch wenn sie normalerweise 1-2 Werktage benötigen.

---

## 📝 Weitere Informationen

- **Stripe SEPA Direct Debit Dokumentation**: https://stripe.com/docs/payments/sepa-debit
- **Stripe Payment Methods**: https://stripe.com/docs/payments/payment-methods
- **SEPA Länder**: https://stripe.com/docs/payments/sepa-debit#supported-countries

