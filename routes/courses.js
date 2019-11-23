const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Result = require("../models/Result");
const Course = require("../models/Course");

// @route GET api/courses
// @desc get resuuuuuuuuuuuuuult of user
// @access private
router.get("/", auth, async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route POST api/courses
// @desc Add course of user
// @access private
router.post(
  "/",
  [
    auth,
    [
      check("courseName", "course name is required")
        .not()
        .isEmpty(),
      check("grade", "please fill in your grade")
        .not()
        .isEmpty(),
      check("unit", "please fill in correct course unit")
        .not()
        .isEmpty()
        .isNumeric(),
      check("score", "please fill in your score")
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
      const newCourse = new Course({
        courseName,
        grade,
        unit,
        score,
        user: req.user.id
      });

      const course = await newCourse.save();
      res.json(course);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route PUT api/courses/:id
// @desc edit/update user result
// @access private
router.put("/:id", (req, res) => {
  res.send("course updated");
});

// @route  DELETE api/courses/:id
// @desc delete user result
// @access private
router.delete("/:id", (req, res) => {
  res.send("course deleted");
});

module.exports = router;
