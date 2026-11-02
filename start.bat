@echo off
REM Startet den AP2 Trainer lokal unter http://localhost:8080
cd /d "%~dp0"
start "" http://localhost:8080
where python >nul 2>nul && (python -m http.server 8080) || (py -m http.server 8080)
