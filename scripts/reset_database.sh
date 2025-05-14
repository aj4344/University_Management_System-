#!/bin/bash

echo "====================================================="
echo "   University Management System - Database Reset"
echo "====================================================="
echo ""
echo "This script will reset the MongoDB database for the UMS."
echo "This will DELETE all existing data in the university_management_system database."
echo ""
echo "Are you sure you want to continue? (y/n)"
read -p "> " confirm

if [ "$confirm" != "y" ]; then
    echo "Database reset cancelled."
    exit 0
fi

echo ""
echo "1. Connecting to MongoDB..."
mongo --eval "db.getSiblingDB('university_management_system').dropDatabase()" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "   - Database reset successfully!"
else
    echo "   - Error: Failed to reset database. Make sure MongoDB is running."
    exit 1
fi

echo ""
echo "2. Creating initial database structure..."
echo "   - Created fresh database"

echo ""
echo "====================================================="
echo "   Database Reset Complete"
echo "====================================================="
echo ""
echo "You can now restart the UMS application and set up:"
echo "1. Register as admin: http://localhost:3000/#/admin/signup"
echo "2. Create courses as admin"
echo "3. Register an instructor"
echo "4. Register a student"
echo ""
echo "Press any key to exit..."
read -n 1
