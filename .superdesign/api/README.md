# Tracker.gg API Proxy - Setup Instructions

## Problem
Die HTML-Datei kann nicht direkt PHP ausführen. Du brauchst einen lokalen Webserver, um die PHP-API zu nutzen.

## Lösung: Lokalen PHP-Server starten

### Option 1: PHP Built-in Server (Empfohlen)

1. **PHP installieren** (falls noch nicht vorhanden):
   - Download: https://windows.php.net/download/
   - Oder installiere XAMPP: https://www.apachefriends.org/

2. **Terminal/CMD öffnen** und zum Projekt-Ordner navigieren:
   ```bash
   cd "i:\Wordpress_NEU\Design Projekte\CAS\CODEX"
   ```

3. **PHP Server starten**:
   ```bash
   php -S localhost:8000
   ```

4. **Browser öffnen**:
   - Test-Seite: http://localhost:8000/.superdesign/api/test-tracker.php
   - HTML-Seite: http://localhost:8000/.superdesign/design_iterations/bf6_team_9.html

### Option 2: XAMPP verwenden

1. **XAMPP installieren**: https://www.apachefriends.org/
2. **Projekt-Ordner kopieren** nach: `C:\xampp\htdocs\CODEX\`
3. **Apache starten** in XAMPP Control Panel
4. **Browser öffnen**:
   - Test-Seite: http://localhost/CODEX/.superdesign/api/test-tracker.php
   - HTML-Seite: http://localhost/CODEX/.superdesign/design_iterations/bf6_team_9.html

## Testing

### Schritt 1: API testen
Öffne im Browser: http://localhost:8000/.superdesign/api/test-tracker.php

Diese Seite zeigt dir:
- ✅ Ob die Verbindung zu Tracker.gg funktioniert
- ✅ Welche Stats gefunden wurden
- ✅ Das JSON-Output der API

### Schritt 2: HTML-Seite testen
Öffne im Browser: http://localhost:8000/.superdesign/design_iterations/bf6_team_9.html

- Die Stats sollten jetzt live von Tracker.gg geladen werden
- Öffne die Browser-Konsole (F12) um Fehler zu sehen

## Files

- **tracker-proxy.php** - Die API, die Stats von Tracker.gg holt
- **test-tracker.php** - Test-Seite zum Debuggen
- **bf6_team_9.html** - Die Squad-Webseite mit Live-Stats

## Troubleshooting

### "Failed to fetch" Fehler
- Stelle sicher, dass der PHP-Server läuft
- Überprüfe den Pfad zur API in der HTML-Datei
- Öffne die Browser-Konsole (F12) für Details

### Stats werden nicht angezeigt
1. Teste erst test-tracker.php im Browser
2. Wenn das funktioniert, ist die API OK
3. Problem liegt dann im JavaScript-Pfad

### Regex findet keine Stats
- Tracker.gg hat die HTML-Struktur geändert
- Nutze test-tracker.php um das HTML zu sehen
- Passe die Regex-Patterns in tracker-proxy.php an

## Wichtig für die Pfade

Wenn du den Server auf `localhost:8000` startest, nutze in der HTML-Datei:
```javascript
fetch(`/.superdesign/api/tracker-proxy.php?id=${trackerId}`)
```

Der Pfad ist relativ zur Server-Root (CODEX-Ordner).

## Production Setup

Für die echte Website (nicht localhost):
1. Lade alle Dateien auf deinen Webserver hoch
2. Stelle sicher, dass PHP aktiviert ist
3. Passe den Pfad in bf6_team_9.html an, falls nötig
4. Teste die API: https://deine-website.de/.superdesign/api/tracker-proxy.php?id=3179257088
