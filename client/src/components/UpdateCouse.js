import React, { useEffect, useState } from 'react';
import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './Alert';
import { showSingleCourse, updateCourse } from '../redux/action/Course.action';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UpdateCouse = ({ ids }) => {
    const { admin } = useSelector((state => state.authReducer));
    const { singleCourse } = useSelector((state => state.courseReducer));
    const dispatch = useDispatch();

    const [courseInfo, setcourseInfo] = useState({
        id: '',
        step_number: '',
        title: '',
        content: '',
        course_name: '',
        course_description: '',
        terminal_type: '',
        current_users: '',
        yaml: ''
    });

    const { id, step_number, title, content, course_name, course_description, terminal_type, current_users, yaml } = courseInfo;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setcourseInfo({ ...courseInfo, [e.target.name]: e.target.value })
    }
    const handleCourse = () => {
        dispatch(updateCourse(courseInfo, ids, navigate))
    }

    useEffect(() => {
        dispatch(showSingleCourse(ids))

        setcourseInfo({
            id: '',
            step_number: '',
            title: '',
            content: '',
            course_name: '',
            course_description: '',
            terminal_type: '',
            current_users: '',
            yaml: ''
        });

    }, [])

    // if (singleCourse.length === 0) {
    //     return (
    //         <Box mt={20} sx={{ width: '100%' }}>
    //             <LinearProgress />
    //         </Box>
    //     )
    // }

    return (
        <div>
            <Box sx={style}>
                <TextField id="outlined-basic" label="Id"
                    name="id"
                    value={id}
                    onChange={handleChange}
                    variant="outlined" type="number" />
                <TextField className='mt-1' id="outlined-basic" label="Step Number"
                    value={step_number}
                    onChange={handleChange}
                    name="step_number"
                    variant="outlined" type="number" />
                <TextField className='mt-1' id="Title" label="Title"
                    name="title" value={title}
                    onChange={handleChange}
                    variant="outlined" type="text" placeholder='Required' />
                <TextField className='mt-1' id="outlined-basic" label="Content"
                    name="content" value={content}
                    onChange={handleChange}
                    variant="outlined" type="text" />
                <div className="mt-3">
                    <Alert></Alert>
                </div>
                <TextField id="outlined-basic" label="Course Name"
                    name="course_name" value={course_name}
                    onChange={handleChange}
                    variant="outlined" type="text" placeholder='Required' />
                <TextField className='mt-1' id="outlined-basic" label="Course Description"
                    onChange={handleChange}
                    name="course_description" value={course_description}
                    variant="outlined" type="text" />
                <TextField className='mt-1' id="Title" label="Terminal Type"
                    name="terminal_type" value={terminal_type}
                    onChange={handleChange}
                    variant="outlined" type="text" />
                <TextField className='mt-1' id="outlined-basic" label="Current Users"
                    onChange={handleChange}
                    name="current_users" value={current_users}
                    variant="outlined" type="number" />
                <TextField className='mt-1' id="outlined-basic" label="Yaml"
                    name="yaml" value={yaml}
                    onChange={handleChange}
                    variant="outlined" type="text" />
                {admin && <button type="button" onClick={handleCourse} className="btn btn-info mt-1">Update Course</button>}
            </Box>
        </div>
    );
};

export default UpdateCouse;