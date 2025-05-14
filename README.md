# University Management System

A comprehensive web application for managing university operations including student registration, course management, attendance tracking, and grading.

## Quick Start

1. Run the application:
   ```
   run_ums.bat
   ```
   
2. Access different user interfaces:
   - Admin: http://localhost:3000/#/admin/login
   - Instructor: http://localhost:3000/#/instructor/login
   - Student: http://localhost:3000/#/student/login

## Directory Structure

- **docs/** - Documentation and user guides
- **scripts/** - Utility scripts for system administration
- **mongodb-data/** - Database files 
- **university-management-system-main/** - Core application code
  - **client/** - React frontend
  - **server/** - Node.js backend

## User Guides

- See `docs/admin_guide.md` for admin instructions
- See `docs/instructor_guide.md` for instructor instructions
- See `docs/student_guide.md` for student instructions
- See `docs/troubleshooting_guide.html` for solving common issues
- See `docs/database_schema.md` for database documentation

## Utility Scripts

- **run_ums.bat** - Start the application
- **launcher.bat** - Menu system for all functions
- **scripts/admin_panel.bat** - Quick access to admin panel
- **scripts/reset_database.bat** - Reset the database (Windows)
- **scripts/reset_database.sh** - Reset the database (Linux/Mac)

## Technical Details

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB