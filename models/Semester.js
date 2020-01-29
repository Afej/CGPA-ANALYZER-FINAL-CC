const mongoose = require('mongoose');

const SemesterSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    cgpa: {
      type: Number
      // required: true
    },
    totalUnits: {
      type: Number
      // required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Cascade delete courses when a semster is deleted
SemesterSchema.pre('remove', async function(next) {
  console.log(`Courses being removed from semester ${this._id}`);
  await this.model('course').deleteMany({ semester: this._id });
  next();
});

// Reverse populate with virtuals
SemesterSchema.virtual('courses', {
  ref: 'course',
  localField: '_id',
  foreignField: 'semester',
  justOne: false
});

module.exports = mongoose.model('semester', SemesterSchema);
