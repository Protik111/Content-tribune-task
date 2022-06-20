require('dotenv').config('../.env');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Course = require('../models/Course');
const data = require('../utils/data');
//bulk data insert
router.get('/bulk', async (req, res) => {
    try {
        await Course.insertMany(data);
        res.status(200).json({ msg: 'Inserted Successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error Occurred'})
    }
})

module.exports = router;