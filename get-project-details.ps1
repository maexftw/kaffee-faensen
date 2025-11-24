# Get Cloudflare Pages Project Details

$KostConfig = "D:\Arbeit\Workflow\Kost\kost-repo\.cloudflare-config.json"
$config = Get-Content $KostConfig | ConvertFrom-Json

$ProjectName = "kaffee-faensen"
$accountId = $config.account_id

$headers = @{
    "Authorization" = "Bearer $($config.api_token)"
    "Content-Type" = "application/json"
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Cloudflare Pages Project: $ProjectName" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

try {
    $uri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$ProjectName"
    $response = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers -TimeoutSec 10
    
    if ($response.success) {
        $project = $response.result
        
        Write-Host "[SUCCESS] Project found!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Project Details:" -ForegroundColor Yellow
        Write-Host "  Name: $($project.name)" -ForegroundColor White
        Write-Host "  Subdomain: $($project.subdomain)" -ForegroundColor White
        Write-Host "  URL: https://$($project.subdomain).pages.dev" -ForegroundColor Green
        Write-Host "  Production Branch: $($project.production_branch)" -ForegroundColor White
        Write-Host "  Created: $($project.created_on)" -ForegroundColor Gray
        Write-Host ""
        
        # Check deployments
        Write-Host "Checking deployments..." -ForegroundColor Yellow
        $deployUri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$ProjectName/deployments"
        $deployResponse = Invoke-RestMethod -Uri $deployUri -Method Get -Headers $headers -TimeoutSec 10 -ErrorAction SilentlyContinue
        
        if ($deployResponse.success) {
            $deployments = $deployResponse.result
            if ($deployments.Count -gt 0) {
                $latest = $deployments[0]
                Write-Host "  Latest Deployment:" -ForegroundColor Yellow
                Write-Host "    Status: $($latest.stage.name)" -ForegroundColor White
                Write-Host "    URL: $($latest.url)" -ForegroundColor Green
                Write-Host "    Created: $($latest.created_on)" -ForegroundColor Gray
            }
            else {
                Write-Host "  No deployments yet" -ForegroundColor Yellow
            }
        }
        
        Write-Host ""
        Write-Host "============================================================" -ForegroundColor Cyan
        Write-Host "Next Steps:" -ForegroundColor Cyan
        Write-Host "============================================================" -ForegroundColor Cyan
        Write-Host "1. Connect GitHub Repository (if not connected)" -ForegroundColor White
        Write-Host "2. Set Environment Variables:" -ForegroundColor White
        Write-Host "   - STRIPE_SECRET_KEY" -ForegroundColor Gray
        Write-Host "   - STRIPE_WEBHOOK_SECRET" -ForegroundColor Gray
        Write-Host "   - SITE_URL (https://$($project.subdomain).pages.dev)" -ForegroundColor Gray
        Write-Host "3. Configure Stripe Webhook" -ForegroundColor White
        Write-Host "4. Test Checkout Flow" -ForegroundColor White
        Write-Host ""
        Write-Host "Project URL: https://$($project.subdomain).pages.dev" -ForegroundColor Green
    }
    else {
        Write-Host "[ERROR] Failed to get project: $($response.errors)" -ForegroundColor Red
    }
}
catch {
    Write-Host "[ERROR] Failed: $_" -ForegroundColor Red
}

