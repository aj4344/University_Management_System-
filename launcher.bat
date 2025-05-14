@echo off
setlocal enabledelayedexpansion
title University Management System - Launcher
color 0A

:menu
cls
echo =====================================================
echo    University Management System - Main Launcher
echo =====================================================
echo.
echo Choose an option:
echo.
echo [1] Start UMS (MongoDB, Server, Client)
echo [2] Access Admin Panel
echo [3] Reset Database
echo [4] Open Documentation
echo [5] Exit
echo.
echo =====================================================
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    call run_ums.bat
    goto menu
) else if "%choice%"=="2" (
    call scripts\admin_panel.bat
    goto menu
) else if "%choice%"=="3" (
    call scripts\reset_database.bat
    goto menu
) else if "%choice%"=="4" (
    echo.
    echo Choose documentation to open:
    echo.
    echo [1] Admin Guide
    echo [2] Instructor Guide
    echo [3] Student Guide
    echo [4] Troubleshooting Guide
    echo [5] Database Schema Documentation
    echo [6] Back to Main Menu
    echo.
    set /p docChoice="Enter your choice (1-6): "
    
    if "!docChoice!"=="1" (
        start "" "docs\admin_guide.md"
    ) else if "!docChoice!"=="2" (
        start "" "docs\instructor_guide.md"
    ) else if "!docChoice!"=="3" (
        start "" "docs\student_guide.md"
    ) else if "!docChoice!"=="4" (
        start "" "docs\troubleshooting_guide.html"
    ) else if "!docChoice!"=="5" (
        start "" "docs\database_schema.md"
    )
    goto menu
) else if "%choice%"=="5" (
    exit
) else (
    echo.
    echo Invalid choice. Please try again.
    timeout /t 2
    goto menu
)
