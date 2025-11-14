@echo off
echo ========================================
echo Starting CrowdFunding Application
echo ========================================
echo.

REM Kill any existing Java processes
echo Stopping any existing backend...
taskkill /F /IM java.exe 2>nul
timeout /t 2 /nobreak >nul

REM Start Backend
echo.
echo Starting Spring Boot Backend on port 8080...
start "CrowdFunding Backend" cmd /k "cd /d %~dp0backend && mvn spring-boot:run"

REM Wait for backend to start
echo Waiting for backend to start (30 seconds)...
timeout /t 30 /nobreak >nul

REM Start Frontend
echo.
echo Starting React Frontend on port 5173...
start "CrowdFunding Frontend" cmd /k "cd /d %~dp0CrowdFundingApp && npm run dev"

echo.
echo ========================================
echo Application Started!
echo ========================================
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo H2 Console: http://localhost:8080/h2-console
echo ========================================
echo.
echo Press any key to open the application in browser...
pause >nul
start http://localhost:5173
