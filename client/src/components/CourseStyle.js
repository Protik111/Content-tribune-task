import React from 'react';
import Steps from './Steps';

const CourseStyle = ({crs}) => {
    const {steps, course_name, course_description, terminal_type, current_users, yaml} = crs;

    console.log(steps, course_name, course_description, terminal_type, current_users, yaml)
    console.log(crs)
    return (
        <div className="card p-5">
            <div className="card-header">
                Steps
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