@echo off
title KidLearn — Production Build
cd /d "%~dp0"
echo.
echo  ╔══════════════════════════════════════╗
echo  ║    KidLearn - Building for prod...   ║
echo  ╚══════════════════════════════════════╝
echo.
if not exist "node_modules" (
    echo  Running npm install first...
    npm install
)
echo  Building...
npm run build
if %errorlevel% equ 0 (
    echo.
    echo  Build successful! Output is in: dist\
    echo  To preview: npm run preview
) else (
    echo  Build failed. Check errors above.
)
pause
