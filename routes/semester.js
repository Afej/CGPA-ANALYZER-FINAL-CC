const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Result = require('../models/Result');
const Course = require('../models/Course');
const Semester = require('../models/Semester');

// including other resources and re-routing
const courseRouter = require('./courses');
router.use('/:semesterID/courses', courseRouter);

// @route GET api/semester
// @desc get semester courses of users
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const semesters = await Semester.find({ user: req.user.id }).populate(
      'courses'
    );
    res.json(semesters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route POST api/semester
// @desc Add a new semester
// @access private
router.post('/', auth, async (req, res) => {
  try {
    const semester = await Semester.create({
      user: req.user.id
    });

    res.json(semester);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route  DELETE api/semester/:semesterId
// @desc delete all semester result
// @access private
router.delete('/:id', auth, async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id);

    if (!semester) return res.status(404).json({ msg: 'semester not found' });

    // Make sure user owns course
    if (semester.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    await semester.remove(req.params.id);

    res.json({ msg: 'Semester removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
