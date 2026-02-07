# Simple HTTP Server for ESL Connect
$port = 8080
$localIp = "192.168.219.104"

Write-Host "Starting ESL Connect development server..." -ForegroundColor Green
Write-Host "Local access: http://localhost:$port/" -ForegroundColor Cyan
Write-Host "Network access: http://${localIp}:$port/" -ForegroundColor Magenta
Write-Host "Mobile access: Use http://${localIp}:$port/ on your phone" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Create HTTP listener (binds to all network interfaces)
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:$port/")
$listener.Start()

Write-Host "Server is running and accessible from all network interfaces" -ForegroundColor Green
Write-Host ""

# Open browser to localhost
Start-Process "http://localhost:$port/"

# Serve files
try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Get requested path
        $path = $request.Url.LocalPath
        if ($path -eq '/') {
            $path = '/index.html'
        }
        
        # Get full file path
        $fullPath = Join-Path $PSScriptRoot $path.TrimStart('/')
        
        Write-Host "$(Get-Date -Format 'HH:mm:ss') - $($request.HttpMethod) $path" -ForegroundColor Gray
        
        if (Test-Path $fullPath -PathType Leaf) {
            # Read file content
            $content = [System.IO.File]::ReadAllBytes($fullPath)
            
            # Set content type based on file extension
            $extension = [System.IO.Path]::GetExtension($fullPath)
            $contentType = switch ($extension) {
                '.html' { 'text/html' }
                '.css' { 'text/css' }
                '.js' { 'application/javascript' }
                '.json' { 'application/json' }
                '.png' { 'image/png' }
                '.jpg' { 'image/jpeg' }
                '.jpeg' { 'image/jpeg' }
                '.gif' { 'image/gif' }
                '.svg' { 'image/svg+xml' }
                '.ico' { 'image/x-icon' }
                default { 'application/octet-stream' }
            }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $content.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($content, 0, $content.Length)
        }
        else {
            # 404 Not Found
            $response.StatusCode = 404
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found: $path")
            $response.ContentLength64 = $notFound.Length
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
        }
        
        $response.Close()
    }
}
finally {
    $listener.Stop()
    Write-Host "`nServer stopped." -ForegroundColor Yellow
}
