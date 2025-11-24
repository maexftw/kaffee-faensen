@echo off
echo ========================================
echo  BF6 Squad Website - Local PHP Server
echo ========================================
echo.
echo Starting PHP server on localhost:8000...
echo.
echo Open in your browser:
echo.
echo Test API: http://localhost:8000/.superdesign/api/test-tracker.php
echo Squad Website: http://localhost:8000/.superdesign/design_iterations/bf6_team_9.html
echo.
echo Press CTRL+C to stop the server
echo.
echo ========================================
echo.

cd /d "i:\Wordpress_NEU\Design Projekte\CAS\CODEX"
php -S localhost:8000

pause
