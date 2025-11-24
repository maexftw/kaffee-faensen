# Cloudflare API Setup für Kaffee Fänsen

Dieses Setup basiert auf dem bewährten System aus dem Kost-Projekt und ermöglicht automatisierte Cloudflare Pages Deployments.

---

## 🎯 Ziel

Permanente API-Verbindung zu Cloudflare Pages, die für automatische Deployments und Konfiguration verwendet werden kann.

---

## 🚀 Schnellstart

### Option 1: Bestehende Cloudflare API verwenden (Empfohlen)

Falls du bereits eine Cloudflare API-Konfiguration hast (z.B. aus dem Kost-Projekt):

1. **Kopiere die Config-Datei:**
   ```bash
   # Von Kost-Projekt
   cp D:\Arbeit\Workflow\Kost\kost-repo\.cloudflare-config.json kaffee-faensen\.cloudflare-config.json
   ```

2. **ODER verwende die API direkt:**
   - Die bestehende API kann auch für Pages verwendet werden
   - Du musst nur die Permissions erweitern (siehe unten)

### Option 2: Neues API Token erstellen

1. Gehe zu: https://dash.cloudflare.com/profile/api-tokens
2. Klicke auf **"Create Token"**
3. Wähle **"Create Custom Token"**

**Token Name:** `Kaffee Fänsen Pages Management`

**Permissions hinzufügen:**

**Für Cloudflare Pages:**
```
Account - Account:Cloudflare Pages:Read
Account - Account:Cloudflare Pages:Edit
Account - Account:Cloudflare Pages:Deploy
```

**Für Zone-Management (falls nötig):**
```
Zone - Zone:Read
Zone - Zone:Edit
Zone - Zone Settings:Read
Zone - Zone Settings:Edit
```

**Account Resources:**
- Include → All accounts (oder spezifisches Account)

4. Klicke auf **"Continue to summary"**
5. Klicke auf **"Create Token"**
6. **WICHTIG:** Kopiere den Token sofort! (wird nur einmal angezeigt)

---

## 📋 Konfiguration speichern

### Methode 1: Config-Datei (wie im Kost-Projekt)

Erstelle `.cloudflare-config.json` im Projekt-Root:

```json
{
  "api_token": "dein-api-token-hier",
  "account_id": "deine-account-id-hier",
  "pages_project": "kaffee-faensen"
}
```

**WICHTIG:** Diese Datei sollte in `.gitignore` sein!

### Methode 2: Umgebungsvariablen (sicherer)

**Windows PowerShell:**
```powershell
$env:CLOUDFLARE_API_TOKEN = "dein-token"
$env:CLOUDFLARE_ACCOUNT_ID = "deine-account-id"
```

**Linux/Mac:**
```bash
export CLOUDFLARE_API_TOKEN="dein-token"
export CLOUDFLARE_ACCOUNT_ID="deine-account-id"
```

---

## 🔍 Account ID finden

1. Gehe zu: https://dash.cloudflare.com
2. Rechts oben auf dein Profil klicken
3. Account ID steht dort (oder in der URL)

---

## ✅ API-Verbindung testen

### Mit Python (falls requests installiert):

```python
import requests
import json

# Lade Config
with open('.cloudflare-config.json', 'r') as f:
    config = json.load(f)

headers = {
    "Authorization": f"Bearer {config['api_token']}",
    "Content-Type": "application/json"
}

# Teste Account-Zugriff
response = requests.get(
    f"https://api.cloudflare.com/client/v4/accounts/{config['account_id']}",
    headers=headers
)

if response.status_code == 200:
    print("✅ API-Verbindung erfolgreich!")
    print(response.json())
else:
    print(f"❌ Fehler: {response.status_code}")
    print(response.text)
```

### Mit curl:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/DEINE_ACCOUNT_ID" \
  -H "Authorization: Bearer DEIN_TOKEN" \
  -H "Content-Type: application/json"
```

---

## 🚀 Cloudflare Pages Deployment via API

### Pages Projekt erstellen

```python
import requests
import json

config = json.load(open('.cloudflare-config.json'))

headers = {
    "Authorization": f"Bearer {config['api_token']}",
    "Content-Type": "application/json"
}

# Erstelle Pages Projekt
data = {
    "name": "kaffee-faensen",
    "production_branch": "main"
}

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{config['account_id']}/pages/projects",
    headers=headers,
    json=data
)

print(response.json())
```

### Deployment auslösen

```python
# Nach GitHub-Verbindung
data = {
    "branch": "main"
}

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{config['account_id']}/pages/projects/kaffee-faensen/deployments",
    headers=headers,
    json=data
)
```

### Environment Variables setzen

```python
# Setze Secret
data = {
    "name": "STRIPE_SECRET_KEY",
    "type": "secret_text",
    "value": "sk_test_..."
}

response = requests.put(
    f"https://api.cloudflare.com/client/v4/accounts/{config['account_id']}/pages/projects/kaffee-faensen/variables",
    headers=headers,
    json=data
)
```

---

## 🔒 Sicherheit

⚠️ **WICHTIG:**
- API Token **NIEMALS** in Git committen!
- `.cloudflare-config.json` sollte in `.gitignore` sein
- Token kann jederzeit in Cloudflare Dashboard gelöscht werden
- Verwende Umgebungsvariablen für Production

---

## 📝 .gitignore Eintrag

Stelle sicher, dass `.cloudflare-config.json` in `.gitignore` ist:

```
.cloudflare-config.json
cloudflare-config.json
```

---

## 💡 Verwendung mit bestehender Kost-API

Falls du bereits die Kost-API-Konfiguration hast:

1. **Die API kann für mehrere Projekte verwendet werden**
2. **Du musst nur die Permissions erweitern:**
   - Gehe zu: https://dash.cloudflare.com/profile/api-tokens
   - Bearbeite deinen bestehenden Token
   - Füge Pages-Permissions hinzu:
     - Account → Account:Cloudflare Pages:Read
     - Account → Account:Cloudflare Pages:Edit
     - Account → Account:Cloudflare Pages:Deploy

3. **Dann kannst du die gleiche Config-Datei verwenden**

---

## 🛠️ Nützliche API-Endpunkte

### Pages Projekte auflisten
```
GET /accounts/{account_id}/pages/projects
```

### Projekt-Details abrufen
```
GET /accounts/{account_id}/pages/projects/{project_name}
```

### Deployments auflisten
```
GET /accounts/{account_id}/pages/projects/{project_name}/deployments
```

### Environment Variables setzen
```
PUT /accounts/{account_id}/pages/projects/{project_name}/variables
```

### Deployment-Logs abrufen
```
GET /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/history/logs
```

---

## 📚 Weitere Ressourcen

- **Cloudflare Pages API Docs**: https://developers.cloudflare.com/api/operations/cloudflare-pages-project-create-project
- **Kost-Projekt Setup**: `D:\Arbeit\Workflow\Kost\kost-repo\CLOUDFLARE-API-SETUP.md`
- **API Token Guide**: `D:\Arbeit\Workflow\Kost\kost-repo\CLOUDFLARE-API-TOKEN-ANLEITUNG.md`

---

## ✅ Nächste Schritte

Nach dem API-Setup kannst du:

1. ✅ Cloudflare Pages Projekt via API erstellen
2. ✅ Deployments automatisch auslösen
3. ✅ Environment Variables setzen
4. ✅ Deployment-Status prüfen
5. ✅ Logs abrufen

**Viel Erfolg! ☕🚀**


