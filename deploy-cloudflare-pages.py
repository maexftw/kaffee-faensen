#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cloudflare Pages Deployment Script für Kaffee Fänsen
Verwendet bestehende Cloudflare API Config aus Kost-Projekt
"""

import requests
import json
import sys
import os
from pathlib import Path

# Config-Dateien
CONFIG_FILE = ".cloudflare-config.json"
KOST_CONFIG = Path("D:/Arbeit/Workflow/Kost/kost-repo/.cloudflare-config.json")

PROJECT_NAME = "kaffee-faensen"
PRODUCTION_BRANCH = "main"

def load_config():
    """Lädt Cloudflare Config - versucht lokale, dann Kost-Config"""
    # Versuche lokale Config
    local_config = Path(CONFIG_FILE)
    if local_config.exists():
        print(f"📋 Verwende lokale Config: {CONFIG_FILE}")
        with open(local_config, 'r', encoding='utf-8') as f:
            config = json.load(f)
        if config.get('api_token') and config.get('account_id'):
            return config
    
    # Versuche Kost-Config
    if KOST_CONFIG.exists():
        print(f"📋 Verwende Kost-Config: {KOST_CONFIG}")
        with open(KOST_CONFIG, 'r', encoding='utf-8') as f:
            config = json.load(f)
        
        # Füge Pages-spezifische Felder hinzu
        if not config.get('account_id'):
            print("\n⚠️ account_id fehlt in Config!")
            account_id = input("Gib Account ID ein (oder Enter zum Überspringen): ").strip()
            if account_id:
                config['account_id'] = account_id
        
        config['pages_project'] = PROJECT_NAME
        return config
    
    # Keine Config gefunden
    print("❌ Keine Cloudflare Config gefunden!")
    print("\nOptionen:")
    print(f"1. Erstelle {CONFIG_FILE} mit api_token und account_id")
    print(f"2. Stelle sicher dass {KOST_CONFIG} existiert")
    print("\nConfig-Format:")
    print(json.dumps({
        "api_token": "dein-token",
        "account_id": "deine-account-id",
        "pages_project": PROJECT_NAME
    }, indent=2))
    return None

def test_api_connection(config):
    """Testet API-Verbindung"""
    print("\n🔍 Teste API-Verbindung...")
    
    headers = {
        "Authorization": f"Bearer {config['api_token']}",
        "Content-Type": "application/json"
    }
    
    account_id = config.get('account_id')
    if not account_id:
        print("⚠️ account_id fehlt - überspringe API-Test")
        return False
    
    try:
        response = requests.get(
            f"https://api.cloudflare.com/client/v4/accounts/{account_id}",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                account = data.get('result', {})
                print(f"✅ API-Verbindung erfolgreich!")
                print(f"   Account: {account.get('name', 'N/A')}")
                return True
            else:
                print(f"❌ API-Fehler: {data.get('errors', [])}")
        else:
            print(f"❌ HTTP Fehler: {response.status_code}")
            print(response.text[:200])
    
    except Exception as e:
        print(f"❌ Verbindungsfehler: {e}")
    
    return False

def check_pages_project(config):
    """Prüft ob Pages Projekt existiert"""
    print(f"\n🔍 Prüfe ob Pages Projekt '{PROJECT_NAME}' existiert...")
    
    headers = {
        "Authorization": f"Bearer {config['api_token']}",
        "Content-Type": "application/json"
    }
    
    account_id = config.get('account_id')
    if not account_id:
        print("⚠️ account_id fehlt - kann Projekt nicht prüfen")
        return None
    
    try:
        response = requests.get(
            f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{PROJECT_NAME}",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                project = data['result']
                print(f"✅ Projekt existiert bereits!")
                print(f"   Name: {project.get('name')}")
                print(f"   Subdomain: {project.get('subdomain', 'N/A')}.pages.dev")
                print(f"   Production Branch: {project.get('production_branch', 'N/A')}")
                return project
        elif response.status_code == 404:
            print(f"ℹ️ Projekt existiert noch nicht")
            return None
        else:
            print(f"⚠️ HTTP Fehler: {response.status_code}")
            print(response.text[:200])
    
    except Exception as e:
        print(f"❌ Fehler: {e}")
    
    return None

def create_pages_project(config):
    """Erstellt Cloudflare Pages Projekt"""
    print(f"\n🚀 Erstelle Pages Projekt '{PROJECT_NAME}'...")
    
    headers = {
        "Authorization": f"Bearer {config['api_token']}",
        "Content-Type": "application/json"
    }
    
    account_id = config.get('account_id')
    if not account_id:
        print("❌ account_id fehlt - kann Projekt nicht erstellen")
        return None
    
    data = {
        "name": PROJECT_NAME,
        "production_branch": PRODUCTION_BRANCH
    }
    
    try:
        response = requests.post(
            f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects",
            headers=headers,
            json=data,
            timeout=30
        )
        
        if response.status_code in [200, 201]:
            result = response.json()
            if result.get('success'):
                project = result['result']
                print(f"✅ Projekt erfolgreich erstellt!")
                print(f"   Name: {project.get('name')}")
                print(f"   Subdomain: {project.get('subdomain', 'N/A')}.pages.dev")
                print(f"   Production Branch: {project.get('production_branch', 'N/A')}")
                return project
            else:
                errors = result.get('errors', [])
                print(f"❌ API-Fehler:")
                for error in errors:
                    print(f"   - {error.get('message', 'Unknown error')}")
        else:
            print(f"❌ HTTP Fehler: {response.status_code}")
            print(response.text[:500])
    
    except Exception as e:
        print(f"❌ Fehler: {e}")
    
    return None

def list_environment_variables(config):
    """Listet Environment Variables"""
    print(f"\n📋 Aktuelle Environment Variables:")
    
    headers = {
        "Authorization": f"Bearer {config['api_token']}",
        "Content-Type": "application/json"
    }
    
    account_id = config.get('account_id')
    if not account_id:
        print("⚠️ account_id fehlt")
        return []
    
    try:
        response = requests.get(
            f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{PROJECT_NAME}/variables",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            if result.get('success'):
                vars_list = result.get('result', [])
                if vars_list:
                    for var in vars_list:
                        print(f"   ✅ {var.get('key')} ({var.get('type', 'N/A')})")
                    return vars_list
                else:
                    print("   ℹ️ Keine Variables gesetzt")
                    return []
        else:
            print(f"⚠️ Konnte Variables nicht abrufen: {response.status_code}")
    
    except Exception as e:
        print(f"⚠️ Fehler: {e}")
    
    return []

def set_environment_variable(config, name, value, var_type="secret_text"):
    """Setzt Environment Variable"""
    print(f"\n🔐 Setze {name}...")
    
    headers = {
        "Authorization": f"Bearer {config['api_token']}",
        "Content-Type": "application/json"
    }
    
    account_id = config.get('account_id')
    if not account_id:
        print("❌ account_id fehlt")
        return False
    
    data = {
        "key": name,
        "type": var_type,
        "value": value
    }
    
    try:
        # Versuche PUT (Update)
        response = requests.put(
            f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{PROJECT_NAME}/variables",
            headers=headers,
            json=data,
            timeout=10
        )
        
        if response.status_code in [200, 201]:
            print(f"   ✅ {name} gesetzt")
            return True
        else:
            print(f"   ⚠️ HTTP {response.status_code}: {response.text[:200]}")
    
    except Exception as e:
        print(f"   ❌ Fehler: {e}")
    
    return False

def get_latest_deployment(config):
    """Holt neuestes Deployment"""
    headers = {
        "Authorization": f"Bearer {config['api_token']}",
        "Content-Type": "application/json"
    }
    
    account_id = config.get('account_id')
    if not account_id:
        return None
    
    try:
        response = requests.get(
            f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{PROJECT_NAME}/deployments",
            headers=headers,
            params={"per_page": 1},
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            if result.get('success'):
                deployments = result.get('result', [])
                if deployments:
                    return deployments[0]
    
    except Exception as e:
        print(f"⚠️ Fehler beim Abrufen des Deployments: {e}")
    
    return None

def main():
    print("=" * 60)
    print("Cloudflare Pages Deployment - Kaffee Fänsen")
    print("=" * 60)
    
    # Lade Config
    config = load_config()
    if not config:
        sys.exit(1)
    
    # Prüfe API-Verbindung
    if not test_api_connection(config):
        print("\n⚠️ API-Verbindung fehlgeschlagen")
        print("Bitte prüfe:")
        print("1. API Token ist korrekt")
        print("2. Token hat Pages-Permissions")
        print("3. Account ID ist korrekt")
        response = input("\nTrotzdem fortfahren? (j/n): ")
        if response.lower() != 'j':
            sys.exit(1)
    
    # Prüfe/Erstelle Projekt
    project = check_pages_project(config)
    if not project:
        response = input(f"\nProjekt '{PROJECT_NAME}' erstellen? (j/n): ")
        if response.lower() == 'j':
            project = create_pages_project(config)
            if not project:
                print("\n❌ Projekt konnte nicht erstellt werden")
                print("Erstelle es manuell im Cloudflare Dashboard:")
                print("https://dash.cloudflare.com → Pages → Create Project")
                sys.exit(1)
        else:
            print("\n⚠️ Projekt muss existieren um fortzufahren")
            sys.exit(1)
    
    # Zeige Projekt-Info
    print("\n" + "=" * 60)
    print("Projekt-Informationen")
    print("=" * 60)
    print(f"Name: {project.get('name')}")
    print(f"URL: https://{project.get('subdomain', 'N/A')}.pages.dev")
    print(f"Production Branch: {project.get('production_branch', 'N/A')}")
    
    # Environment Variables
    print("\n" + "=" * 60)
    print("Environment Variables")
    print("=" * 60)
    
    vars_list = list_environment_variables(config)
    
    # Prüfe welche Variables fehlen
    required_vars = {
        "STRIPE_SECRET_KEY": "Stripe Secret Key (sk_test_... oder sk_live_...)",
        "STRIPE_WEBHOOK_SECRET": "Stripe Webhook Secret (whsec_...) - nach Webhook-Setup",
        "SITE_URL": f"Site URL (https://{project.get('subdomain', PROJECT_NAME)}.pages.dev)"
    }
    
    missing_vars = []
    existing_keys = [v.get('key') for v in vars_list]
    
    for var_name, description in required_vars.items():
        if var_name not in existing_keys:
            missing_vars.append((var_name, description))
    
    if missing_vars:
        print(f"\n⚠️ Fehlende Environment Variables:")
        for var_name, description in missing_vars:
            print(f"   - {var_name}: {description}")
        
        response = input("\nJetzt setzen? (j/n): ")
        if response.lower() == 'j':
            for var_name, description in missing_vars:
                print(f"\n{description}")
                value = input(f"{var_name}: ").strip()
                if value:
                    set_environment_variable(config, var_name, value)
                else:
                    print(f"   ⏭️ Übersprungen")
    else:
        print("\n✅ Alle erforderlichen Variables sind gesetzt!")
    
    # Deployment-Status
    print("\n" + "=" * 60)
    print("Deployment-Status")
    print("=" * 60)
    
    deployment = get_latest_deployment(config)
    if deployment:
        print(f"Neuestes Deployment:")
        print(f"   Status: {deployment.get('stage', {}).get('name', 'N/A')}")
        print(f"   URL: {deployment.get('url', 'N/A')}")
        print(f"   Created: {deployment.get('created_on', 'N/A')}")
    else:
        print("ℹ️ Noch keine Deployments")
        print("\nNächste Schritte:")
        print("1. Verbinde GitHub Repository im Dashboard:")
        print(f"   https://dash.cloudflare.com → Pages → {PROJECT_NAME} → Settings → Builds & deployments")
        print("2. Oder deploye manuell: npm run deploy")
    
    # Zusammenfassung
    print("\n" + "=" * 60)
    print("✅ Setup abgeschlossen!")
    print("=" * 60)
    print(f"\nProjekt-URL: https://{project.get('subdomain', PROJECT_NAME)}.pages.dev")
    print("\nNächste Schritte:")
    print("1. Verbinde GitHub Repository (falls noch nicht geschehen)")
    print("2. Setze fehlende Environment Variables")
    print("3. Konfiguriere Stripe Webhook")
    print("4. Teste Checkout-Flow")
    print("\nSiehe DEPLOYMENT_CHECKLIST.md für Details")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️ Abgebrochen")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Unerwarteter Fehler: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


