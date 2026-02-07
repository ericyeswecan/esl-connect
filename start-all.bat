@echo off
SET PATH=%PATH%;C:\Program Files\nodejs
cd /d %~dp0
start "Serve Server" cmd /k "npx -y serve@latest . -l 3000 --cors"
timeout /t 5
start "Cloudflare Tunnel" cmd /k "C:\Users\gthuy\AppData\Local\Microsoft\WinGet\Packages\Cloudflare.cloudflared_Microsoft.Winget.Source_8wekyb3d8bbwe\cloudflared.exe tunnel --url http://localhost:3000"
