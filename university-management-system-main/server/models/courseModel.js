const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    creditHours: {
      type: Number,
      default: 3,
    },
    fee: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true
    },
    adminId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    maxMarks: {
      type: Number,
      default: 100,
    },
    passingMarks: {
      type: Number,
      default: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("courses", courseSchema);
