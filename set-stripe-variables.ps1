# Set Stripe Environment Variables for Cloudflare Pages

$KostConfig = "D:\Arbeit\Workflow\Kost\kost-repo\.cloudflare-config.json"
$config = Get-Content $KostConfig | ConvertFrom-Json

$ProjectName = "kaffee-faensen"
$accountId = $config.account_id

$headers = @{
    "Authorization" = "Bearer $($config.api_token)"
    "Content-Type" = "application/json"
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Set Stripe Environment Variables" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Get project details
$projectUri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$ProjectName"
$projectResponse = Invoke-RestMethod -Uri $projectUri -Method Get -Headers $headers -TimeoutSec 10
$project = $projectResponse.result
$siteUrl = "https://$($project.subdomain).pages.dev"

Write-Host "Project: $ProjectName" -ForegroundColor Green
Write-Host "URL: $siteUrl" -ForegroundColor Green
Write-Host ""

# Stripe Public Key (Publishable Key)
$stripePublishableKey = "pk_live_51Qux1QA474V2RPC70UGsqm5kVzdp4zdFKuyl1L0DZy2LiDbzwGIiQNR78SHXdMDIB6jZgE8O061OvRKTXMra5tTs009lPwFNzL"

Write-Host "Stripe Keys:" -ForegroundColor Yellow
Write-Host "  Public Key (Publishable): $stripePublishableKey" -ForegroundColor White
Write-Host "  Secret Key: [NEEDED - sk_live_...]" -ForegroundColor Yellow
Write-Host ""

# Variables to set
$variables = @(
    @{
        key = "SITE_URL"
        type = "plain_text"
        value = $siteUrl
    },
    @{
        key = "STRIPE_PUBLISHABLE_KEY"
        type = "plain_text"
        value = $stripePublishableKey
    }
)

Write-Host "Setting environment variables..." -ForegroundColor Yellow
Write-Host ""

$varUri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$ProjectName/variables"

foreach ($var in $variables) {
    Write-Host "Setting $($var.key)..." -ForegroundColor Cyan
    
    try {
        $body = $var | ConvertTo-Json
        $response = Invoke-RestMethod -Uri $varUri -Method Put -Headers $headers -Body $body -TimeoutSec 10
        
        if ($response.success) {
            Write-Host "  [SUCCESS] $($var.key) set!" -ForegroundColor Green
        }
        else {
            Write-Host "  [ERROR] Failed: $($response.errors)" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "  [ERROR] Failed: $_" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Important: Secret Key Required" -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "You provided the PUBLIC KEY (pk_live_...)" -ForegroundColor White
Write-Host "For backend functions, we need the SECRET KEY (sk_live_...)" -ForegroundColor Yellow
Write-Host ""
Write-Host "To get your Secret Key:" -ForegroundColor White
Write-Host "1. Go to: https://dashboard.stripe.com/apikeys" -ForegroundColor Cyan
Write-Host "2. Find 'Secret key' (starts with sk_live_)" -ForegroundColor White
Write-Host "3. Click 'Reveal' to see it" -ForegroundColor White
Write-Host ""
Write-Host "Then set it manually in Cloudflare Dashboard:" -ForegroundColor White
Write-Host "  Pages -> $ProjectName -> Settings -> Environment Variables" -ForegroundColor Cyan
Write-Host "  Add: STRIPE_SECRET_KEY = sk_live_..." -ForegroundColor White
Write-Host ""
Write-Host "Or run this script again with the secret key" -ForegroundColor Gray
Write-Host ""

