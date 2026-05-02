@echo off
title KidLearn — Educational App (port 3001)
cd /d "%~dp0"
echo.
echo  ╔══════════════════════════════════════════╗
echo  ║   KidLearn — Educational App            ║
echo  ║   URL:  http://localhost:3001           ║
echo  ║   Port: 3001  (dedicated, never shared) ║
echo  ╚══════════════════════════════════════════╝
echo.
echo  NOTE: VEXQORA runs on port 5173.
echo  This app ALWAYS runs on port 3001.
echo  Do NOT use http://localhost:5173 for this app.
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  ERROR: Node.js not installed. Download from https://nodejs.org
    pause
    exit /b 1
)

:: Check if port 3001 is already in use
netstat -ano | findstr ":3001 " | findstr "LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo  ERROR: Port 3001 is already in use.
    echo  Close whatever is using port 3001 first, then try again.
    echo  Run: netstat -ano ^| findstr ":3001"
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo  Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo  ERROR: npm install failed.
        pause
        exit /b 1
    )
)

echo  Starting KidLearn at http://localhost:3001
echo  Press Ctrl+C to stop.
echo.
npm run dev
pause
