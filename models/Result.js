const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'semesters'
  },
  cgpa: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('result', ResultSchema);
