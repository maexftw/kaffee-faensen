# Set Environment Variables - Using correct Cloudflare Pages API

$KostConfig = "D:\Arbeit\Workflow\Kost\kost-repo\.cloudflare-config.json"
$config = Get-Content $KostConfig | ConvertFrom-Json

$ProjectName = "kaffee-faensen"
$accountId = $config.account_id

$headers = @{
    "Authorization" = "Bearer $($config.api_token)"
    "Content-Type" = "application/json"
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Set Environment Variables (Cloudflare Pages API)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Get project
$projectUri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$ProjectName"
$projectResponse = Invoke-RestMethod -Uri $projectUri -Method Get -Headers $headers -TimeoutSec 10
$project = $projectResponse.result
$siteUrl = "https://$($project.subdomain).pages.dev"

Write-Host "Project: $ProjectName" -ForegroundColor Green
Write-Host "URL: $siteUrl" -ForegroundColor Green
Write-Host ""

# Check current variables
Write-Host "Checking current environment variables..." -ForegroundColor Yellow
try {
    $varsUri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$ProjectName/variables"
    $varsResponse = Invoke-RestMethod -Uri $varsUri -Method Get -Headers $headers -TimeoutSec 10 -ErrorAction SilentlyContinue
    
    if ($varsResponse.success) {
        $currentVars = $varsResponse.result
        Write-Host "Current variables:" -ForegroundColor Yellow
        foreach ($var in $currentVars) {
            $value = if ($var.type -eq "secret_text") { "***hidden***" } else { $var.value }
            Write-Host "  $($var.key) = $value ($($var.type))" -ForegroundColor Gray
        }
        Write-Host ""
    }
}
catch {
    Write-Host "Could not retrieve current variables (this is OK if none are set)" -ForegroundColor Yellow
    Write-Host ""
}

# Stripe Public Key
$stripePublishableKey = "pk_live_51Qux1QA474V2RPC70UGsqm5kVzdp4zdFKuyl1L0DZy2LiDbzwGIiQNR78SHXdMDIB6jZgE8O061OvRKTXMra5tTs009lPwFNzL"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Environment Variables Summary" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To set via Cloudflare Dashboard:" -ForegroundColor Yellow
Write-Host "  https://dash.cloudflare.com -> Pages -> $ProjectName -> Settings -> Environment Variables" -ForegroundColor Cyan
Write-Host ""
Write-Host "Variables to set:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. SITE_URL" -ForegroundColor White
Write-Host "   Type: Plain text" -ForegroundColor Gray
Write-Host "   Value: $siteUrl" -ForegroundColor Green
Write-Host ""
Write-Host "2. STRIPE_PUBLISHABLE_KEY" -ForegroundColor White
Write-Host "   Type: Plain text" -ForegroundColor Gray
Write-Host "   Value: $stripePublishableKey" -ForegroundColor Green
Write-Host ""
Write-Host "3. STRIPE_SECRET_KEY" -ForegroundColor White
Write-Host "   Type: Secret text (IMPORTANT!)" -ForegroundColor Yellow
Write-Host "   Value: sk_live_... (get from Stripe Dashboard)" -ForegroundColor Yellow
Write-Host "   Get it here: https://dashboard.stripe.com/apikeys" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. STRIPE_WEBHOOK_SECRET" -ForegroundColor White
Write-Host "   Type: Secret text" -ForegroundColor Gray
Write-Host "   Value: whsec_... (after webhook setup)" -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Next Steps" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Get Stripe Secret Key:" -ForegroundColor White
Write-Host "   - Go to: https://dashboard.stripe.com/apikeys" -ForegroundColor Cyan
Write-Host "   - Find 'Secret key' (starts with sk_live_)" -ForegroundColor White
Write-Host "   - Click 'Reveal' to see it" -ForegroundColor White
Write-Host ""
Write-Host "2. Set all variables in Cloudflare Dashboard" -ForegroundColor White
Write-Host ""
Write-Host "3. Configure Stripe Webhook:" -ForegroundColor White
Write-Host "   - Endpoint: $siteUrl/api/stripe-webhook" -ForegroundColor Cyan
Write-Host "   - Events: checkout.session.completed, payment_intent.succeeded" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Test checkout flow" -ForegroundColor White
Write-Host ""

