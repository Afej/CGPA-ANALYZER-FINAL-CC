const mongoose = require("mongoose");

const ResultSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'
    }],
    totalUnits: {
        type: Number,
        required: true
    },
    gpa: {
        type: Number,
        required: true
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

module.exports = mongoose.model("result", ResultSchema);
