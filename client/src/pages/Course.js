import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseStyle from '../components/CourseStyle';
import { createcourse, showCourses } from '../redux/action/Course.action';
import { Box } from "@mui/system";
import LinearProgress from '@mui/material/LinearProgress';
import { loadAdmin, logoutUser } from '../redux/action/Auth.action';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Alert from '../components/Alert';
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


const Course = () => {
    const { course } = useSelector((state => state.courseReducer));
    const { admin } = useSelector((state => state.authReducer));
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        setcourseInfo({ ...courseInfo, [e.target.name]: e.target.value })
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(showCourses())
        dispatch(loadAdmin())
    }, [])

    const handleCourse = async () => {
        dispatch(createcourse(id, step_number, title, content, course_name, course_description, terminal_type, current_users, yaml, navigate));
    }
    
    const handleLogout = () => {
        dispatch(logoutUser(navigate))
    }

    if (course === null) {
        return (
            <Box mt={20} sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }
    return (
        <div>
            <Alert></Alert>
            <div className="d-flex justify-content-center mt-5">
                {admin ? <h2>Welcome, You are an Admin</h2> : <h2>Welcome, You are a Viewer</h2>}


                {admin && <button type="button" class="btn btn-info" onClick={handleOpen}>Create Course</button>}
                <button type="button" class="btn btn-danger" onClick={handleLogout}>Logout</button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Alert></Alert>
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
                            variant="outlined" type="text" />
                        <TextField className='mt-1' id="outlined-basic" label="Content"
                            name="content" value={content}
                            onChange={handleChange}
                            variant="outlined" type="text" />
                        <TextField id="outlined-basic" label="Course Name"
                            name="course_name" value={course_name}
                            onChange={handleChange}
                            variant="outlined" type="text" />
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
                        {admin && <button type="button" onClick={handleCourse} className="btn btn-info mt-1">Create Course</button>}
                    </Box>
                </Modal>

            </div>
            {course && course.map(crs => <CourseStyle crs={crs}></CourseStyle>)}
        </div>
    );
};

export default Course;