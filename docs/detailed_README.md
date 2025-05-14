# University Management System

A comprehensive web application for managing university operations including students, instructors, courses, attendance, and grades.

## System Overview

The University Management System (UMS) is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, and Node.js). It provides a platform for university administrators, instructors, and students to manage various academic processes.

### Key Features

- **User Management**: Register and authenticate as admin, instructor, or student
- **Course Management**: Create, assign, and register for courses
- **Attendance Tracking**: Record and view student attendance
- **Grade Management**: Post and review academic marks for various activities
- **Responsive Design**: Works on desktops, tablets, and mobile devices

## Quick Start

To set up and run the University Management System:

1. Run `run_ums.bat` located in the root directory
2. This will start MongoDB, the backend server, and the frontend client
3. Access the application at http://localhost:3000/

## System Setup Sequence

For optimal functionality, follow this sequence:

1. Register as an admin at http://localhost:3000/#/admin/signup
2. Login as admin and create courses in the admin dashboard
3. Register as an instructor at http://localhost:3000/#/instructor/signup
4. Use the admin account to assign courses to instructors (Offer Course)
5. Register as a student at http://localhost:3000/#/student/signup
6. Login as a student and register for courses (Register Course)
7. Once students are registered for courses, instructors can:
   - Take attendance
   - Post marks for assignments, quizzes, exams, etc.
8. Students can then view their attendance and marks

## Features by User Type

### Admin
- Create and manage courses
- Register and manage instructors
- View system statistics
- Configure system settings

### Instructor
- Manage assigned courses
- Track student attendance
- Record and manage grades
- View enrolled students

### Student
- Register for courses
- View attendance records
- Access grades and academic records
- Manage personal profile

## Technical Details

- **Frontend**: React.js, Bootstrap, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens
- **State Management**: React Context API

## Directory Structure

```
university-management-system-main/
├── client/             # Frontend React application
│   ├── public/         # Static files
│   └── src/            # React source code
│       ├── api/        # API endpoints and services
│       ├── components/ # Reusable UI components
│       ├── contexts/   # React context providers
│       ├── layouts/    # Page layouts
│       ├── pages/      # Page components
│       └── utility/    # Helper functions and constants
├── server/             # Backend Node.js application
│   ├── controllers/    # Request handlers
│   ├── database/       # Database configuration
│   ├── models/         # MongoDB schemas
│   └── routes/         # API routes
```

## Troubleshooting

### Course Selection Issues
- Make sure you're registered for courses as a student before attempting to view attendance or marks
- If course selections aren't appearing, try logging out and logging back in
- Check if the admin has created courses and if instructors have offered those courses

### Database Connection Issues
- Ensure MongoDB is running (check the MongoDB terminal window)
- Verify that the MongoDB connection string in server/.env is correct

### API Connection Issues
- Check that both the server and client are running (on ports 5001 and 3000 respectively)
- Check browser console for any errors

## Common Issues and Solutions

### "No courses/exams found" for Students
- **Solution**: Make sure to:
  1. Register for courses through the "Register Course" page
  2. Wait for instructors to post attendance and marks
  3. Check if the course you registered for appears in the dropdown
  
### "No students found" for Instructors
- **Solution**: Make sure:
  1. The admin has assigned courses to your instructor account
  2. Students have registered for your courses

### Selection Fields Not Working
- **Solution**: 
  1. Restart the application if selection fields aren't populating properly
  2. Check browser console for any API errors
  3. Make sure you've registered for courses before trying to view attendance or marks

### Course Registration Problems
- **Solution**:
  1. Make sure the admin has created courses
  2. Make sure the admin has assigned courses to instructors
  3. Check for any error messages in the browser console
  4. Try logging out and logging back in
  
### Browser Console Debug
If you're experiencing issues, check the browser console (F12):
1. Look for API error messages
2. Verify that network requests are completing successfully
3. Check for any JavaScript errors

See the `troubleshooting_guide.html` file for more detailed troubleshooting steps.

## Additional Resources

- Check the `admin_guide.md` for detailed instructions for administrators
- Check the `instructor_guide.md` for detailed instructions for instructors
- Check the `student_guide.md` for detailed instructions for students
- Reference the `database_schema.md` for comprehensive database documentation
