# 🚀 GitHub Pages Deployment - Template & Checkliste

**Wiederverwendbare Anleitung für zukünftige Website-Deployments**

Basierend auf Lessons Learned vom BF6 Squad Website Deployment.

---

## ✅ Pre-Deployment Checkliste

### 1. Projekt vorbereiten

- [ ] **index.html im Root-Verzeichnis** vorhanden
- [ ] **Alle Image-Pfade relativ** (nicht absolut mit `/`)
  - ❌ Falsch: `src="/images/logo.png"`
  - ✅ Richtig: `src="./images/logo.png"` oder `src="./public/images/logo.png"`
- [ ] **Keine Redirects** in index.html verwenden (führt zu Problemen)
- [ ] **CDN-Links** funktionieren (Tailwind, Fonts, Icons)
- [ ] **Lokale Assets** im Repository vorhanden
- [ ] **Responsive Design** getestet
- [ ] **Browser-Kompatibilität** geprüft

### 2. Git Repository einrichten

```bash
# Im Projekt-Verzeichnis
cd "PROJEKT_PFAD"

# Git initialisieren
git init

# .gitignore erstellen
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "Thumbs.db" >> .gitignore

# Alle Dateien hinzufügen
git add .

# Initial Commit
git commit -m "Initial commit: PROJECT_NAME

- Added responsive design
- Integrated features XYZ
- Ready for deployment

🤖 Generated with Claude Code https://claude.com/claude-code

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 3. GitHub Repository erstellen

**Option A: Via Browser**
1. Gehe zu https://github.com/new
2. Repository Name: `projekt-name`
3. Description: "Kurze Beschreibung"
4. Visibility: **Public** (für kostenlose GitHub Pages)
5. **NICHT** "Initialize with README" anklicken
6. **Create repository**

**Option B: Via GitHub CLI (wenn installiert)**
```bash
gh repo create projekt-name --public --description "Beschreibung"
```

---

## 🚀 Deployment Durchführen

### Schritt 1: Remote hinzufügen

```bash
# Mit HTTPS (Personal Access Token nötig)
git remote add origin https://github.com/USERNAME/projekt-name.git

# ODER mit SSH (wenn SSH-Key eingerichtet)
git remote add origin git@github.com:USERNAME/projekt-name.git

# Branch zu main umbenennen
git branch -M main
```

### Schritt 2: Push zu GitHub

```bash
# Erster Push
git push -u origin main

# Bei HTTPS: Username + Personal Access Token eingeben
# Token erstellen: https://github.com/settings/tokens/new
# Scopes: repo (voller Zugriff)
```

### Schritt 3: GitHub Pages aktivieren

**Option A: Via Browser**
1. Gehe zu Repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**
4. Folder: **/ (root)**
5. **Save**

**Option B: Via API (schneller)**
```bash
curl -X POST \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/USERNAME/projekt-name/pages \
  -d '{"source":{"branch":"main","path":"/"}}'
```

### Schritt 4: HTTPS erzwingen (Optional aber empfohlen)

1. Settings → Pages
2. **Enforce HTTPS** aktivieren (wenn verfügbar)

---

## ⏱️ Deployment dauert 1-3 Minuten

**URL:** `https://USERNAME.github.io/projekt-name/`

Check Status:
```bash
curl -I https://USERNAME.github.io/projekt-name/
```

---

## 🐛 Häufige Probleme & Lösungen

### Problem 1: 404 File Not Found

**Ursachen:**
- `index.html` fehlt im Root-Verzeichnis
- GitHub Pages noch nicht fertig (warten!)
- Cache-Problem

**Lösungen:**
```bash
# 1. Prüfe ob index.html committed ist
git ls-files | grep index.html

# 2. Trigger Rebuild
curl -X POST \
  -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/USERNAME/projekt-name/pages/builds

# 3. Leerer Commit zum Rebuild
git commit --allow-empty -m "Trigger GitHub Pages rebuild"
git push
```

### Problem 2: Bilder laden nicht

**Ursache:** Absolute Pfade funktionieren nicht auf GitHub Pages

**Lösung:** Alle Pfade relativ machen
```bash
# Finde alle absoluten Image-Pfade
grep -r 'src="/images/' .
grep -r 'url(\047/images/' .

# Ersetze manuell:
# /images/ → ./images/
# /public/images/ → ./public/images/
```

**Vor dem Commit testen:**
```html
<!-- ❌ Falsch -->
<img src="/images/logo.png">
<style>.bg { background-image: url('/images/bg.jpg'); }</style>

<!-- ✅ Richtig -->
<img src="./images/logo.png">
<style>.bg { background-image: url('./images/bg.jpg'); }</style>
```

### Problem 3: Redirect funktioniert nicht

**Ursache:** Meta-Refresh in index.html kann Probleme machen

**Lösung:**
```bash
# Kopiere die eigentliche Seite als index.html
cp ./pages/main.html ./index.html

# Passe Pfade an (siehe Problem 2)
# Commit & Push
git add index.html
git commit -m "Fix: Use actual page as index"
git push
```

### Problem 4: CSS/JS lädt nicht

**Ursachen:**
- Pfade falsch
- CDN-Links fehlen
- CORS-Probleme

**Lösungen:**
```html
<!-- Prüfe CDN-Links -->
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap">

<!-- Relative Pfade für lokale Files -->
<link rel="stylesheet" href="./styles/main.css">
<script src="./scripts/main.js"></script>
```

### Problem 5: Seite zeigt nur kurz, dann verschwindet

**Ursache:** Redirect mit `meta http-equiv="refresh"` schlägt fehl

**Lösung:**
- Keine Redirects in index.html verwenden
- Echten Content direkt in index.html

---

## 🔄 Updates durchführen

### Normale Updates

```bash
# Änderungen machen, dann:
git add .
git commit -m "Update: Beschreibung der Änderung"
git push

# GitHub Pages aktualisiert automatisch in 1-2 Min
```

### Rebuild erzwingen (bei Cache-Problemen)

```bash
# Methode 1: Leerer Commit
git commit --allow-empty -m "Trigger rebuild"
git push

# Methode 2: Via API
curl -X POST \
  -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/USERNAME/projekt-name/pages/builds
```

---

## 📋 Deployment-Checkliste (Schritt für Schritt)

### Vor dem Deployment

- [ ] `index.html` im Root vorhanden
- [ ] Alle Pfade relativ (keine `/` am Anfang)
- [ ] Assets (images, fonts) im Repository
- [ ] CDN-Links funktionieren
- [ ] Lokal getestet (öffne index.html im Browser)
- [ ] README.md erstellt
- [ ] .gitignore konfiguriert

### Während des Deployments

- [ ] Git initialisiert (`git init`)
- [ ] Initial Commit gemacht
- [ ] GitHub Repository erstellt
- [ ] Remote hinzugefügt
- [ ] Code gepusht (`git push -u origin main`)
- [ ] GitHub Pages aktiviert (Settings → Pages)
- [ ] HTTPS erzwungen (optional)

### Nach dem Deployment

- [ ] URL getestet: `https://USERNAME.github.io/projekt-name/`
- [ ] Alle Bilder laden
- [ ] Navigation funktioniert
- [ ] Links funktionieren
- [ ] Mobile Ansicht OK
- [ ] Performance OK
- [ ] Console-Errors geprüft (F12)

### Dokumentation

- [ ] README.md mit Live-URL aktualisiert
- [ ] Deployment-Datum notiert
- [ ] Update-Anleitung geschrieben
- [ ] Known Issues dokumentiert

---

## 📝 Nützliche Git-Befehle

```bash
# Status anzeigen
git status

# Änderungen anzeigen
git diff

# Log anzeigen
git log --oneline --graph

# Remote anzeigen
git remote -v

# Branch anzeigen
git branch

# Letzten Commit rückgängig machen (soft)
git reset --soft HEAD~1

# Letzten Commit rückgängig machen (hard, vorsichtig!)
git reset --hard HEAD~1

# Datei unstagen
git restore --staged FILENAME

# Remote URL ändern
git remote set-url origin NEW_URL

# Remote entfernen
git remote remove origin
```

---

## 🔐 Personal Access Token erstellen

1. Gehe zu https://github.com/settings/tokens/new
2. Note: "GitHub Pages Deployment"
3. Expiration: 90 days (oder No expiration)
4. Scopes auswählen:
   - ✅ **repo** (Full control of private repositories)
   - ✅ **workflow** (Update GitHub Actions)
5. **Generate token**
6. **Token kopieren** (wird nur einmal angezeigt!)
7. Token als Passwort beim `git push` verwenden

**Sicherheit:**
- Token NIEMALS in Code committen
- Token nicht öffentlich teilen
- Token in `.gitignore` oder Environment Variables speichern
- Regelmäßig neue Tokens erstellen

---

## 🌐 Custom Domain (Optional)

### Schritt 1: CNAME-Datei erstellen

```bash
echo "deine-domain.de" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### Schritt 2: DNS-Records konfigurieren

**Bei deinem Domain-Provider:**

Für **Apex-Domain** (z.B. `example.com`):
```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
```

Für **Subdomain** (z.B. `www.example.com`):
```
CNAME    www    USERNAME.github.io
```

### Schritt 3: GitHub konfigurieren

1. Settings → Pages
2. Custom domain: `deine-domain.de`
3. **Save**
4. Warte auf DNS-Check (kann 24h dauern)
5. Aktiviere **Enforce HTTPS**

---

## 📊 Best Practices

### Datei-Struktur

```
projekt-name/
├── index.html              # Hauptseite (MUSS im Root sein)
├── README.md              # Dokumentation
├── .gitignore             # Git-Ignore
│
├── css/                   # Stylesheets
│   ├── main.css
│   └── theme.css
│
├── js/                    # JavaScript
│   ├── main.js
│   └── utils.js
│
├── images/                # Bilder
│   ├── logo.png
│   └── bg.jpg
│
└── pages/                 # Weitere Seiten (optional)
    ├── about.html
    └── contact.html
```

### Commit-Messages

```bash
# ✅ Gute Commit-Messages
git commit -m "Add responsive navigation menu"
git commit -m "Fix image paths for GitHub Pages"
git commit -m "Update hero section with new content"

# ❌ Schlechte Commit-Messages
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
```

### Pfade konsistent halten

```javascript
// ✅ Relative Pfade (funktioniert überall)
const logo = './images/logo.png';
const css = './css/main.css';

// ❌ Absolute Pfade (funktioniert nur auf Root-Domain)
const logo = '/images/logo.png';
const css = '/css/main.css';
```

---

## 🧪 Testing vor Deployment

### Lokal testen

```bash
# Python Server (Python 3)
python -m http.server 8000

# PHP Server
php -S localhost:8000

# Node.js (mit http-server)
npx http-server -p 8000

# Dann öffne: http://localhost:8000
```

### Checklist für lokalen Test

- [ ] Seite lädt vollständig
- [ ] Alle Bilder angezeigt
- [ ] Navigation funktioniert
- [ ] Links funktionieren
- [ ] Forms funktionieren (wenn vorhanden)
- [ ] Keine Console-Errors (F12)
- [ ] Responsive Design (Mobile, Tablet, Desktop)
- [ ] Performance OK (Lighthouse Score)

---

## 📚 Weiterführende Ressourcen

### Dokumentation

- **GitHub Pages**: https://docs.github.com/en/pages
- **Git Basics**: https://git-scm.com/book/en/v2
- **GitHub API**: https://docs.github.com/en/rest

### Tools

- **Personal Access Token**: https://github.com/settings/tokens
- **Repository erstellen**: https://github.com/new
- **GitHub Status**: https://www.githubstatus.com/

### Hilfe

- **GitHub Community**: https://github.community/
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/github-pages

---

## ✅ Erfolgs-Kriterien

Nach erfolgreichem Deployment sollte:

- [ ] Website unter `https://USERNAME.github.io/projekt-name/` erreichbar
- [ ] Alle Assets laden korrekt
- [ ] Navigation funktioniert
- [ ] Mobile Ansicht funktioniert
- [ ] HTTPS aktiviert
- [ ] Keine Console-Errors
- [ ] Performance gut (< 3s Ladezeit)
- [ ] SEO-Tags vorhanden (Title, Description, Meta)

---

## 🎯 Quick Reference

### Minimal-Setup (5 Minuten)

```bash
# 1. Git initialisieren
git init

# 2. Dateien committen
git add .
git commit -m "Initial commit"

# 3. Zu GitHub pushen
git remote add origin https://github.com/USERNAME/projekt-name.git
git branch -M main
git push -u origin main

# 4. GitHub Pages aktivieren (via Browser)
# Settings → Pages → Branch: main → Save

# ✅ Fertig! URL: https://USERNAME.github.io/projekt-name/
```

---

**Template erstellt:** 26. Oktober 2025
**Basierend auf:** BF6 Squad Website Deployment
**Lessons Learned:** 4 gelöste Probleme, 6 Commits, 2 Stunden Entwicklung

🤖 Generated with [Claude Code](https://claude.com/claude-code)

---

## 💾 Diese Datei speichern für zukünftige Projekte!

```bash
# Kopiere dieses Template in neue Projekte
cp GITHUB_PAGES_DEPLOYMENT_TEMPLATE.md /neues-projekt/DEPLOYMENT.md
```
