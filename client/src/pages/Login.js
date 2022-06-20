import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import { setAlert } from '../redux/action/Alert.action';
import { registerUser } from '../redux/action/Auth.action';
import { loginUser } from '../redux/action/Auth.action';
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/Alert';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        isAdmin: false
    });

    const { token, isAuthenticated } = useSelector((state => state.authReducer));
    const dispatch = useDispatch();
    // console.log(alertReducer, 'alertReducer');


    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleChange2 = () => {
        setUserInfo({
            ...userInfo, isAdmin: !isAdmin
        })
    }

    const { name, email, password, password2, isAdmin } = userInfo;

    console.log(userInfo)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(userInfo, 'data');

        if (newUser && password === password2) {
            dispatch(registerUser({ name, email, password }))
        } else if (newUser && password !== password2) {
            dispatch(setAlert("Password does not match.", "notMatchedP"));
        }

        if (!newUser && email && password) {
            dispatch(loginUser({ email, password }));
        }else if(!newUser || !email || !password) {
            dispatch(setAlert("Please Provide All Information.", "notMatchedP"))
        }

    }

    if (isAuthenticated) {
        return (<Navigate to="/course"></Navigate>)
    }

    return (
        <>
            <div className={`${styles.registration_container} container-fluid py-5`}>
                <div className="m-2 d-flex justify-content-center">
                    {newUser ? <h3>Account Sign Up</h3> : <h3>Account Login</h3>}
                </div>
                <div className={`${styles.alert_container} mt5 pb-3`}>
                    <Alert></Alert>
                </div>
                <div className={styles.login_container}>
                    <form onSubmit={handleSubmit}>
                        {newUser && <div>
                            <label htmlFor="name">Name</label>
                            <br />
                            <input onChange={handleChange} className="" type="text" name="name" id="name" />
                        </div>}
                        <div>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input onChange={handleChange} className="" type="email" name="email" id="email" autoFocus />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <br />
                            <input onChange={handleChange} type="password" name="password" id="password" />
                        </div>
                        {!newUser && <div className=''>
                            <label className={styles.labeled} htmlFor="isAdmin">Creator?</label>
                            <input className={styles.checkboxed} onChange={handleChange2} type="checkbox" name="isAdmin" id="isAdmin"  defaultChecked={isAdmin}/>
                        </div>}
                        {newUser && <div>
                            <label htmlFor="password2">Confirm Password</label>
                            <br />
                            <input onChange={handleChange} type="password" name="password2" id="password2" />
                        </div>}
                        <div className={`${styles.login_btn} mt-3`}>
                            <button type="submit">{newUser ? 'Sign Up' : 'Login'}</button>
                            <div className="mt-1">
                                {newUser ?
                                    <a style={{ color: 'green', cursor: 'pointer' }} onClick={() => setNewUser(!newUser)}>Already Have Account?</a>
                                    : <a style={{ color: 'green', cursor: 'pointer' }} onClick={() => setNewUser(!newUser)}>Are A New User?</a>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;