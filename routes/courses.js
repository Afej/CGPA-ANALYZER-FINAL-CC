const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Result = require('../models/Result');
const Course = require('../models/Course');
const Semester = require('../models/Semester');

// @route GET api/courses
// @route GET api/semester/courses
// @desc get semester courses of users
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route POST api/semester/courses
// @desc Add course of user to a semester
// @access private
router.post(
  '/',
  [
    auth,
    [
      check('courseName', 'course name is required')
        .not()
        .isEmpty(),
      check('grade', 'please fill in your grade')
        .not()
        .isEmpty(),
      check('unit', 'please fill in correct course unit')
        .not()
        .isEmpty()
        .isNumeric(),
      check('score', 'please fill in your score')
        .not()
        .isEmpty()
        .isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { courseName, grade, unit, score } = req.body;

    try {
      const semester = await Semester.findOne({ user: req.user.id });

      const course = new Course({
        courseName,
        grade,
        unit,
        score,
        user: req.user.id,
        semester: semester._id
      });

      await course.save();
      res.json(course);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route PUT api/courses/:id
// @desc edit/update user result
// @access private
router.put('/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { courseName, grade, score, unit } = req.body;

  // Build Course object
  const courseDetails = {};
  if (courseName) courseDetails.courseName = courseName;
  if (grade) courseDetails.grade = grade;
  if (score) courseDetails.score = score;
  if (unit) courseDetails.unit = unit;

  try {
    let course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ msg: 'Course not found' });

    // Make sure user owns course
    if (course.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: courseDetails },
      { new: true }
    );

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  DELETE api/courses/:id
// @desc delete user result
// @access private
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ msg: 'Course not found' });

    // Make sure user owns course
    if (course.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    await Course.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
