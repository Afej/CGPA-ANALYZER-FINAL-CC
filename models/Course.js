const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  unit: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'semesters'
  }
});

module.exports = mongoose.model('course', CourseSchema);
