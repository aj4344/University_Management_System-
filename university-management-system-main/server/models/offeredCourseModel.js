const mongoose = require("mongoose");

const offeredCourseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    instructorId: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
    },
    courseCode: {
      type: String,
    },
    instructorName: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("offeredCourse", offeredCourseSchema);
