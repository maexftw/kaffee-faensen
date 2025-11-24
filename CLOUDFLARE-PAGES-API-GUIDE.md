# Cloudflare Pages API - Praktischer Guide für Kaffee Fänsen

Dieser Guide zeigt, wie du die bestehende Cloudflare API aus dem Kost-Projekt für das Kaffee Fänsen Pages-Deployment verwendest.

---

## 🎯 Voraussetzungen

- ✅ Cloudflare Account vorhanden
- ✅ API Token aus Kost-Projekt vorhanden (oder neuer Token)
- ✅ Python installiert (optional, für Scripts)

---

## 📋 Schritt 1: API Token Permissions erweitern

Falls du bereits einen API Token aus dem Kost-Projekt hast:

1. Gehe zu: https://dash.cloudflare.com/profile/api-tokens
2. Finde deinen bestehenden Token (z.B. "KOST Website Management")
3. Klicke auf **"Edit"** (oder erstelle neuen Token)

**Füge diese Permissions hinzu:**

```
Account - Account:Cloudflare Pages:Read
Account - Account:Cloudflare Pages:Edit  
Account - Account:Cloudflare Pages:Deploy
```

**Account Resources:**
- Include → All accounts (oder dein spezifisches Account)

4. Speichere den Token

---

## 📋 Schritt 2: Config-Datei erstellen

### Option A: Bestehende Config verwenden

Falls du bereits `.cloudflare-config.json` aus dem Kost-Projekt hast:

```bash
# Kopiere die Config (oder verwende sie direkt)
cp D:\Arbeit\Workflow\Kost\kost-repo\.cloudflare-config.json kaffee-faensen\.cloudflare-config.json
```

**WICHTIG:** Die Config muss `account_id` enthalten!

### Option B: Neue Config erstellen

Erstelle `.cloudflare-config.json` im `kaffee-faensen` Ordner:

```json
{
  "api_token": "dein-api-token-hier",
  "account_id": "deine-account-id-hier",
  "pages_project": "kaffee-faensen"
}
```

**Account ID finden:**
- Cloudflare Dashboard → Rechts oben auf Profil → Account ID

---

## 🚀 Schritt 3: Pages Projekt erstellen (via API)

### Mit Python Script:

Erstelle `create-pages-project.py`:

```python
#!/usr/bin/env python3
import requests
import json
import sys
from pathlib import Path

# Lade Config
config_path = Path('.cloudflare-config.json')
if not config_path.exists():
    print("❌ .cloudflare-config.json nicht gefunden!")
    print("Erstelle die Datei mit api_token und account_id")
    sys.exit(1)

with open(config_path, 'r') as f:
    config = json.load(f)

api_token = config.get('api_token')
account_id = config.get('account_id')
project_name = config.get('pages_project', 'kaffee-faensen')

if not api_token or not account_id:
    print("❌ api_token und account_id sind erforderlich!")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {api_token}",
    "Content-Type": "application/json"
}

# Prüfe ob Projekt bereits existiert
print(f"🔍 Prüfe ob Projekt '{project_name}' existiert...")
response = requests.get(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}",
    headers=headers
)

if response.status_code == 200:
    print(f"✅ Projekt '{project_name}' existiert bereits!")
    project = response.json()['result']
    print(f"   URL: {project.get('subdomain', 'N/A')}.pages.dev")
    sys.exit(0)

# Erstelle neues Projekt
print(f"🚀 Erstelle Pages Projekt '{project_name}'...")
data = {
    "name": project_name,
    "production_branch": "main"
}

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects",
    headers=headers,
    json=data
)

if response.status_code == 200:
    result = response.json()
    if result.get('success'):
        project = result['result']
        print(f"✅ Projekt erfolgreich erstellt!")
        print(f"   Name: {project['name']}")
        print(f"   Subdomain: {project.get('subdomain', 'N/A')}.pages.dev")
        print()
        print("⚠️ Nächste Schritte:")
        print("1. Verbinde GitHub Repository im Cloudflare Dashboard")
        print("2. Setze Environment Variables")
        print("3. Deploy!")
    else:
        print(f"❌ Fehler: {result.get('errors', [])}")
else:
    print(f"❌ HTTP Fehler: {response.status_code}")
    print(response.text)
```

**Ausführen:**
```bash
cd kaffee-faensen
python create-pages-project.py
```

### Mit curl:

```bash
# Lade Config
source load-config.sh  # oder setze Variablen manuell

# Erstelle Projekt
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "kaffee-faensen",
    "production_branch": "main"
  }'
```

---

## 🔐 Schritt 4: Environment Variables setzen

### Via API:

```python
import requests
import json

config = json.load(open('.cloudflare-config.json'))

headers = {
    "Authorization": f"Bearer {config['api_token']}",
    "Content-Type": "application/json"
}

account_id = config['account_id']
project_name = config.get('pages_project', 'kaffee-faensen')

# Setze Secrets
secrets = {
    "STRIPE_SECRET_KEY": "sk_test_...",  # Aus Stripe Dashboard
    "STRIPE_WEBHOOK_SECRET": "whsec_...",  # Nach Webhook-Setup
    "SITE_URL": f"https://{project_name}.pages.dev"
}

for name, value in secrets.items():
    print(f"🔐 Setze {name}...")
    
    data = {
        "name": name,
        "type": "secret_text",
        "value": value
    }
    
    response = requests.put(
        f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/variables",
        headers=headers,
        json=data
    )
    
    if response.status_code in [200, 201]:
        print(f"   ✅ {name} gesetzt")
    else:
        print(f"   ❌ Fehler: {response.status_code}")
        print(response.text)
```

### Via Dashboard (einfacher):

1. Gehe zu: Cloudflare Dashboard → Pages → `kaffee-faensen`
2. Settings → Environment Variables
3. Füge jede Variable hinzu:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `SITE_URL`

---

## 📊 Schritt 5: Deployment-Status prüfen

```python
import requests
import json

config = json.load(open('.cloudflare-config.json'))

headers = {
    "Authorization": f"Bearer {config['api_token']}",
    "Content-Type": "application/json"
}

account_id = config['account_id']
project_name = config.get('pages_project', 'kaffee-faensen')

# Hole neuestes Deployment
response = requests.get(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments",
    headers=headers,
    params={"per_page": 1}
)

if response.status_code == 200:
    deployments = response.json()['result']
    if deployments:
        latest = deployments[0]
        print(f"📊 Neuestes Deployment:")
        print(f"   Status: {latest['stage']['name']}")
        print(f"   URL: {latest.get('url', 'N/A')}")
        print(f"   Created: {latest.get('created_on', 'N/A')}")
```

---

## 🔄 Schritt 6: Deployment auslösen

Nach GitHub-Verbindung:

```python
# Deployment auslösen (nach Push zu GitHub)
response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments",
    headers=headers,
    json={"branch": "main"}
)
```

**Oder automatisch:** Cloudflare Pages deployed automatisch bei Push zu GitHub!

---

## 📝 Vollständiges Setup-Script

Erstelle `setup-cloudflare-pages.py`:

```python
#!/usr/bin/env python3
"""
Cloudflare Pages Setup für Kaffee Fänsen
Verwendet bestehende Cloudflare API Config
"""
import requests
import json
import sys
from pathlib import Path

def load_config():
    """Lädt Cloudflare Config"""
    config_path = Path('.cloudflare-config.json')
    if not config_path.exists():
        # Versuche Kost-Config zu verwenden
        kost_config = Path('D:/Arbeit/Workflow/Kost/kost-repo/.cloudflare-config.json')
        if kost_config.exists():
            print("📋 Verwende Kost-Config...")
            with open(kost_config, 'r') as f:
                config = json.load(f)
            # Füge Pages-spezifische Felder hinzu
            config['pages_project'] = 'kaffee-faensen'
            if not config.get('account_id'):
                print("⚠️ account_id fehlt in Config!")
                account_id = input("Gib Account ID ein: ").strip()
                config['account_id'] = account_id
            return config
        else:
            print("❌ Keine Config gefunden!")
            print("Erstelle .cloudflare-config.json oder verwende Kost-Config")
            sys.exit(1)
    
    with open(config_path, 'r') as f:
        return json.load(f)

def main():
    config = load_config()
    
    api_token = config.get('api_token')
    account_id = config.get('account_id')
    project_name = config.get('pages_project', 'kaffee-faensen')
    
    if not api_token or not account_id:
        print("❌ api_token und account_id sind erforderlich!")
        sys.exit(1)
    
    headers = {
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json"
    }
    
    print("=" * 60)
    print("Cloudflare Pages Setup für Kaffee Fänsen")
    print("=" * 60)
    print()
    
    # Prüfe Projekt
    print(f"🔍 Prüfe Projekt '{project_name}'...")
    response = requests.get(
        f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}",
        headers=headers
    )
    
    if response.status_code == 200:
        project = response.json()['result']
        print(f"✅ Projekt existiert bereits!")
        print(f"   URL: https://{project.get('subdomain', 'N/A')}.pages.dev")
    else:
        print(f"⚠️ Projekt nicht gefunden (Status: {response.status_code})")
        print("   Erstelle es im Cloudflare Dashboard oder via API")
    
    print()
    print("✅ Setup abgeschlossen!")
    print()
    print("Nächste Schritte:")
    print("1. Verbinde GitHub Repository im Dashboard")
    print("2. Setze Environment Variables")
    print("3. Deploy!")

if __name__ == "__main__":
    main()
```

---

## ✅ Zusammenfassung

Mit der bestehenden Cloudflare API kannst du:

1. ✅ Pages Projekt erstellen/prüfen
2. ✅ Environment Variables setzen
3. ✅ Deployment-Status abrufen
4. ✅ Logs ansehen
5. ✅ Deployments auslösen

**Viel Erfolg! ☕🚀**


