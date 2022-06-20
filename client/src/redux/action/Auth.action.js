import axios from 'axios';
import { ActionTypes } from './Auth.types';
import { setAlert } from '../action/Alert.action';
import setAuthToken from '../../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const response = await axios.get('/api/user/userbyid');

        dispatch({
            type: ActionTypes.USER_LOADED,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.AUTH_ERROR
        })
    }
}

export const loadAdmin = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const response = await axios.get('/api/user/isAdmin');

        dispatch({
            type: ActionTypes.ADMIN_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.ADMIN_ERROR
        })
    }
}

//register a user
export const registerUser = ({ name, email, password }) => async dispatch => {
    const headersConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const response = await axios.post('/api/user/register', body, headersConfig);

        dispatch({
            type: ActionTypes.REGISTER_SUCCESS,
            payload: response.data
        });

        dispatch(loadUser());

        dispatch(setAlert('Account Has Been Created.', 'Pcreated'))

    } catch (error) {
        const errors = error.response.data.errors;
        // console.log(errors, 'errors');
        if (errors) {
            errors.map(error => dispatch(setAlert(error.msg, 'notMatchedP')))
        }
        dispatch({
            type: ActionTypes.REGISTER_FAIL
        });
    }
}

//login a user
export const loginUser = ({ email, password }) => async dispatch => {
    const headersConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const response = await axios.post('/api/user/login', body, headersConfig);

        dispatch({
            type: ActionTypes.LOGIN_SUCCESS,
            payload: response.data
        });

        dispatch(loadUser());

    } catch (error) {
        const errors = error.response.data.errors;
        // console.log(errors, 'errors');
        if (errors) {
            errors.map(error => dispatch(setAlert(error.msg, 'notMatchedP')))
        }
        dispatch({
            type: ActionTypes.LOGIN_FAIL
        })
    }
}

//logout a user
export const logoutUser = (navigate) => dispatch => {
    dispatch({
        type: ActionTypes.LOGOUT
    });
    
    navigate('/login')
}