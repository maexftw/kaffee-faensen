# Dynamic Shipping Costs Implementation

## Übersicht

Die Versandkosten werden jetzt dynamisch basierend auf dem Warenkorbgewicht und der Lieferadresse berechnet.

## Implementierte Features

### 1. Gewichtsberechnung
- **Funktion**: `calculateCartWeight(items)`
- **Berechnung**: 
  - 250g Packung = 0.25 kg
  - 500g Packung = 0.5 kg
- **Rückgabe**: Gesamtgewicht in kg

### 2. DHL Versandkosten
- **Funktion**: `calculateDHLShipping(weight)`
- **Preise** (Standard DHL Deutschland):
  - Bis 2kg: €4.90 (490 Cent)
  - Bis 5kg: €6.90 (690 Cent)
  - Bis 10kg: €8.90 (890 Cent)
  - Bis 31.5kg: €16.90 (1690 Cent)

### 3. Hamm Adressprüfung
- **Funktion**: `isHammAddress(postalCode)`
- **PLZ-Bereich**: 59063-59077
- **Verwendung**: Für kostenlosen Kurier-Versand

### 4. Versandoptionen
- **Kostenloser Kurier (Hamm)**: 
  - Nur für PLZ 59063-59077
  - Kostenlos
  - Lieferzeit: 1-2 Werktage
- **DHL Versand**: 
  - Für alle anderen Adressen
  - Gewichtsabhängig
  - Lieferzeit: 2-5 Werktage

## Technische Details

### Stripe Checkout Limitation
Stripe Checkout zeigt Versandoptionen **vor** der Adresseingabe an. Daher werden beide Optionen (Hamm Kurier + DHL) allen Kunden angezeigt.

**Lösung**: 
- Kunden aus Hamm können kostenlosen Kurier wählen
- Andere Kunden sollten DHL wählen
- Optional: Backend-Validierung im Webhook, um sicherzustellen, dass nur Hamm-Adressen kostenlosen Kurier erhalten

### Zukünftige Verbesserungen
- Stripe Shipping Rate Calculation API verwenden für dynamische Filterung
- Backend-Validierung im Webhook hinzufügen
- Automatische Auswahl der richtigen Versandoption basierend auf Adresse

## Entfernte Features
- ❌ "Kostenloser Versand ab 30€" Option wurde entfernt

## Testing

### Test-Szenarien:
1. **Hamm Adresse (PLZ 59063-59077)**:
   - Sollte kostenlosen Kurier sehen
   - Kann DHL als Alternative wählen

2. **Andere Adresse**:
   - Sollte DHL Versand sehen (gewichtsabhängig)
   - Kann kostenlosen Kurier sehen, sollte aber DHL wählen

3. **Gewichtstests**:
   - 1kg (4x 250g) → €4.90 DHL
   - 3kg (6x 500g) → €6.90 DHL
   - 7kg (14x 500g) → €8.90 DHL
   - 15kg (30x 500g) → €16.90 DHL

## Dateien

- `functions/api/checkout.mjs` - Hauptimplementierung
  - `calculateCartWeight()` - Gewichtsberechnung
  - `calculateDHLShipping()` - DHL-Kostenberechnung
  - `isHammAddress()` - Hamm-Adressprüfung
  - `shippingOptions()` - Dynamische Versandoptionen

