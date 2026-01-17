@echo off
echo ===================================================
echo   Medical Record Interoperability Platform Launcher
echo ===================================================

echo.
echo [1/3] Checking Backend Dependencies...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error installing backend dependencies.
    pause
    exit /b
)

echo.
echo [2/3] Starting Backend Server...
start "AthenaHealth Backend" python app.py

echo.
echo [3/3] Starting Frontend...
cd ..\frontend
call npm install
start "AthenaHealth Frontend" npm run dev

echo.
echo ===================================================
echo   App is running!
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:5173
echo ===================================================
echo.
echo You can close this window, but keep the other two windows open.
pause
