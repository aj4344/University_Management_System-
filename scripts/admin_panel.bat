@echo off
echo =====================================================
echo    University Management System - Admin Panel
echo =====================================================
echo.
echo Opening Admin Panel access...

start "" "http://localhost:3000/#/admin/login"

echo.
echo =====================================================
echo    Admin Panel Access
echo =====================================================
echo.
echo If you need to create a new admin account, use:
echo http://localhost:3000/#/admin/signup
echo.
echo If you need to access other panels:
echo Student: http://localhost:3000/#/student/login
echo Instructor: http://localhost:3000/#/instructor/login
echo.
echo If you're experiencing issues with course registration:
echo 1. Make sure MongoDB is running
echo 2. Ensure you've created courses as admin first
echo 3. Assign courses to instructors using "Offer Course"
echo 4. Then students can register for those courses
echo.
pause
