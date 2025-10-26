@echo off
echo ========================================
echo  BF6 Squad Website - GitHub Deployment
echo ========================================
echo.
echo Dieser Script pusht deine Website zu GitHub
echo.
echo WICHTIG: Du brauchst einen Personal Access Token
echo Erstelle einen hier: https://github.com/settings/tokens/new
echo Scopes: repo (voller Zugriff)
echo.
echo ========================================
echo.

cd /d "i:\Wordpress_NEU\Design Projekte\CAS\CODEX"

echo Schritt 1: Remote hinzufuegen...
git remote add origin https://github.com/maexftw/bf6-squad.git 2>nul
if %errorlevel% neq 0 (
    echo Remote existiert bereits, wird aktualisiert...
    git remote set-url origin https://github.com/maexftw/bf6-squad.git
)

echo.
echo Schritt 2: Branch zu 'main' umbenennen...
git branch -M main

echo.
echo Schritt 3: Push zu GitHub...
echo.
echo WICHTIG: Beim Login:
echo - Username: maexftw
echo - Password: Dein Personal Access Token (NICHT dein GitHub-Passwort!)
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  ✅ ERFOLGREICH!
    echo ========================================
    echo.
    echo Deine Website wurde zu GitHub gepusht!
    echo.
    echo Naechste Schritte:
    echo 1. Gehe zu: https://github.com/maexftw/bf6-squad
    echo 2. Klicke auf Settings ^> Pages
    echo 3. Source: main, Folder: / ^(root^)
    echo 4. Save
    echo.
    echo Deine Website wird live sein unter:
    echo https://maexftw.github.io/bf6-squad/
    echo.
    echo ⏱️ Warte 1-2 Minuten bis GitHub Pages deployed
    echo.
) else (
    echo.
    echo ========================================
    echo  ❌ FEHLER beim Push
    echo ========================================
    echo.
    echo Moegliche Ursachen:
    echo - Repository existiert nicht auf GitHub
    echo - Falscher Access Token
    echo - Keine Internetverbindung
    echo.
    echo Erstelle das Repository zuerst auf GitHub:
    echo https://github.com/new
    echo Name: bf6-squad
    echo Visibility: Public
    echo.
)

echo.
pause
