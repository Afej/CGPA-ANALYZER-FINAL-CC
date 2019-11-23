const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
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
});

module.exports = mongoose.model("course", CourseSchema);
