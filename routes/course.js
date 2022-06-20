require('dotenv').config('../.env');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const data = require('../utils/data');
//bulk data insert
router.get('/bulk', async (req, res) => {
    try {
        await Course.insertMany(data);
        return res.status(200).json({ msg: 'Inserted Successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error Occurred'})
    }
})

//show all corses
router.get('/showcourse', auth, async (req, res) => {
    try {
        const courses = await Course.find({})
        if(!courses) {
            return res.status(400).json({ msg: 'No Course Found'})
        }
        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error Occurred'})
    }
})

module.exports = router;