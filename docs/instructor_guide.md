# University Management System - Guide for Instructors

## How to Register as an Instructor

1. **Start the Application**
   - Run the batch file: `d:\MLDL-Pro\UniversityManagementSystem\run_ums.bat`
   - Wait for MongoDB, the server, and the client to start

2. **Navigate to Instructor Registration**
   - Open your browser and go to: http://localhost:3000/#/instructor/signup
   - Alternatively, go to http://localhost:3000/#/instructor/login and click "Sign Up"
   - You'll see our newly styled registration form

3. **Fill out the Registration Form**
   - Enter your First Name
   - Enter your Last Name
   - Enter your Email (use a valid format like example@domain.com)
   - Create a Password (remember this for future logins)
   - Click the "Register" button

4. **Log In as Instructor**
   - After successful registration, you'll be redirected to the login page
   - Enter your Email and Password
   - Click "Login"

5. **Instructor Dashboard**
   - You'll now see your instructor dashboard
   - Initially, you won't have any courses assigned to you

## Course Management

1. **Getting Courses Assigned**
   - An admin must first register at http://localhost:3000/#/admin/signup
   - The admin should create courses in their dashboard
   - The admin will then assign these courses to your instructor account
   - Once assigned, courses will appear in your dashboard

2. **Managing Students**
   - After courses are assigned, students can register for your courses
   - You can view enrolled students in the "Students" section
   - Students must register for your courses before they appear in your lists

3. **Taking Attendance**
   - Navigate to the "Attendance" section
   - Select the course and date
   - Mark attendance for each student (Present, Absent, Leave)
   - Click "Post" to save the attendance records

4. **Managing Marks**
   - Navigate to the "Marks" section
   - Select the course, exam type (Quiz, Assignment, Mid Term, Final Term)
   - Enter the activity number, total marks, and weightage
   - Enter marks for each student
   - Click "Post" to save the marks

## Important Notes

For the instructor account to be fully functional, an admin needs to assign courses to you:

1. **Admin Registration**
   - Someone needs to register as an admin at: http://localhost:3000/#/admin/signup
   - The admin needs to log in and create courses
   - The admin then assigns those courses to your instructor account

2. **Course Management**
   - Once courses are assigned to you, you can:
     - Take attendance for students
     - Manage academic records
     - View enrolled students

## Troubleshooting

- If selection fields don't work properly, ensure they have correct values (non-null)
- Make sure your instructor account has courses assigned by an admin
- Verify that students have registered for your courses before attempting to mark attendance or grades
- If you encounter any issues with data not appearing, check the browser console for errors

For technical support, please refer to the system administrator.
