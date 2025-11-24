# Zahlungsmethoden - Kaffee Fänsen

## ✅ Aktuell aktivierte Zahlungsmethoden

### 1. Kreditkarte (Card)
- **Typ**: `card`
- **Verfügbar für**: Alle Länder (DE, AT, CH)
- **Abwicklung**: Sofort
- **Gebühren**: Standard Stripe-Gebühren

### 2. Banküberweisung (geplant)
- **Status**: ⏳ Noch nicht implementiert
- **Typ**: `customer_balance` mit `bank_transfer` ODER `sepa_debit`
- **Verfügbar für**: Deutschland, Österreich, Schweiz
- **Hinweis**: 
  - `customer_balance` erfordert ein Customer-Objekt (nicht aktuell implementiert)
  - `sepa_debit` kann aktiviert werden, wenn im Stripe Dashboard aktiviert

---

## 🔧 Konfiguration

Die Zahlungsmethoden werden in `functions/api/checkout.mjs` konfiguriert:

```javascript
// Aktuell nur Kreditkarte aktiviert
'payment_method_types[0]': 'card',

// Banküberweisung kann hinzugefügt werden:
// Option 1: SEPA Direct Debit (wenn im Dashboard aktiviert)
// 'payment_method_types[1]': 'sepa_debit',

// Option 2: Customer Balance Bank Transfer (erfordert Customer-Objekt)
// 'payment_method_types[1]': 'customer_balance',
// 'payment_method_options[customer_balance][funding_type]': 'bank_transfer',
// 'payment_method_options[customer_balance][bank_transfer][type]': 'eu_bank_transfer',
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

