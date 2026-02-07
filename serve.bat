@echo off
echo Starting development server with serve...
SET PATH=%PATH%;C:\Program Files\nodejs
npx -y serve . -l 8080 --no-port-switching --no-clipboard
pause
