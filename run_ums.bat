@echo off
echo Starting University Management System...

echo 1. Starting MongoDB Server...
start cmd /k "D:\MongoDB-Server\mongodb-win32-x86_64-windows-7.0.8\bin\mongod.exe --dbpath=D:\data\db"
timeout /t 5

echo 2. Starting Backend Server...
start cmd /k "cd d:\MLDL-Pro\UniversityManagementSystem\university-management-system-main\server && node index.js"
timeout /t 5

echo 3. Starting Frontend Client...
start cmd /k "cd d:\MLDL-Pro\UniversityManagementSystem\university-management-system-main\client && npm start"

echo 4. Opening Admin Access page...
timeout /t 5
start d:\MLDL-Pro\UniversityManagementSystem\scripts\admin_panel.bat

echo University Management System started successfully!
echo.
echo -------------------------------------------------
echo IMPORTANT SETUP INSTRUCTIONS:
echo -------------------------------------------------
echo 1. Register as an admin first (http://localhost:3000/#/admin/signup)
echo 2. Login as admin and create courses
echo 3. Register as an instructor (http://localhost:3000/#/instructor/signup)
echo 4. Login as admin and assign courses to instructors (Offer Course)
echo 5. Register as a student (http://localhost:3000/#/student/signup)
echo 6. Login as a student and register for courses (Register Course)
echo 7. Now you will be able to see course data in the student dashboard
echo.
echo -------------------------------------------------
echo TROUBLESHOOTING TIPS:
echo -------------------------------------------------
echo * If you can't register courses:
echo   - Check that an admin has created courses and assigned them to instructors
echo   - Open browser console (F12) to check for API errors
echo.
echo * If you can't see marks:
echo   - Make sure you've registered for courses first
echo   - Select both a course and an exam type from the dropdowns
echo   - Instructors need to post marks before you can see them
echo.
echo * For detailed troubleshooting, see docs\troubleshooting_guide.html
echo -------------------------------------------------
echo.
