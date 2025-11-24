# Set Environment Variables for Cloudflare Pages

$KostConfig = "D:\Arbeit\Workflow\Kost\kost-repo\.cloudflare-config.json"
$config = Get-Content $KostConfig | ConvertFrom-Json

$ProjectName = "kaffee-faensen"
$accountId = $config.account_id

$headers = @{
    "Authorization" = "Bearer $($config.api_token)"
    "Content-Type" = "application/json"
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Set Environment Variables for $ProjectName" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Get current project to get correct URL
$projectUri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$ProjectName"
$projectResponse = Invoke-RestMethod -Uri $projectUri -Method Get -Headers $headers -TimeoutSec 10
$project = $projectResponse.result
$siteUrl = "https://$($project.subdomain).pages.dev"

Write-Host "Project URL: $siteUrl" -ForegroundColor Green
Write-Host ""

# Variables to set
$variables = @{
    "SITE_URL" = $siteUrl
}

Write-Host "Environment Variables to set:" -ForegroundColor Yellow
Write-Host "  SITE_URL = $siteUrl" -ForegroundColor White
Write-Host ""
Write-Host "You need to set these manually:" -ForegroundColor Yellow
Write-Host "  STRIPE_SECRET_KEY (from Stripe Dashboard)" -ForegroundColor White
Write-Host "  STRIPE_WEBHOOK_SECRET (after webhook setup)" -ForegroundColor White
Write-Host ""

$setSiteUrl = Read-Host "Set SITE_URL now? (y/n)"
if ($setSiteUrl -eq "y") {
    try {
        $varUri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$ProjectName/variables"
        
        $body = @{
            key = "SITE_URL"
            type = "plain_text"
            value = $siteUrl
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri $varUri -Method Put -Headers $headers -Body $body -TimeoutSec 10
        
        if ($response.success) {
            Write-Host "[SUCCESS] SITE_URL set!" -ForegroundColor Green
        }
        else {
            Write-Host "[ERROR] Failed: $($response.errors)" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "[ERROR] Failed to set SITE_URL: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Manual Steps:" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to Cloudflare Dashboard:" -ForegroundColor White
Write-Host "   https://dash.cloudflare.com -> Pages -> $ProjectName -> Settings -> Environment Variables" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Add these variables:" -ForegroundColor White
Write-Host "   STRIPE_SECRET_KEY = sk_test_... (from Stripe Dashboard)" -ForegroundColor Gray
Write-Host "   STRIPE_WEBHOOK_SECRET = whsec_... (after webhook setup)" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Configure Stripe Webhook:" -ForegroundColor White
Write-Host "   Endpoint: $siteUrl/api/stripe-webhook" -ForegroundColor Cyan
Write-Host "   Events: checkout.session.completed, payment_intent.succeeded" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Test checkout flow" -ForegroundColor White
Write-Host ""

