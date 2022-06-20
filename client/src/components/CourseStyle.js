import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCourse } from '../redux/action/Course.action';
import Steps from './Steps';

const CourseStyle = ({ crs }) => {
    const { admin } = useSelector((state => state.authReducer));
    const { _id, steps, course_name, course_description, terminal_type, current_users, yaml } = crs;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch(deleteCourse(_id, navigate))
    }
    return (
        <div className="card p-5">
            <div className="d-flex">
                <div className="card-header">
                    Course
                </div>
                <div>
                    {admin && <button type="button" onClick={handleDelete} class="btn btn-danger">Delete Course</button>}
                </div>
            </div>
            <ul className="list-group list-group-flush">
                {steps.map(step => <Steps step={step}></Steps>)}
                <li className="list-group-item">Course Name: {course_name}</li>
                <li className="list-group-item">Course Description : {course_description}</li>
                <li className="list-group-item">Terminal Type : {terminal_type}</li>
                <li className="list-group-item">Current Users : {current_users}</li>
                <li className="list-group-item">Yaml : {yaml}</li>
            </ul>
        </div>
    );
};

export default CourseStyle;