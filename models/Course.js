const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    steps : {
        type : Array ,
        id: {
            type: Number,
            default: 0,
        },
        step_number: {
            type: Number,
            default: 0,
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    course_name: {
        type: String,
        required: true
    },
    course_description: {
        type: String,
        required: true
    },
    terminal_type: {
        type: String,
        required: true
    },
    current_users: {
        type: Number,
        default: 0
    },
    yaml: {
        type: String,
        default: null
    }
}, { timestamps: true }
)

module.exports = mongoose.model('course', CourseSchema);