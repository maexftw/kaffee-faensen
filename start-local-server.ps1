# Start Local HTTP Server for Kaffee Faensen

$port = 8000
$path = Get-Location

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Starting Local HTTP Server" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Server will start on: http://localhost:$port" -ForegroundColor Green
Write-Host "Path: $path" -ForegroundColor Gray
Write-Host ""
Write-Host "Pages:" -ForegroundColor Yellow
Write-Host "  Homepage: http://localhost:$port/shop/homepage.html" -ForegroundColor White
Write-Host "  Shop: http://localhost:$port/shop/shop.html" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Simple HTTP Server using .NET HttpListener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "[SUCCESS] Server started!" -ForegroundColor Green
    Write-Host ""
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") {
            $localPath = "/index.html"
        }
        
        $filePath = Join-Path $path $localPath.TrimStart('/')
        
        Write-Host "[$($request.HttpMethod)] $localPath" -ForegroundColor Gray
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $extension = [System.IO.Path]::GetExtension($filePath)
            
            $contentType = switch ($extension) {
                ".html" { "text/html; charset=utf-8" }
                ".css" { "text/css" }
                ".js" { "application/javascript" }
                ".json" { "application/json" }
                ".png" { "image/png" }
                ".jpg" { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".svg" { "image/svg+xml" }
                ".avif" { "image/avif" }
                default { "application/octet-stream" }
            }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $content.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($content, 0, $content.Length)
        }
        else {
            $response.StatusCode = 404
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $localPath")
            $response.ContentLength64 = $notFound.Length
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
        }
        
        $response.Close()
    }
}
catch {
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
}
finally {
    $listener.Stop()
    Write-Host ""
    Write-Host "Server stopped." -ForegroundColor Yellow
}

