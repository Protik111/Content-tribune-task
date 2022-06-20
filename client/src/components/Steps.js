import React from 'react';

const Steps = ({step}) => {
    const { id, step_number, title, content } = step;
    return (
        <div className="card p-5">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Id: {id}</li>
                <li className="list-group-item">Step Number : {step_number}</li>
                <li className="list-group-item">Title : {title}</li>
                <li className="list-group-item">Content : {content}</li>
            </ul>
        </div>
    );
};

export default Steps;