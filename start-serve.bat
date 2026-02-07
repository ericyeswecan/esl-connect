@echo off
echo Starting serve with CORS enabled...
SET PATH=%PATH%;C:\Program Files\nodejs
cd /d "%~dp0"
call npx -y serve@latest . -l 3000 --cors
