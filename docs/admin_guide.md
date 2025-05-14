# University Management System - Admin Setup Guide

## How to Register and Use the Admin Panel

1. **Access Admin Registration**
   - Open your browser and navigate to: http://localhost:3000/#/admin/signup
   - This is the link to register as an administrator

2. **Create an Admin Account**
   - Fill in the admin registration form:
     - First Name
     - Last Name
     - Email (use a valid format like admin@university.com)
     - Password (create a secure password)
   - Click "Register" to create your admin account

3. **Login to Admin Panel**
   - After registration, you'll be redirected to the login page
   - If not redirected automatically, go to: http://localhost:3000/#/admin/login
   - Enter your email and password
   - Click "Login"

4. **Create Courses in Admin Panel**
   - In the admin dashboard, look for "Register Course" option in the menu
   - Click on it to access the course registration form
   - Fill in the course details:
     - Title (e.g., "Computer Science 101")
     - Code (e.g., "CS101")
     - Type (e.g., "Core" or "Elective")
     - Fee (e.g., "5000")
     - Credit Hours (e.g., "3")
   - Click "Register" to create the course

5. **Assign Courses to Instructors**
   - In the admin dashboard, look for "Offer Course" option
   - Select a course from the dropdown list (courses you just created)
   - Select an instructor from the dropdown list
     - Note: You need to have instructors registered first
     - If no instructors exist, register one at: http://localhost:3000/#/instructor/signup
   - Click "Offer" to assign the course to the instructor

6. **Verify Courses Are Available**
   - After creating courses and assigning them to instructors, they will be available for student registration
   - Log in as a student to see the available courses in the "Register Course" section

## Troubleshooting Admin Access

If you're having trouble accessing the admin panel or features:

1. **Check URL Formatting**
   - Make sure you're using the hash (#) in the URL: http://localhost:3000/#/admin/signup
   - Not: http://localhost:3000/admin/signup (incorrect)

2. **Clear Browser Cache**
   - Press Ctrl+Shift+Delete
   - Clear browsing data, especially cookies and cached files
   - Try accessing the admin pages again

3. **Check Server Status**
   - Make sure both the backend server and MongoDB are running
   - Check the terminal windows that were opened by run_ums.bat

4. **Inspect Network Requests**
   - Open browser developer tools (F12)
   - Go to the Network tab
   - Attempt to register/login as admin
   - Check for any failed requests (red entries)

5. **Check Console for Errors**
   - In browser developer tools (F12)
   - Go to Console tab
   - Look for any error messages when accessing admin pages

If these steps don't resolve your issues, consider restarting the entire application using the run_ums.bat script.
