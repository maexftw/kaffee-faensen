# 🚀 GitHub Deployment Guide

Anleitung zum Veröffentlichen der BF6 Squad Website auf GitHub.

## 📋 Voraussetzungen

- [ ] GitHub Account (kostenlos bei github.com)
- [ ] Git ist installiert (bereits erledigt ✅)
- [ ] Repository ist initialisiert (bereits erledigt ✅)

## 🎯 Schritt-für-Schritt Anleitung

### 1. Erstelle ein neues GitHub Repository

1. Gehe zu: https://github.com/new
2. Repository Name: `bf6-squad` (oder ein anderer Name)
3. Description: `Crazy Aim Sport - Reloaded | Elite BF6 Squad Website`
4. Visibility: **Public** (für GitHub Pages kostenlos)
5. **NICHT** "Initialize with README" anklicken (haben wir schon)
6. Klicke "Create repository"

### 2. Remote Repository hinzufügen

Öffne ein Terminal/CMD im Projekt-Ordner und führe aus:

```bash
cd "i:\Wordpress_NEU\Design Projekte\CAS\CODEX"

# Ersetze USERNAME mit deinem GitHub-Benutzernamen
git remote add origin https://github.com/USERNAME/bf6-squad.git

# Oder mit SSH (wenn SSH-Key eingerichtet):
# git remote add origin git@github.com:USERNAME/bf6-squad.git
```

### 3. Branch umbenennen (optional)

GitHub nutzt standardmäßig `main` statt `master`:

```bash
git branch -M main
```

### 4. Push zu GitHub

```bash
git push -u origin main
```

**Falls Login erforderlich:**
- Username: Dein GitHub-Username
- Password: Verwende ein **Personal Access Token** (nicht dein GitHub-Passwort!)
  - Erstelle Token: https://github.com/settings/tokens
  - Scopes: `repo` (voller Zugriff auf Repositories)

### 5. GitHub Pages aktivieren

1. Gehe zu deinem Repository: `https://github.com/USERNAME/bf6-squad`
2. Klicke auf **Settings** (oben rechts)
3. Scrolle zu **Pages** (linkes Menü)
4. Source: **Deploy from a branch**
5. Branch: **main** / Folder: **/ (root)**
6. Klicke **Save**

⏳ **Warte 1-2 Minuten...**

Die Website wird verfügbar sein unter:
```
https://USERNAME.github.io/bf6-squad/
```

## 🎨 Was wird veröffentlicht?

- ✅ **Hauptseite**: `index.html` → leitet zu bf6_team_10.html weiter
- ✅ **Squad-Seite**: `.superdesign/design_iterations/bf6_team_10.html`
- ✅ **Images**: Alle Bilder im `public/images/` Ordner
- ✅ **Dokumentation**: README.md und Anleitungen

## 🔄 Updates veröffentlichen

Wenn du Änderungen machst:

```bash
# Änderungen hinzufügen
git add .

# Commit mit Nachricht
git commit -m "Update: Beschreibung der Änderung"

# Push zu GitHub
git push
```

GitHub Pages aktualisiert sich automatisch nach 1-2 Minuten!

## 🌐 Custom Domain (Optional)

Du kannst eine eigene Domain verwenden:

### Schritt 1: CNAME-Datei erstellen

```bash
echo "deine-domain.de" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### Schritt 2: DNS-Records bei deinem Domain-Provider

Erstelle diese DNS-Records:

**Für Apex-Domain (z.B. `squad.de`):**
```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
```

**Für Subdomain (z.B. `www.squad.de` oder `bf6.squad.de`):**
```
CNAME    www    USERNAME.github.io
```

### Schritt 3: GitHub Pages konfigurieren

1. Gehe zu Settings → Pages
2. Custom domain: `deine-domain.de`
3. Klicke **Save**
4. Warte auf DNS-Check (kann 24h dauern)
5. Aktiviere **Enforce HTTPS** (wenn verfügbar)

## 🔐 Private Repository (Optional)

Wenn du das Repository privat machen möchtest:

**WICHTIG:** GitHub Pages für private Repos erfordert GitHub Pro ($4/Monat)

1. Repository → Settings → General
2. Scrolle zu **Danger Zone**
3. Change visibility → Make private

## 📝 Nützliche Git-Befehle

```bash
# Status anzeigen
git status

# Log anzeigen
git log --oneline

# Letzte Änderungen rückgängig machen
git reset --soft HEAD~1

# Branch anzeigen
git branch

# Remote-URL anzeigen
git remote -v
```

## 🐛 Troubleshooting

### Problem: "permission denied"

**Lösung:** Nutze Personal Access Token statt Passwort
1. Erstelle Token: https://github.com/settings/tokens
2. Beim Push-Vorgang als Passwort verwenden

### Problem: "fatal: remote origin already exists"

**Lösung:**
```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/bf6-squad.git
```

### Problem: GitHub Pages zeigt 404

**Lösungen:**
1. Warte 5 Minuten (Deployment dauert etwas)
2. Überprüfe Settings → Pages → Branch ist `main` und Folder ist `/root`
3. Checke ob `index.html` im Root-Verzeichnis existiert

### Problem: Images werden nicht geladen

**Lösung:** Überprüfe Pfade in HTML:
```html
<!-- Falsch (absoluter Pfad) -->
<img src="/images/logo.avif">

<!-- Richtig (relativer Pfad) -->
<img src="./public/images/logo.avif">
```

## 📊 Live-Stats aktivieren (Später)

Aktuell nutzt die Seite hardcoded Stats in `bf6_team_10.html`.

**Für echte Live-Stats brauchst du einen PHP-Server:**

### Option 1: Vercel (Empfohlen)
1. Account erstellen: https://vercel.com
2. Repository verbinden
3. PHP-Runtime aktivieren
4. `.superdesign/api/tracker-proxy.php` wird automatisch deployed

### Option 2: Netlify mit Netlify Functions
1. Account erstellen: https://netlify.com
2. Repository verbinden
3. PHP zu Serverless Functions konvertieren (komplexer)

### Option 3: Eigener Server
1. Hosting mit PHP mieten (z.B. Hetzner, ALL-INKL)
2. Dateien per FTP hochladen
3. API-URL in `bf6_team_9.html` anpassen

## ✅ Checkliste nach Deployment

- [ ] Website lädt unter `https://USERNAME.github.io/bf6-squad/`
- [ ] Alle Images werden angezeigt
- [ ] Navigation funktioniert
- [ ] Smooth Scrolling funktioniert
- [ ] Discord-Links funktionieren
- [ ] Tracker.gg-Links funktionieren
- [ ] Mobile Ansicht sieht gut aus
- [ ] Parallax-Effekte laufen flüssig

## 🎉 Fertig!

Deine Squad-Website ist jetzt live! Teile den Link mit deinem Squad:

```
🎮 Crazy Aim Sport - Reloaded
🌐 https://USERNAME.github.io/bf6-squad/
💬 Discord: https://discord.gg/w3na5hQb
```

---

**Hilfe benötigt?** Erstelle ein Issue auf GitHub oder frag im Squad-Discord!
