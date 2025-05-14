const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema(
  {
    examType: {
      type: String,
      required: true,
    },
    weightage: {
      type: Number,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    marks: [
      {
        obtainedMarks: {
          type: Number,
          required: true,
        },
        studentId: {
          type: String,
          required: true,
        },
        isPublic: {
          type: Boolean,
          required: true,
        },
        comment: {
          type: String,
          default: "",
        },
        dateAdded: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    activityNumber: {
      type: Number,
      default: 1,
    },
    activityName: {
      type: String,
      default: "",
    },
    instructorId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('academics', academicSchema);
