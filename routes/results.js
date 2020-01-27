const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Result = require('../models/Result');
const Course = require('../models/Course');
const Semester = require('../models/Semester');

// @route GET api/results
// @desc get result of user including semesters and courses
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id });
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route POST api/results
// @desc Add result of suer
// @access private
router.post('/', (req, res) => {
  res.send('user result added');
});

// @route PUT api/results/:id
// @desc edit/update user result
// @access private
router.put('/:id', (req, res) => {
  res.send('Result updated');
});

// @route  DELETE api/results/:id
// @desc delete user result
// @access private
router.delete('/:id', (req, res) => {
  res.send('Result deleted');
});

module.exports = router;
