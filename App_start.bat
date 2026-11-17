@echo off
title Weather app
cd /d "%~dp0"

rem Node.js nemusi byt v systemovej ceste (PATH) - doplnime bezne miesta instalacie.
where npm >nul 2>nul
if errorlevel 1 if exist "%ProgramFiles%\nodejs\npm.cmd" set "PATH=%ProgramFiles%\nodejs;%APPDATA%\npm;%PATH%"
where npm >nul 2>nul
if errorlevel 1 if exist "%ProgramFiles(x86)%\nodejs\npm.cmd" set "PATH=%ProgramFiles(x86)%\nodejs;%APPDATA%\npm;%PATH%"
where npm >nul 2>nul
if errorlevel 1 if exist "%LOCALAPPDATA%\Programs\nodejs\npm.cmd" set "PATH=%LOCALAPPDATA%\Programs\nodejs;%APPDATA%\npm;%PATH%"

where npm >nul 2>nul
if errorlevel 1 (
  echo Nenasiel som npm. Node.js je asi nainstalovany inde - napis, kde ho mas.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Prve spustenie: instalujem kniznice, potrva to par minut...
  call npm install
  if errorlevel 1 (
    echo Instalacia zlyhala. Skopiruj vypis vyssie a posli ho.
    pause
    exit /b 1
  )
)

echo Spustam aplikaciu. Prehliadac sa otvori sam na http://localhost:3000
echo Toto okno nechaj otvorene. Zatvorenim okna sa aplikacia vypne.
call npm start
pause
