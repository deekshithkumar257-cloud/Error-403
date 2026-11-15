@echo off
title NASA: ECHOES BEYOND EARTH - Web App Launcher
color 0B
cls

echo ======================================================================
echo             NASA: ECHOES BEYOND EARTH - MISSION LAUNCHER
echo     The forgotten machines that changed our understanding of space.
echo ======================================================================
echo.

cd /d "%~dp0"

set PORT=8080
set URL=http://localhost:%PORT%

:: Check if Python is available
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [*] Python detected! Starting local HTTP server on port %PORT%...
    echo [*] Opening %URL% in your default web browser...
    start "" "%URL%"
    python -m http.server %PORT%
    goto end
)

:: Check if Node is available
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [*] Node.js detected! Starting local static server on port %PORT%...
    echo [*] Opening %URL% in your default web browser...
    start "" "%URL%"
    node -e "const http = require('http'); const fs = require('fs'); const path = require('path'); const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' }; http.createServer((req, res) => { let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url.split('?')[0]); fs.readFile(filePath, (err, data) => { if (err) { res.writeHead(404); res.end('Not Found'); return; } let ext = path.extname(filePath); res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*' }); res.end(data); }); }).listen(%PORT%, () => console.log('Server running at %URL%'));"
    goto end
)

:: Fallback if neither Python nor Node is installed
echo [!] Neither Python nor Node.js found in PATH.
echo [*] Launching index.html directly with built-in offline telemetry fallback...
start "" "%~dp0index.html"

:end
pause

