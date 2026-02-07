@echo off
echo ========================================
echo Starting ESL Connect Server and Tunnel
echo ========================================
echo.

REM Kill any existing processes
echo Stopping any existing servers and tunnels...
powershell -Command "Get-Process | Where-Object {$_.ProcessName -like '*python*' -or $_.ProcessName -like '*cloudflared*' -or $_.ProcessName -like '*node*'} | Stop-Process -Force -ErrorAction SilentlyContinue"
timeout /t 2 /nobreak >nul

REM Start the Node.js server on port 8000 in a new window
echo Starting server on port 8000...
start "ESL Connect Server" cmd /k "cd /d "%~dp0" && node -e "const http = require('http'); const fs = require('fs'); const path = require('path'); http.createServer((req, res) => { let filePath = '.' + (req.url === '/' ? '/index.html' : req.url); const ext = path.extname(filePath); const mimeTypes = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' }; const contentType = mimeTypes[ext] || 'application/octet-stream'; fs.readFile(filePath, (err, content) => { if (err) { if (err.code === 'ENOENT') { res.writeHead(404); res.end('404 Not Found'); } else { res.writeHead(500); res.end('Server Error'); } } else { res.writeHead(200, { 'Content-Type': contentType }); res.end(content, 'utf-8'); } }); }).listen(8000, '0.0.0.0', () => { console.log('Server running on http://localhost:8000'); console.log('Press Ctrl+C to stop'); });"

REM Wait a moment for server to start
timeout /t 3 /nobreak >nul

REM Start the Cloudflare tunnel in a new window
echo Starting Cloudflare tunnel...
start "Cloudflare Tunnel" cmd /k "cd /d "%~dp0" && cloudflared tunnel --url http://localhost:8000"

echo.
echo ========================================
echo Both server and tunnel are starting!
echo Check the opened windows for URLs
echo ========================================
pause
