import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-center mt-5">
                <h1>Hi, There</h1>
            </div>
            <div className="d-flex justify-content-center">
                <NavLink to="/login">
                    <button type="button" class="btn btn-info">View Course</button>
                </NavLink>
            </div>
        </div>
    );
};

export default Home;