# Cloudflare API Token erweitern für Pages

Der bestehende API Token aus dem Kost-Projekt hat noch keine Pages-Permissions. 

## Lösung: Token-Permissions erweitern

### Schritt 1: Token im Dashboard finden

1. Gehe zu: https://dash.cloudflare.com/profile/api-tokens
2. Finde deinen Token (z.B. "KOST Website Management")
3. Klicke auf **"Edit"** (oder erstelle neuen Token)

### Schritt 2: Pages-Permissions hinzufügen

**Füge diese Permissions hinzu:**

```
Account - Account:Cloudflare Pages:Read
Account - Account:Cloudflare Pages:Edit  
Account - Account:Cloudflare Pages:Deploy
```

**Account Resources:**
- Include → All accounts (oder dein spezifisches Account)

### Schritt 3: Token speichern

- Klicke "Continue to summary"
- Klicke "Update Token"

**WICHTIG:** Der Token bleibt gleich, nur die Permissions werden erweitert!

### Schritt 4: Deployment erneut versuchen

Nach dem Update kannst du das Deployment-Script erneut ausführen:

```powershell
powershell -ExecutionPolicy Bypass -File deploy-cloudflare-pages-simple.ps1
```

---

## Alternative: Neuer Token nur für Pages

Falls du einen separaten Token erstellen willst:

1. Gehe zu: https://dash.cloudflare.com/profile/api-tokens
2. Klicke "Create Token" → "Create Custom Token"
3. **Token Name:** `Kaffee Faensen Pages`
4. **Permissions:**
   - Account → Account:Cloudflare Pages:Read
   - Account → Account:Cloudflare Pages:Edit
   - Account → Account:Cloudflare Pages:Deploy
5. **Account Resources:** Include → All accounts
6. Kopiere den neuen Token
7. Erstelle `.cloudflare-config.json` im Projekt:
   ```json
   {
     "api_token": "neuer-token-hier",
     "account_id": "0b89c7fb41809fb9a2c2e78999e9a02e",
     "pages_project": "kaffee-faensen"
   }
   ```

---

## Status

- ✅ Account ID: `0b89c7fb41809fb9a2c2e78999e9a02e` (bereits in Config)
- ⏳ API Token benötigt Pages-Permissions

Nach dem Token-Update sollte das Deployment funktionieren!


