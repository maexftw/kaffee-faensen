# 📊 BF6 Squad Stats - Update Anleitung

## ⚠️ Problem: PHP ist nicht installiert

Da PHP nicht installiert ist, nutzen wir eine **einfachere Lösung**: Die Stats werden direkt im HTML-Code gespeichert und können manuell aktualisiert werden.

## ✅ Aktuelle Lösung: bf6_team_10.html

Die neue Datei **bf6_team_10.html** benötigt keinen Server mehr!

### So funktioniert es:

1. **Öffne bf6_team_10.html direkt im Browser** (Doppelklick auf die Datei)
2. Die Stats werden aus einem JavaScript-Objekt geladen (kein Server nötig!)
3. Um Stats zu aktualisieren, editiere einfach das HTML

## 🔄 Stats aktualisieren

### Schritt 1: Öffne bf6_team_10.html in einem Text-Editor

Finde diese Zeile (ca. Zeile 114):

```javascript
const trackerStats = {
  '3179257088': { // Maex / mad
    kd: '1.47',
    wins: '234',
    winrate: '43%'
  }
};
```

### Schritt 2: Hole die aktuellen Stats von Tracker.gg

1. Öffne: https://tracker.gg/bf6/profile/3179257088/overview
2. Notiere die aktuellen Stats:
   - K/D Ratio
   - Wins (Siege)
   - Win % (Win Rate)

### Schritt 3: Update die Werte

Ersetze die Werte im Code:

```javascript
const trackerStats = {
  '3179257088': { // Maex / mad
    kd: '2.15',      // ← Neue K/D
    wins: '456',     // ← Neue Wins
    winrate: '58%'   // ← Neue Win Rate
  }
};
```

### Schritt 4: Speichern und Reload

1. Speichere die Datei (Strg+S)
2. Reload die Seite im Browser (F5)
3. ✅ Die neuen Stats werden angezeigt!

## 📝 Weitere Spieler hinzufügen

Du kannst auch Stats für andere Squad-Mitglieder hinzufügen:

```javascript
const trackerStats = {
  '3179257088': { // Maex / mad
    kd: '1.47',
    wins: '234',
    winrate: '43%'
  },
  'TRACKER_ID_DIRK': { // Dirk
    kd: '1.82',
    wins: '312',
    winrate: '51%'
  },
  'TRACKER_ID_MARKUS': { // Markus
    kd: '1.23',
    wins: '189',
    winrate: '38%'
  }
};
```

Dann füge in den HTML-Team-Cards die `data-tracker-id` hinzu:

```html
<div id="dirk" class="team-card p-6" data-tracker-id="TRACKER_ID_DIRK">
```

## 🚀 Automatische Updates (Für später)

Wenn du später einen Webserver hast, kannst du die PHP-Lösung nutzen:

### Option 1: PHP installieren
1. Download: https://windows.php.net/download/
2. Starte START_SERVER.bat
3. Nutze bf6_team_9.html (mit Live-API)

### Option 2: Auf Webserver hochladen
1. Lade alle Dateien auf deinen Webserver hoch
2. Stelle sicher PHP aktiviert ist
3. Die API funktioniert dann automatisch

## 📋 Vergleich der Lösungen

| Lösung | Datei | Server nötig? | Updates | Vorteile |
|--------|-------|--------------|---------|----------|
| **Aktuell** | bf6_team_10.html | ❌ Nein | Manuell | Einfach, funktioniert sofort |
| PHP-API | bf6_team_9.html | ✅ Ja | Automatisch | Live-Stats, keine manuelle Arbeit |

## 💡 Empfehlung

**Für jetzt:** Nutze `bf6_team_10.html` - funktioniert ohne Installation!

**Für später:** Wenn die Seite online geht, wechsel zu `bf6_team_9.html` mit PHP-API für automatische Updates.

## 🎯 Quick Start

1. Öffne: `i:\Wordpress_NEU\Design Projekte\CAS\CODEX\.superdesign\design_iterations\bf6_team_10.html`
2. Fertig! Die Seite funktioniert direkt im Browser ohne Server.

## ❓ Support

Bei Fragen:
- Öffne die Browser-Konsole (F12) für Fehlermeldungen
- Überprüfe ob die Stats im JavaScript-Objekt definiert sind
- Stelle sicher, dass die `data-tracker-id` korrekt ist
