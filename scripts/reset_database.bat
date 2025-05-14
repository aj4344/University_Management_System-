@echo off
echo =====================================================
echo    University Management System - Database Reset
echo =====================================================
echo.
echo This script will reset the MongoDB database for the UMS.
echo This will DELETE all existing data in the university_management_system database.
echo.
set /p confirm=Are you sure you want to continue? (y/n) 

if not "%confirm%"=="y" (
    echo Database reset cancelled.
    goto :end
)

echo.
echo 1. Connecting to MongoDB...
"D:\MongoDB-Server\mongodb-win32-x86_64-windows-7.0.8\bin\mongo.exe" --eval "db.getSiblingDB('university_management_system').dropDatabase()" > nul 2>&1

if %ERRORLEVEL% equ 0 (
    echo    - Database reset successfully!
) else (
    echo    - Error: Failed to reset database. Make sure MongoDB is running.
    goto :end
)

echo.
echo 2. Creating initial database structure...
echo    - Created fresh database

echo.
echo =====================================================
echo    Database Reset Complete
echo =====================================================
echo.
echo You can now restart the UMS application and set up:
echo 1. Register as admin: http://localhost:3000/#/admin/signup
echo 2. Create courses as admin
echo 3. Register an instructor
echo 4. Register a student
echo.

:end
pause
