require('dotenv').config('../.env');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const data = require('../utils/data');
const User = require('../models/User');

//bulk data insert
router.get('/bulk', async (req, res) => {
    try {
        await Course.insertMany(data);
        return res.status(200).json({ msg: 'Inserted Successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error Occurred' })
    }
})

//show all corses
router.get('/showcourse', auth, async (req, res) => {
    try {
        const courses = await Course.find({})
        if (!courses) {
            return res.status(400).json({ msg: 'No Course Found' })
        }
        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error Occurred' })
    }
})

//create course
router.post('/createcourse', [auth, [
    body('id', 'Id is Required').notEmpty(),
    body('step_number', 'Step Number is Required').notEmpty(),
    body('title', 'Title is Required').notEmpty(),
    body('content', 'Content is Required').notEmpty(),
    body('course_name', 'Course Name is Required').notEmpty(),
    body('course_description', 'Course Description is Required').notEmpty(),
    body('terminal_type', 'Terminal Type is Required').notEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };

    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user.email !== 'admin@gmail.com') {
            return res.status(400).json({ msg: 'Your are not allowed to create course.' })
        }

        const { id, step_number, title, content, course_name, course_description, terminal_type, current_users, yaml } = req.body;

        const stepsProperty = {};
        if (title) stepsProperty.title = title;
        if (content) stepsProperty.content = content;
        if (id) stepsProperty.id = id;
        if (step_number) stepsProperty.step_number = step_number;

        const newCourse = new Course({
            steps: stepsProperty,
            course_name: course_name,
            course_description: course_description,
            terminal_type: terminal_type,
            current_users: current_users,
            yaml: yaml
        });

        const createdCourse = await newCourse.save();
        return res.send(createdCourse);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error Occurred' })
    }
})

module.exports = router;