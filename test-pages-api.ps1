# Test Cloudflare Pages API Permissions

$KostConfig = "D:\Arbeit\Workflow\Kost\kost-repo\.cloudflare-config.json"

if (-not (Test-Path $KostConfig)) {
    Write-Host "[ERROR] Config not found" -ForegroundColor Red
    exit 1
}

$config = Get-Content $KostConfig | ConvertFrom-Json

if (-not $config.api_token -or -not $config.account_id) {
    Write-Host "[ERROR] api_token or account_id missing" -ForegroundColor Red
    exit 1
}

Write-Host "[INFO] Testing Cloudflare Pages API..." -ForegroundColor Yellow
Write-Host "  Account ID: $($config.account_id)" -ForegroundColor Gray
Write-Host ""

$headers = @{
    "Authorization" = "Bearer $($config.api_token)"
    "Content-Type" = "application/json"
}

$accountId = $config.account_id

# Test 1: Account Access
Write-Host "[TEST 1] Testing Account Access..." -ForegroundColor Cyan
try {
    $uri = "https://api.cloudflare.com/client/v4/accounts/$accountId"
    $response = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers -TimeoutSec 10
    
    if ($response.success) {
        Write-Host "  [SUCCESS] Account access OK" -ForegroundColor Green
        Write-Host "    Account: $($response.result.name)" -ForegroundColor Gray
    }
    else {
        Write-Host "  [ERROR] Account access failed: $($response.errors)" -ForegroundColor Red
    }
}
catch {
    Write-Host "  [ERROR] Account access failed: $_" -ForegroundColor Red
    Write-Host "    Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
}

Write-Host ""

# Test 2: Pages Projects List
Write-Host "[TEST 2] Testing Pages Projects List..." -ForegroundColor Cyan
try {
    $uri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects"
    $response = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers -TimeoutSec 10
    
    if ($response.success) {
        Write-Host "  [SUCCESS] Pages API access OK" -ForegroundColor Green
        $projects = $response.result
        Write-Host "    Found $($projects.Count) project(s)" -ForegroundColor Gray
        foreach ($project in $projects) {
            Write-Host "      - $($project.name) ($($project.subdomain).pages.dev)" -ForegroundColor Gray
        }
    }
    else {
        Write-Host "  [ERROR] Pages API failed: $($response.errors)" -ForegroundColor Red
    }
}
catch {
    $statusCode = $null
    try {
        $statusCode = $_.Exception.Response.StatusCode.value__
    }
    catch {}
    
    Write-Host "  [ERROR] Pages API failed: $_" -ForegroundColor Red
    Write-Host "    Status: $statusCode" -ForegroundColor Red
    
    if ($statusCode -eq 403) {
        Write-Host ""
        Write-Host "  [INFO] 403 Forbidden means:" -ForegroundColor Yellow
        Write-Host "    - Token lacks Pages permissions" -ForegroundColor Yellow
        Write-Host "    - Add these permissions:" -ForegroundColor Yellow
        Write-Host "      * Account:Cloudflare Pages:Read" -ForegroundColor White
        Write-Host "      * Account:Cloudflare Pages:Edit" -ForegroundColor White
        Write-Host "      * Account:Cloudflare Pages:Deploy" -ForegroundColor White
    }
}

Write-Host ""

