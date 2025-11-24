# Get Account ID from Zone ID
# Uses existing Cloudflare API token

$KostConfig = "D:\Arbeit\Workflow\Kost\kost-repo\.cloudflare-config.json"

if (-not (Test-Path $KostConfig)) {
    Write-Host "[ERROR] Kost config not found: $KostConfig" -ForegroundColor Red
    exit 1
}

$config = Get-Content $KostConfig | ConvertFrom-Json

if (-not $config.api_token) {
    Write-Host "[ERROR] api_token missing in config" -ForegroundColor Red
    exit 1
}

if (-not $config.zone_id) {
    Write-Host "[ERROR] zone_id missing in config" -ForegroundColor Red
    exit 1
}

Write-Host "[INFO] Getting Account ID from Zone..." -ForegroundColor Yellow

$headers = @{
    "Authorization" = "Bearer $($config.api_token)"
    "Content-Type" = "application/json"
}

try {
    # Get zone details
    $uri = "https://api.cloudflare.com/client/v4/zones/$($config.zone_id)"
    $response = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers -TimeoutSec 10
    
    if ($response.success) {
        $zone = $response.result
        $accountId = $zone.account.id
        
        Write-Host "[SUCCESS] Account ID found!" -ForegroundColor Green
        Write-Host "  Account ID: $accountId" -ForegroundColor White
        Write-Host ""
        Write-Host "Add this to your config:" -ForegroundColor Yellow
        Write-Host "  account_id: $accountId" -ForegroundColor White
        
        # Update config
        $config | Add-Member -MemberType NoteProperty -Name "account_id" -Value $accountId -Force
        
        # Save updated config
        $config | ConvertTo-Json | Set-Content $KostConfig
        Write-Host ""
        Write-Host "[SUCCESS] Config updated!" -ForegroundColor Green
    }
    else {
        Write-Host "[ERROR] API returned errors: $($response.errors)" -ForegroundColor Red
    }
}
catch {
    Write-Host "[ERROR] Failed: $_" -ForegroundColor Red
    exit 1
}


