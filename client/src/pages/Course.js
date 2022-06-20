import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showCourses } from '../redux/action/Course.action';

const Course = () => {
    const { course } = useSelector((state => state.courseReducer));
    const dispatch = useDispatch();

    console.log(course);

    useEffect(() => {
        dispatch(showCourses())
    },[])
    return (
        <div>
            <h2>This is COurse</h2>
        </div>
    );
};

export default Course;