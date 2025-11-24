# ⚡ Quick Start - GitHub Deployment

Die **schnellste** Methode, um deine BF6 Squad Website auf GitHub zu veröffentlichen!

## 🚀 3 einfache Schritte

### 1️⃣ GitHub Repository erstellen

1. Öffne: https://github.com/new
2. Repository Name: `bf6-squad`
3. Visibility: **Public**
4. Klicke **Create repository**

### 2️⃣ Push zu GitHub

Öffne CMD/Terminal und führe aus (**ersetze USERNAME mit deinem GitHub-Namen**):

```bash
cd "i:\Wordpress_NEU\Design Projekte\CAS\CODEX"

git remote add origin https://github.com/USERNAME/bf6-squad.git

git branch -M main

git push -u origin main
```

**Login erforderlich?** Nutze Personal Access Token:
- Erstelle hier: https://github.com/settings/tokens/new
- Scopes: `repo` auswählen
- Token als Passwort beim Push verwenden

### 3️⃣ GitHub Pages aktivieren

1. Gehe zu: `https://github.com/USERNAME/bf6-squad`
2. Klicke **Settings** → **Pages** (links)
3. Source: **main** / Folder: **/ (root)**
4. Klicke **Save**

🎉 **Fertig!** Deine Website ist live unter:
```
https://USERNAME.github.io/bf6-squad/
```

⏱️ *Warte 1-2 Minuten bis GitHub Pages deployed*

---

## 📱 Was funktioniert sofort?

✅ **Alle Features ohne Server:**
- Responsive Design
- Parallax-Effekte
- Team-Profile
- Discord-Links
- Tracker.gg-Links
- Hall of Shame
- Navigation

⚠️ **Noch nicht aktiv:**
- Live-Stats (nutzt aktuell hardcoded Daten)

## 🔄 Updates veröffentlichen

```bash
git add .
git commit -m "Update: Beschreibung"
git push
```

Website aktualisiert sich automatisch nach 1-2 Minuten!

## 📊 Live-Stats später aktivieren

Für echte Live-Stats brauchst du einen PHP-Server:
- **Vercel** (empfohlen, kostenlos): https://vercel.com
- **Netlify** (alternativ): https://netlify.com
- **Eigener Hosting** (z.B. Hetzner, ALL-INKL)

Siehe [GITHUB_DEPLOY.md](GITHUB_DEPLOY.md) für Details.

## 💡 Tipps

- **Custom Domain**: Erstelle `CNAME` Datei mit deiner Domain
- **SSL/HTTPS**: Aktiviere "Enforce HTTPS" in GitHub Pages Settings
- **Updates**: Änderungen einfach committen und pushen

## 🆘 Probleme?

**404 Error?**
- Warte 5 Minuten
- Checke Settings → Pages → Branch: `main`, Folder: `/root`

**Images fehlen?**
- Überprüfe dass `/public/images/` Ordner committed wurde

**Login-Fehler?**
- Nutze Personal Access Token statt Passwort
- Token erstellen: https://github.com/settings/tokens

---

**Vollständige Anleitung:** [GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)

**Website-Anleitung:** [README.md](README.md)
