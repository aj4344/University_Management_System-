# University Management System - Database Schema Documentation

This document provides comprehensive information about the database models, their relationships, primary keys, foreign keys, and other database design elements in the University Management System.

## Database Overview

The University Management System uses MongoDB as its database, with Mongoose as the ODM (Object Data Modeling) library. MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.

**Connection String**: `mongodb://localhost:27017/university_management_system`

## Models

### 1. Admin Model

This model stores information about system administrators.

**Collection**: `admins`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | ObjectId | Auto-generated | Primary key |
| fname | String | Yes | First name of the admin |
| lname | String | Yes | Last name of the admin |
| email | String | Yes | Email of the admin (unique) |
| password | String | Yes | Password for authentication |
| createdAt | Date | Auto-generated | Timestamp of creation |
| updatedAt | Date | Auto-generated | Timestamp of last update |

**Relationships**:
- One admin can register multiple courses (one-to-many relationship with Course model)

### 2. Instructor Model

This model stores information about course instructors.

**Collection**: `instructors`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | ObjectId | Auto-generated | Primary key |
| fname | String | Yes | First name of the instructor |
| lname | String | Yes | Last name of the instructor |
| email | String | Yes | Email of the instructor (unique) |
| password | String | Yes | Password for authentication |
| createdAt | Date | Auto-generated | Timestamp of creation |
| updatedAt | Date | Auto-generated | Timestamp of last update |

**Relationships**:
- One instructor can offer multiple courses (one-to-many relationship with OfferedCourse model)
- One instructor can teach multiple registered courses (one-to-many relationship with RegisteredCourse model)
- One instructor can record attendance for multiple students (one-to-many relationship with Attendance model)
- One instructor can record academic records for multiple students (one-to-many relationship with Academic model)

### 3. Student Model

This model stores information about students.

**Collection**: `students`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | ObjectId | Auto-generated | Primary key |
| fname | String | Yes | First name of the student |
| lname | String | Yes | Last name of the student |
| email | String | Yes | Email of the student (unique) |
| rollNumber | Number | Yes | Unique roll number (4-digit) |
| password | String | Yes | Password for authentication |
| createdAt | Date | Auto-generated | Timestamp of creation |
| updatedAt | Date | Auto-generated | Timestamp of last update |

**Relationships**:
- One student can register for multiple courses (one-to-many relationship with RegisteredCourse model)
- One student can have multiple attendance records (one-to-many relationship with Attendance model via nested documents)
- One student can have multiple academic records (one-to-many relationship with Academic model via nested documents)

### 4. Course Model

This model stores information about courses offered by the university.

**Collection**: `courses`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | ObjectId | Auto-generated | Primary key |
| title | String | Yes | Name of the course |
| creditHours | Number | No (default: 3) | Credit hours for the course |
| fee | Number | Yes | Fee for the course |
| type | String | Yes | Type of the course (e.g., core, elective) |
| code | String | Yes | Course code (unique) |
| adminId | String | Yes | Reference to the admin who created the course |
| description | String | No (default: "") | Description of the course |
| maxMarks | Number | No (default: 100) | Maximum marks for the course |
| passingMarks | Number | No (default: 50) | Passing marks for the course |
| createdAt | Date | Auto-generated | Timestamp of creation |
| updatedAt | Date | Auto-generated | Timestamp of last update |

**Relationships**:
- Many courses can be created by one admin (many-to-one relationship with Admin model)
- One course can be offered by multiple instructors (one-to-many relationship with OfferedCourse model)
- One course can be registered by multiple students (one-to-many relationship with RegisteredCourse model)
- One course can have multiple attendance records (one-to-many relationship with Attendance model)
- One course can have multiple academic records (one-to-many relationship with Academic model)

### 5. OfferedCourse Model

This model represents courses being offered by instructors.

**Collection**: `offeredCourse`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | ObjectId | Auto-generated | Primary key |
| courseId | String | Yes | Reference to the course being offered |
| instructorId | String | Yes | Reference to the instructor offering the course |
| courseName | String | No | Name of the course (denormalized data) |
| courseCode | String | No | Code of the course (denormalized data) |
| instructorName | String | No | Name of the instructor (denormalized data) |
| description | String | No | Description of the offered course |
| createdAt | Date | Auto-generated | Timestamp of creation |
| updatedAt | Date | Auto-generated | Timestamp of last update |

**Relationships**:
- Many offered courses can be associated with one instructor (many-to-one relationship with Instructor model)
- Many offered courses can be associated with one course (many-to-one relationship with Course model)
- The combination of courseId and instructorId must be unique

### 6. RegisteredCourse Model

This model represents courses registered by students with a specific instructor.

**Collection**: `registeredCourse`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | ObjectId | Auto-generated | Primary key |
| courseId | String (ref: courses) | Yes | Reference to the course being registered |
| instructorId | String (ref: instructors) | Yes | Reference to the instructor teaching the course |
| studentId | String | Yes | Reference to the student registering for the course |
| createdAt | Date | Auto-generated | Timestamp of creation |
| updatedAt | Date | Auto-generated | Timestamp of last update |

**Relationships**:
- Many registered courses can be associated with one student (many-to-one relationship with Student model)
- Many registered courses can be associated with one instructor (many-to-one relationship with Instructor model)
- Many registered courses can be associated with one course (many-to-one relationship with Course model)
- The combination of courseId, instructorId, and studentId must be unique

### 7. Academic Model

This model stores academic records such as exam marks for students.

**Collection**: `academics`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | ObjectId | Auto-generated | Primary key |
| examType | String | Yes | Type of examination (e.g., Quiz, Assignment, Mid-Term, Final) |
| weightage | Number | Yes | Weightage of the exam in overall course evaluation |
| totalMarks | Number | Yes | Total marks for the exam |
| activityNumber | Number | No (default: 1) | Activity number (e.g., Quiz 1, Quiz 2) |
| activityName | String | No (default: "") | Name of the activity |
| instructorId | String | Yes | Reference to the instructor recording the marks |
| courseId | String | Yes | Reference to the course for which marks are being recorded |
| marks | Array | Yes | Array of mark records for students |
| marks.obtainedMarks | Number | Yes | Marks obtained by the student |
| marks.studentId | String | Yes | Reference to the student |
| marks.isPublic | Boolean | Yes | Whether the marks are visible to the student |
| marks.comment | String | No (default: "") | Comment on the student's performance |
| marks.dateAdded | Date | No (default: Date.now) | Date when marks were added |
| createdAt | Date | Auto-generated | Timestamp of creation |
| updatedAt | Date | Auto-generated | Timestamp of last update |

**Relationships**:
- Many academic records can be associated with one instructor (many-to-one relationship with Instructor model)
- Many academic records can be associated with one course (many-to-one relationship with Course model)
- Contains embedded documents for student marks (one-to-many relationship with Student model)
- The combination of instructorId, courseId, examType, and activityNumber should be unique

### 8. Attendance Model

This model stores attendance records for students in courses.

**Collection**: `attendances`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | ObjectId | Auto-generated | Primary key |
| date | Date | Yes | Date of the attendance |
| instructorId | String | Yes | Reference to the instructor recording the attendance |
| courseId | String | Yes | Reference to the course for which attendance is being recorded |
| attendance | Array | Yes | Array of attendance records for students |
| attendance.studentId | String | Yes | Reference to the student |
| attendance.status | String | Yes | Attendance status (e.g., "P" for present, "A" for absent, "L" for late) |
| attendance.isPublic | Boolean | Yes | Whether the attendance is visible to the student |
| createdAt | Date | Auto-generated | Timestamp of creation |
| updatedAt | Date | Auto-generated | Timestamp of last update |

**Relationships**:
- Many attendance records can be associated with one instructor (many-to-one relationship with Instructor model)
- Many attendance records can be associated with one course (many-to-one relationship with Course model)
- Contains embedded documents for student attendance (one-to-many relationship with Student model)
- The combination of instructorId, courseId, and date should be unique

## Database Relationships

### Direct References

1. **Course to Admin**: Course references adminId
2. **OfferedCourse to Course**: OfferedCourse references courseId
3. **OfferedCourse to Instructor**: OfferedCourse references instructorId
4. **RegisteredCourse to Course**: RegisteredCourse references courseId
5. **RegisteredCourse to Instructor**: RegisteredCourse references instructorId
6. **RegisteredCourse to Student**: RegisteredCourse references studentId
7. **Academic to Course**: Academic references courseId
8. **Academic to Instructor**: Academic references instructorId
9. **Attendance to Course**: Attendance references courseId
10. **Attendance to Instructor**: Attendance references instructorId

### Embedded Documents

1. **Academic to Student**: Academic contains an array of mark objects that reference studentId
2. **Attendance to Student**: Attendance contains an array of attendance objects that reference studentId

## Data Flow

1. **Course Registration Process**:
   - Admin creates courses
   - Instructors offer courses (creates OfferedCourse records)
   - Students register for courses with specific instructors (creates RegisteredCourse records)

2. **Attendance Flow**:
   - Instructor records attendance for students in a course on a specific date
   - Student can view their attendance if isPublic flag is true

3. **Academic Records Flow**:
   - Instructor records marks for students in a course for various exam types
   - Student can view their marks if isPublic flag is true

## Database Design Considerations

1. **Denormalization**: Some fields like courseName, courseCode, and instructorName are denormalized in the OfferedCourse model for faster queries.

2. **Embedded Documents**: The Academic and Attendance models use embedded documents for storing student-specific data, which is efficient for querying and reduces the number of collections.

3. **References**: The system uses string references (instead of ObjectId references) between collections, which is a common pattern in MongoDB applications.

4. **Uniqueness Constraints**: 
   - Email addresses are unique across Admin, Instructor, and Student collections
   - Roll numbers are unique in the Student collection
   - Course codes are unique in the Course collection
   - The combination of courseId and instructorId is unique in the OfferedCourse collection
   - The combination of courseId, instructorId, and studentId is unique in the RegisteredCourse collection

5. **Timestamps**: All models include createdAt and updatedAt timestamps to track when records were created and last modified.

## Pass/Fail Criteria

A student is considered to have passed a course if they meet the following criteria:
- Their marks are equal to or above the passing marks threshold (default: 50% of total marks)
- As implemented in the markUtils.js utility, a student passes if:
  - They obtain 100% marks (full marks), or
  - They score at least 50% of the total marks

## Database Maintenance

The MongoDB database requires minimal maintenance. Regular backups are recommended to prevent data loss.

For development purposes, the database runs locally at the default MongoDB port (27017). For production deployment, appropriate security measures should be implemented.
