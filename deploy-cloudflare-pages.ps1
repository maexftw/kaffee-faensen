# Cloudflare Pages Deployment Script für Kaffee Fänsen
# PowerShell Version - Verwendet Cloudflare API

$ErrorActionPreference = "Stop"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Cloudflare Pages Deployment - Kaffee Fänsen" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Config-Dateien
$ConfigFile = ".cloudflare-config.json"
$KostConfig = "D:\Arbeit\Workflow\Kost\kost-repo\.cloudflare-config.json"

$ProjectName = "kaffee-faensen"
$ProductionBranch = "main"

# Lade Config
function Load-Config {
    Write-Host "📋 Lade Cloudflare Config..." -ForegroundColor Yellow
    
    # Versuche lokale Config
    if (Test-Path $ConfigFile) {
        Write-Host "   Verwende lokale Config: $ConfigFile" -ForegroundColor Green
        $config = Get-Content $ConfigFile | ConvertFrom-Json
        if ($config.api_token -and $config.account_id) {
            return $config
        }
    }
    
    # Versuche Kost-Config
    if (Test-Path $KostConfig) {
        Write-Host "   Verwende Kost-Config: $KostConfig" -ForegroundColor Green
        $config = Get-Content $KostConfig | ConvertFrom-Json
        
        if (-not $config.account_id) {
            Write-Host "⚠️ account_id fehlt in Config!" -ForegroundColor Yellow
            $accountId = Read-Host "Gib Account ID ein (oder Enter zum Überspringen)"
            if ($accountId) {
                $config | Add-Member -MemberType NoteProperty -Name "account_id" -Value $accountId -Force
            }
        }
        
        $config | Add-Member -MemberType NoteProperty -Name "pages_project" -Value $ProjectName -Force
        return $config
    }
    
    Write-Host "❌ Keine Cloudflare Config gefunden!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Optionen:"
    Write-Host "1. Erstelle $ConfigFile mit api_token und account_id"
    Write-Host "2. Stelle sicher dass $KostConfig existiert"
    return $null
}

# Teste API-Verbindung
function Test-ApiConnection {
    param($Config)
    
    Write-Host ""
    Write-Host "🔍 Teste API-Verbindung..." -ForegroundColor Yellow
    
    $accountId = $Config.account_id
    if (-not $accountId) {
        Write-Host "⚠️ account_id fehlt - überspringe API-Test" -ForegroundColor Yellow
        return $false
    }
    
    $headers = @{
        "Authorization" = "Bearer $($Config.api_token)"
        "Content-Type" = "application/json"
    }
    
    try {
        $response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$accountId" `
            -Method Get -Headers $headers -TimeoutSec 10
        
        if ($response.success) {
            Write-Host "✅ API-Verbindung erfolgreich!" -ForegroundColor Green
            Write-Host "   Account: $($response.result.name)" -ForegroundColor Gray
            return $true
        }
    }
    catch {
        Write-Host "❌ Verbindungsfehler: $_" -ForegroundColor Red
    }
    
    return $false
}

# Prüfe Pages Projekt
function Get-PagesProject {
    param($Config)
    
    Write-Host ""
    Write-Host "🔍 Prüfe ob Pages Projekt '$ProjectName' existiert..." -ForegroundColor Yellow
    
    $accountId = $Config.account_id
    if (-not $accountId) {
        Write-Host "⚠️ account_id fehlt" -ForegroundColor Yellow
        return $null
    }
    
    $headers = @{
        "Authorization" = "Bearer $($Config.api_token)"
        "Content-Type" = "application/json"
    }
    
    $uri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$ProjectName"
    
    try {
        $response = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers -TimeoutSec 10
        
        if ($response.success) {
            $project = $response.result
            Write-Host "✅ Projekt existiert bereits!" -ForegroundColor Green
            Write-Host "   Name: $($project.name)" -ForegroundColor Gray
            Write-Host "   Subdomain: $($project.subdomain).pages.dev" -ForegroundColor Gray
            Write-Host "   Production Branch: $($project.production_branch)" -ForegroundColor Gray
            return $project
        }
    }
    catch {
        try {
            $statusCode = $_.Exception.Response.StatusCode.value__
            if ($statusCode -eq 404) {
                Write-Host "ℹ️ Projekt existiert noch nicht" -ForegroundColor Yellow
            }
            else {
                Write-Host "⚠️ Fehler (Status $statusCode): $_" -ForegroundColor Yellow
            }
        }
        catch {
            Write-Host "ℹ️ Projekt existiert noch nicht" -ForegroundColor Yellow
        }
    }
    
    return $null
}

# Erstelle Pages Projekt
function New-PagesProject {
    param($Config)
    
    Write-Host ""
    Write-Host "🚀 Erstelle Pages Projekt '$ProjectName'..." -ForegroundColor Yellow
    
    $accountId = $Config.account_id
    if (-not $accountId) {
        Write-Host "❌ account_id fehlt" -ForegroundColor Red
        return $null
    }
    
    $headers = @{
        "Authorization" = "Bearer $($Config.api_token)"
        "Content-Type" = "application/json"
    }
    
    $body = @{
        name = $ProjectName
        production_branch = $ProductionBranch
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects" `
            -Method Post -Headers $headers -Body $body -TimeoutSec 30
        
        if ($response.success) {
            $project = $response.result
            Write-Host "✅ Projekt erfolgreich erstellt!" -ForegroundColor Green
            Write-Host "   Name: $($project.name)" -ForegroundColor Gray
            Write-Host "   Subdomain: $($project.subdomain).pages.dev" -ForegroundColor Gray
            Write-Host "   Production Branch: $($project.production_branch)" -ForegroundColor Gray
            return $project
        }
    }
    catch {
        Write-Host "❌ Fehler: $_" -ForegroundColor Red
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host "   Response: $responseBody" -ForegroundColor Red
        }
    }
    
    return $null
}

# Main
try {
    # Lade Config
    $config = Load-Config
    if (-not $config) {
        exit 1
    }
    
    # Teste API
    $apiOk = Test-ApiConnection -Config $config
    if (-not $apiOk) {
        $continue = Read-Host "`n⚠️ API-Verbindung fehlgeschlagen. Trotzdem fortfahren? (j/n)"
        if ($continue -ne "j") {
            exit 1
        }
    }
    
    # Prüfe/Erstelle Projekt
    $project = Get-PagesProject -Config $config
    if (-not $project) {
        $create = Read-Host "`nProjekt '$ProjectName' erstellen? (j/n)"
        if ($create -eq "j") {
            $project = New-PagesProject -Config $config
            if (-not $project) {
                Write-Host "`n❌ Projekt konnte nicht erstellt werden" -ForegroundColor Red
                Write-Host "Erstelle es manuell im Cloudflare Dashboard:" -ForegroundColor Yellow
                Write-Host "https://dash.cloudflare.com → Pages → Create Project" -ForegroundColor Cyan
                exit 1
            }
        }
        else {
            Write-Host "`n⚠️ Projekt muss existieren um fortzufahren" -ForegroundColor Yellow
            exit 1
        }
    }
    
    # Zeige Projekt-Info
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "Projekt-Informationen" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "Name: $($project.name)" -ForegroundColor White
    Write-Host "URL: https://$($project.subdomain).pages.dev" -ForegroundColor White
    Write-Host "Production Branch: $($project.production_branch)" -ForegroundColor White
    
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "✅ Setup abgeschlossen!" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Projekt-URL: https://$($project.subdomain).pages.dev" -ForegroundColor Green
    Write-Host ""
    Write-Host "Nächste Schritte:" -ForegroundColor Yellow
    Write-Host "1. Verbinde GitHub Repository (falls noch nicht geschehen)" -ForegroundColor White
    Write-Host "2. Setze Environment Variables:" -ForegroundColor White
    Write-Host "   - STRIPE_SECRET_KEY" -ForegroundColor Gray
    Write-Host "   - STRIPE_WEBHOOK_SECRET" -ForegroundColor Gray
    Write-Host "   - SITE_URL" -ForegroundColor Gray
    Write-Host "3. Konfiguriere Stripe Webhook" -ForegroundColor White
    Write-Host "4. Teste Checkout-Flow" -ForegroundColor White
    Write-Host ""
    Write-Host "Siehe DEPLOYMENT_CHECKLIST.md für Details" -ForegroundColor Cyan
}
catch {
    Write-Host "`n❌ Fehler: $_" -ForegroundColor Red
    exit 1
}

