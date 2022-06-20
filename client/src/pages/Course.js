import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseStyle from '../components/CourseStyle';
import { showCourses } from '../redux/action/Course.action';
import { Box } from "@mui/system";
import LinearProgress from '@mui/material/LinearProgress';

const Course = () => {
    const { course } = useSelector((state => state.courseReducer));
    const dispatch = useDispatch();

    console.log(course);

    useEffect(() => {
        dispatch(showCourses())
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
            {course && course.map(crs => <CourseStyle crs={crs}></CourseStyle>)}
        </div>
    );
};

export default Course;