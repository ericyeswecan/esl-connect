@echo off
cd /d %~dp0
echo Starting HTTP Server on port 3000...
start "HTTP Server" cmd /k "npx -y http-server . -p 3000 --cors"
timeout /t 5
echo Starting Cloudflare Tunnel...
start "Cloudflare Tunnel" cmd /k "C:\Users\gthuy\AppData\Local\Microsoft\WinGet\Packages\Cloudflare.cloudflared_Microsoft.Winget.Source_8wekyb3d8bbwe\cloudflared.exe tunnel --url http://localhost:3000"
echo.
echo Servers are starting...
echo Check the "Cloudflare Tunnel" window for your public URL
pause
