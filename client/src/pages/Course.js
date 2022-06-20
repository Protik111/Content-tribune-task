import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseStyle from '../components/CourseStyle';
import { showCourses } from '../redux/action/Course.action';
import { Box } from "@mui/system";
import LinearProgress from '@mui/material/LinearProgress';
import { loadAdmin } from '../redux/action/Auth.action';

const Course = () => {
    const { course } = useSelector((state => state.courseReducer));
    const { admin } = useSelector((state => state.authReducer));
    const dispatch = useDispatch();

    console.log(course);
    console.log(admin);

    useEffect(() => {
        dispatch(showCourses())
        dispatch(loadAdmin())
    },[])

    if (course === null) {
        return (
            <Box mt={20} sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }
    return (
        <div>
            <div className="d-flex justify-content-center mt-5">
                {admin ? <h2>Welcome, You are an Admin</h2> : <h2>Welcome, You are a Viewer</h2>}
            </div>
            {course && course.map(crs => <CourseStyle crs={crs}></CourseStyle>)}
        </div>
    );
};

export default Course;