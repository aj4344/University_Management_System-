const courseSchema = require('../models/courseModel');
const instructorSchema = require('../models/instructorModel');
const studentSchema = require('../models/studentModel');
const offeredCourseSchema = require('../models/offeredCourseModel');
const registeredCourseSchema = require('../models/registeredCourseModel');

const registerCourse = async (req, res) => {
  try {
    const { title, creditHours, fee, type, code, adminId } = req.body;

    // validation
    switch (true) {
      case !title:
        return res.status(400).send({
          success: false,
          message: 'Title is mandatory!',
        });
      case !fee:
        return res.status(400).send({
          success: false,
          message: 'Fee is mandatory!',
        });
      case !type:
        return res.status(400).send({
          success: false,
          message: 'Type is mandatory!',
        });
      case !code:
        return res.status(400).send({
          success: false,
          message: 'Code is mandatory!',
        });
      case !adminId:
        return res.status(400).send({
          success: false,
          message: 'Admin ID is mandatory!',
        });
      default:
        break;
    }

    // ensuring uniqueness
    const courseExists = await courseSchema.find({ title, code });
    if (courseExists.length) {
      return res.status(400).send({
        success: false,
        message: 'This course already exists.',
      });
    }

    // registration
    const newCourse = new courseSchema({
      title,
      creditHours: creditHours ? creditHours : 1,
      fee,
      type,
      code,
      adminId,
    });
    const result = await newCourse.save();

    if (result) {
      res.status(200).send({
        success: true,
        message: 'Course registered successfully!',
        data: newCourse,
      });
    } else {
      res.status(500).send({
        success: false,
        message: 'Something went wrong while registering the course.',
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong while registering the course.',
      error,
    });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await courseSchema.find();
    if (courses.length) {
      res.status(200).send({
        success: true,
        message: 'Courses fetched successfully!',
        count: courses.length,
        data: courses,
      });
    } else {
      res.status(204).send({
        success: true,
        message: 'No courses so far.',
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong while fetching the courses.',
      error,
    });
  }
};

const getSingleCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await courseSchema.findById(id);
    if (course) {
      res.status(200).send({
        success: true,
        message: 'Course fetched successfully!',
        data: course,
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'Course not found.',
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong while fetching the course.',
      error,
    });
  }
};

const editCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, creditHours, fee, type, code } = req.body;

    const course = await courseSchema.findById(id);
    if (!course) {
      res.status(404).send({
        success: false,
        message: 'Course not found.',
      });
    }

    // validation
    switch (true) {
      case !title:
        return res.status(400).send({
          success: false,
          message: 'Title cannot be empty!',
        });
      case !fee:
        return res.status(400).send({
          success: false,
          message: 'Fee cannot be empty!',
        });
      case !type:
        return res.status(400).send({
          success: false,
          message: 'Type cannot be empty!',
        });
      case !code:
        return res.status(400).send({
          success: false,
          message: 'Code cannot be empty!',
        });
      default:
        break;
    }

    // editing
    const editedCourse = await courseSchema.findByIdAndUpdate(
      id,
      {
        title,
        creditHours: creditHours ? creditHours : 1,
        fee,
        type,
        code,
      },
      { new: true }
    );
    if (editedCourse) {
      res.status(200).send({
        success: true,
        message: "Course's information edited successfully!",
        data: editedCourse,
      });
    } else {
      res.status(500).send({
        success: false,
        message: 'Something went wrong while editing the course.',
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong while editing the course.',
      error,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;

    const course = await courseSchema.findById(id);
    if (!course) {
      res.status(404).send({
        success: false,
        message: 'Course not found.',
      });
    }

    // deleting data in referenced documents (if needed...)
    // deleting
    const deletedCourse = await courseSchema.findByIdAndDelete(id);
    if (deletedCourse) {
      res.status(200).send({
        success: true,
        message: 'Course deleted successfully!',
        data: deletedCourse,
      });
    } else {
      res.status(500).send({
        success: false,
        message: 'Something went wrong while deleting the course.',
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong while deleting the course.',
      error,
    });
  }
};

const registerOfferedCourse = async (req, res) => {
  try {
    const { courseId, instructorId } = req.body;

    // validation
    switch (true) {
      case !courseId:
        return res.status(400).send({
          success: false,
          message: 'Course ID is mandatory!',
        });
      case !instructorId:
        return res.status(400).send({
          success: false,
          message: 'Instructor ID is mandatory!',
        });
      default:
        break;
    }

    // ensuring course's and instructor's existence
    const courseExists = await courseSchema.findById(courseId);
    const instructorExists = await instructorSchema.findById(instructorId);
    if (!instructorExists && !courseExists) {
      return res.status(400).send({
        success: false,
        message: 'Neither this course nor this instructor exist.',
      });
    }
    if (!courseExists) {
      return res.status(400).send({
        success: false,
        message: 'This course does not exist.',
      });
    }
    if (!instructorExists) {
      return res.status(400).send({
        success: false,
        message: 'This instructor does not exist.',
      });
    }

    // ensuring uniqueness
    const offeredCourseExists = await offeredCourseSchema.find({
      courseId,
      instructorId,
    });
    if (offeredCourseExists.length) {
      return res.status(400).send({
        success: false,
        message: 'This instructor is already taking this course.',
      });
    }

    // registration
    const newOfferedCourse = new offeredCourseSchema({
      courseId,
      instructorId,
    });
    const result = await newOfferedCourse.save();

    if (result) {
      res.status(200).send({
        success: true,
        message: 'Course offered successfully!',
        data: newOfferedCourse,
      });
    } else {
      res.status(500).send({
        success: false,
        message: 'Something went wrong while offering the course.',
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong while offering the course.',
      error,
    });
  }
};

const getOfferedCoursesOfInstructor = async (req, res) => {
  try {
    const id = req.params.id;
    const registeredCourses = await offeredCourseSchema.find({
      instructorId: id,
    });
    if (registeredCourses.length) {
      let registeredCoursesDetail = [];
      for (let i = 0; i < registeredCourses.length; i++) {
        const element = registeredCourses[i];
        const course = await courseSchema.findById(element.courseId);
        registeredCoursesDetail.push(course);
      }
      res.status(200).send({
        success: true,
        message: 'Offered courses of this instructor fetched successfully!',
        count: registeredCourses.length,
        data: registeredCoursesDetail,
      });
    } else {
      res.status(204).send({
        success: true,
        message: 'No offered courses of this instructor so far.',
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong while fetching the courses.',
      error,
    });
  }
};

const registerRegisteredCourse = async (req, res) => {
  try {
    console.log("Starting course registration process", req.body);
    const { courseId, instructorId, studentId } = req.body;

    // validation
    switch (true) {
      case !courseId:
        return res.status(400).send({
          success: false,
          message: 'Course ID is mandatory!',
        });
      case !instructorId:
        return res.status(400).send({
          success: false,
          message: 'Instructor ID is mandatory!',
        });
      case !studentId:
        return res.status(400).send({
          success: false,
          message: 'Student ID is mandatory!',
        });
      default:
        break;
    }

    // ensuring course's, instructor's and student's existence
    const courseExists = await courseSchema.findById(courseId);
    const instructorExists = await instructorSchema.findById(instructorId);
    const studentExists = await studentSchema.findById(studentId);
    
    console.log("Existence checks:", {
      courseExists: !!courseExists, 
      instructorExists: !!instructorExists, 
      studentExists: !!studentExists
    });
    
    if (!courseExists && !instructorExists && !studentExists) {
      return res.status(400).send({
        success: false,
        message: 'This course, instructor and student do not exist.',
      });
    }
    if (!courseExists) {
      return res.status(400).send({
        success: false,
        message: 'This course does not exist.',
      });
    }
    if (!instructorExists) {
      return res.status(400).send({
        success: false,
        message: 'This instructor does not exist.',
      });
    }
    if (!studentExists) {
      return res.status(400).send({
        success: false,
        message: 'This student does not exist.',
      });
    }

    // ensuring uniqueness
    const registeredCourseExists = await registeredCourseSchema.find({
      courseId,
      studentId,
    });
    
    console.log("Checking if course is already registered:", 
      registeredCourseExists.length > 0 ? "Already registered" : "Not registered yet");
    
    if (registeredCourseExists.length) {
      return res.status(400).send({
        success: false,
        message: 'This student has already registered this course.',
      });
    }

    // Check if the course is actually offered by this instructor
    const offeredCourseExists = await offeredCourseSchema.findOne({
      courseId,
      instructorId
    });
    
    console.log("Checking if course is offered by this instructor:", 
      offeredCourseExists ? "Yes" : "No");
      
    if (!offeredCourseExists) {
      return res.status(400).send({
        success: false,
        message: 'This course is not offered by the specified instructor.',
      });
    }

    // registration
    console.log("Creating new registered course entry");
    const newRegisteredCourse = new registeredCourseSchema({
      courseId,
      instructorId,
      studentId,
    });
    const result = await newRegisteredCourse.save();

    if (result) {
      console.log("Course registered successfully:", result);
      res.status(200).send({
        success: true,
        message: 'Course registered successfully!',
        data: newRegisteredCourse,
      });
    } else {
      console.log("Failed to save registered course");
      res.status(500).send({
        success: false,
        message: 'Something went wrong while registering for the course.',
        error: "Database error - failed to save"
      });
    }
  } catch (error) {
    console.error("Error in registerRegisteredCourse:", error);
    res.status(500).send({
      success: false,
      message: 'Something went wrong while registering for the course.',
      error: error.message,
    });
  }
};

const getRegisteredCoursesOfStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const registeredCourses = await registeredCourseSchema.find({
      studentId: id,
    });
    if (registeredCourses.length) {
      let registeredCoursesDetail = [];
      for (let i = 0; i < registeredCourses.length; i++) {
        const element = registeredCourses[i];
        const course = await courseSchema.findById(element.courseId);
        const instructor = await instructorSchema.findById(
          element.instructorId
        );
        registeredCoursesDetail.push({
          ...course._doc,
          instructorName: instructor.fname + ' ' + instructor.lname,
        });
      }
      res.status(200).send({
        success: true,
        message: 'Registered courses of this student fetched successfully!',
        count: registeredCourses.length,
        data: registeredCoursesDetail,
      });
    } else {
      res.status(204).send({
        success: true,
        message: 'No registered courses of this student so far.',
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong while fetching the courses.',
      error,
    });
  }
};

const getOfferedCourses = async (req, res) => {
  try {
    // Check if there are any offered courses
    const registeredCourses = await offeredCourseSchema.find();
    
    if (!registeredCourses || registeredCourses.length === 0) {
      console.log("No offered courses found in database");
      return res.status(200).send({
        success: true,
        message: 'No courses are currently being offered.',
        data: [],
      });
    }
    
    console.log(`Found ${registeredCourses.length} offered courses`);
    
    // Process the offered courses to include details
    let registeredCoursesDetail = [];
    for (let i = 0; i < registeredCourses.length; i++) {
      const element = registeredCourses[i];
      try {
        const course = await courseSchema.findById(element.courseId);
        const instructor = await instructorSchema.findById(
          element.instructorId
        );
        
        if (course && instructor) {
          // Check if student has already registered for this course
          registeredCoursesDetail.push({
            ...course._doc,
            courseId: course._id,
            title: course.title,
            description: course.description || "",
            code: course.code,
            type: course.type,
            fee: course.fee,
            creditHours: course.creditHours,
            instructorId: instructor._id,
            instructorName: instructor.fname + ' ' + instructor.lname,
          });
        } else {
          console.log(`Missing course or instructor data for offered course ${element._id}`);
        }
      } catch (err) {
        console.log(`Error fetching course details: ${err.message}`);
        // Skip problematic courses without failing the whole request
      }
    }
    
    // Return the results
    if (registeredCoursesDetail.length > 0) {
      console.log(`Successfully processed ${registeredCoursesDetail.length} offered courses`);
      res.status(200).send({
        success: true,
        message: 'Offered courses fetched successfully!',
        count: registeredCoursesDetail.length,
        data: registeredCoursesDetail,
      });
    } else {
      console.log("No valid offered courses found after processing");
      res.status(200).send({
        success: true,
        message: 'No valid offered courses found.',
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in getOfferedCourses:", error);
    res.status(500).send({
      success: false,
      message: 'Something went wrong while fetching the courses.',
      error: error.message,
    });
  }
};

const getRegisteredStudentsOfInstructor = async (req, res) => {
  try {
    const id = req.params.id;
    const registeredStudents = await registeredCourseSchema.find({
      instructorId: id,
    });
    if (registeredStudents.length) {
      let registeredStudentsDetail = [];
      for (let i = 0; i < registeredStudents.length; i++) {
        const element = registeredStudents[i];
        const student = await studentSchema.findById(element.studentId);
        const course = await courseSchema.findById(element.courseId);
        if (student && course)
          registeredStudentsDetail.push({
            ...(student._doc),
            courseTitle: course.title,
            courseId: course._id,
          });
      }
      res.status(200).send({
        success: true,
        message: 'Registered students of this instructor fetched successfully!',
        count: registeredStudents.length,
        data: registeredStudentsDetail,
      });
    } else {
      res.status(204).send({
        success: true,
        message: 'No registered students of this instructor so far.',
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong while fetching the students.',
      error,
    });
  }
};

module.exports = {
  registerCourse,
  getCourses,
  getSingleCourse,
  editCourse,
  deleteCourse,
  registerOfferedCourse,
  getOfferedCoursesOfInstructor,
  registerRegisteredCourse,
  getRegisteredCoursesOfStudent,
  getOfferedCourses,
  getRegisteredStudentsOfInstructor,
};
