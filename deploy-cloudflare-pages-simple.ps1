# Cloudflare Pages Deployment Script
# Simple version without emojis for better PowerShell compatibility

$ErrorActionPreference = "Continue"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Cloudflare Pages Deployment - Kaffee Faensen" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Config files
$ConfigFile = ".cloudflare-config.json"
$KostConfig = "D:\Arbeit\Workflow\Kost\kost-repo\.cloudflare-config.json"

$ProjectName = "kaffee-faensen"
$ProductionBranch = "main"

# Load Config
function Load-Config {
    Write-Host "[INFO] Loading Cloudflare Config..." -ForegroundColor Yellow
    
    if (Test-Path $ConfigFile) {
        Write-Host "  Using local config: $ConfigFile" -ForegroundColor Green
        $config = Get-Content $ConfigFile | ConvertFrom-Json
        if ($config.api_token -and $config.account_id) {
            return $config
        }
    }
    
    if (Test-Path $KostConfig) {
        Write-Host "  Using Kost config: $KostConfig" -ForegroundColor Green
        $config = Get-Content $KostConfig | ConvertFrom-Json
        
        if (-not $config.account_id) {
            Write-Host "[WARN] account_id missing in config!" -ForegroundColor Yellow
            $accountId = Read-Host "Enter Account ID (or press Enter to skip)"
            if ($accountId) {
                $config | Add-Member -MemberType NoteProperty -Name "account_id" -Value $accountId -Force
            }
        }
        
        $config | Add-Member -MemberType NoteProperty -Name "pages_project" -Value $ProjectName -Force
        return $config
    }
    
    Write-Host "[ERROR] No Cloudflare config found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Options:"
    Write-Host "1. Create $ConfigFile with api_token and account_id"
    Write-Host "2. Ensure $KostConfig exists"
    return $null
}

# Test API Connection
function Test-ApiConnection {
    param($Config)
    
    Write-Host ""
    Write-Host "[INFO] Testing API connection..." -ForegroundColor Yellow
    
    $accountId = $Config.account_id
    if (-not $accountId) {
        Write-Host "[WARN] account_id missing - skipping API test" -ForegroundColor Yellow
        return $false
    }
    
    $headers = @{
        "Authorization" = "Bearer $($Config.api_token)"
        "Content-Type" = "application/json"
    }
    
    try {
        $uri = "https://api.cloudflare.com/client/v4/accounts/$accountId"
        $response = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers -TimeoutSec 10
        
        if ($response.success) {
            Write-Host "[SUCCESS] API connection successful!" -ForegroundColor Green
            Write-Host "  Account: $($response.result.name)" -ForegroundColor Gray
            return $true
        }
    }
    catch {
        Write-Host "[ERROR] Connection failed: $_" -ForegroundColor Red
    }
    
    return $false
}

# Check Pages Project
function Get-PagesProject {
    param($Config)
    
    Write-Host ""
    Write-Host "[INFO] Checking if Pages project '$ProjectName' exists..." -ForegroundColor Yellow
    
    $accountId = $Config.account_id
    if (-not $accountId) {
        Write-Host "[WARN] account_id missing" -ForegroundColor Yellow
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
            Write-Host "[SUCCESS] Project exists!" -ForegroundColor Green
            Write-Host "  Name: $($project.name)" -ForegroundColor Gray
            Write-Host "  Subdomain: $($project.subdomain).pages.dev" -ForegroundColor Gray
            Write-Host "  Production Branch: $($project.production_branch)" -ForegroundColor Gray
            return $project
        }
    }
    catch {
        $statusCode = $null
        try {
            $statusCode = $_.Exception.Response.StatusCode.value__
        }
        catch {}
        
        if ($statusCode -eq 404) {
            Write-Host "[INFO] Project does not exist yet" -ForegroundColor Yellow
        }
        else {
            Write-Host "[WARN] Error: $_" -ForegroundColor Yellow
        }
    }
    
    return $null
}

# Create Pages Project
function New-PagesProject {
    param($Config)
    
    Write-Host ""
    Write-Host "[INFO] Creating Pages project '$ProjectName'..." -ForegroundColor Yellow
    
    $accountId = $Config.account_id
    if (-not $accountId) {
        Write-Host "[ERROR] account_id missing" -ForegroundColor Red
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
    
    $uri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects"
    
    try {
        $response = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $body -TimeoutSec 30
        
        if ($response.success) {
            $project = $response.result
            Write-Host "[SUCCESS] Project created successfully!" -ForegroundColor Green
            Write-Host "  Name: $($project.name)" -ForegroundColor Gray
            Write-Host "  Subdomain: $($project.subdomain).pages.dev" -ForegroundColor Gray
            Write-Host "  Production Branch: $($project.production_branch)" -ForegroundColor Gray
            return $project
        }
    }
    catch {
        Write-Host "[ERROR] Failed to create project: $_" -ForegroundColor Red
        if ($_.Exception.Response) {
            try {
                $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
                $responseBody = $reader.ReadToEnd()
                Write-Host "  Response: $responseBody" -ForegroundColor Red
            }
            catch {}
        }
    }
    
    return $null
}

# Main
try {
    # Load Config
    $config = Load-Config
    if (-not $config) {
        exit 1
    }
    
    # Test API
    $apiOk = Test-ApiConnection -Config $config
    if (-not $apiOk) {
        $continue = Read-Host "`n[WARN] API connection failed. Continue anyway? (y/n)"
        if ($continue -ne "y") {
            exit 1
        }
    }
    
    # Check/Create Project
    $project = Get-PagesProject -Config $config
    if (-not $project) {
        $create = Read-Host "`nCreate project '$ProjectName'? (y/n)"
        if ($create -eq "y") {
            $project = New-PagesProject -Config $config
            if (-not $project) {
                Write-Host "`n[ERROR] Could not create project" -ForegroundColor Red
                Write-Host "Create it manually in Cloudflare Dashboard:" -ForegroundColor Yellow
                Write-Host "https://dash.cloudflare.com -> Pages -> Create Project" -ForegroundColor Cyan
                exit 1
            }
        }
        else {
            Write-Host "`n[WARN] Project must exist to continue" -ForegroundColor Yellow
            exit 1
        }
    }
    
    # Show Project Info
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "Project Information" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "Name: $($project.name)" -ForegroundColor White
    Write-Host "URL: https://$($project.subdomain).pages.dev" -ForegroundColor White
    Write-Host "Production Branch: $($project.production_branch)" -ForegroundColor White
    
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "[SUCCESS] Setup completed!" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Project URL: https://$($project.subdomain).pages.dev" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Connect GitHub Repository (if not done)" -ForegroundColor White
    Write-Host "2. Set Environment Variables:" -ForegroundColor White
    Write-Host "   - STRIPE_SECRET_KEY" -ForegroundColor Gray
    Write-Host "   - STRIPE_WEBHOOK_SECRET" -ForegroundColor Gray
    Write-Host "   - SITE_URL" -ForegroundColor Gray
    Write-Host "3. Configure Stripe Webhook" -ForegroundColor White
    Write-Host "4. Test Checkout Flow" -ForegroundColor White
    Write-Host ""
    Write-Host "See DEPLOYMENT_CHECKLIST.md for details" -ForegroundColor Cyan
}
catch {
    Write-Host "`n[ERROR] Unexpected error: $_" -ForegroundColor Red
    exit 1
}


