@echo off
echo Starting Cloudflare Tunnel...
"C:\Users\gthuy\AppData\Local\Microsoft\WinGet\Packages\Cloudflare.cloudflared_Microsoft.Winget.Source_8wekyb3d8bbwe\cloudflared.exe" tunnel --url http://localhost:8080
pause
