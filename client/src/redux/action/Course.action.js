import axios from "axios";
import { setAlert } from "./Alert.action";
import { ActionTypes } from "./Course.types";

export const showCourses = () => async dispatch => {
    try {
        const response = await axios.get('https://damp-savannah-56514.herokuapp.com/api/course/showcourse');

        dispatch({
            type: ActionTypes.SHOW_COURSES,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.SHOW_COURSES_ERROR
        })
    }
}

export const createcourse = (id, step_number, title, content, course_name, course_description, terminal_type, current_users, yaml, navigate) => async dispatch => {
    const headersConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ id, step_number, title, content, course_name, course_description, terminal_type, current_users, yaml });

    try {
        const response = await axios.post('https://damp-savannah-56514.herokuapp.com/api/course/createcourse', body, headersConfig);

        dispatch({
            type: ActionTypes.CREATE_COURSE,
        });

        dispatch(setAlert('Course Has Been Created.', 'Pcreated'))
        navigate('/login')

    } catch (error) {
        console.log(error)
        const errors = error.response.data.errors;
        // console.log(errors, 'errors');
        if (errors) {
            errors.map(error => dispatch(setAlert(error.msg, 'notMatchedP')))
        }
        dispatch({
            type: ActionTypes.CREATE_COURSE_ERROR
        });
    }
}

export const deleteCourse = (id, navigate) => async dispatch => {
    try {
        const response = await axios.delete(`https://damp-savannah-56514.herokuapp.com/api/course/deletecourse/${id}`);

        dispatch({
            type: ActionTypes.DELETE_COURSE,
        });

        dispatch(setAlert('Course Deleted Successfully', 'Pcreated'));
        navigate('/login');
    } catch (error) {
        dispatch({
            type: ActionTypes.DELETE_COURSE_ERROR
        })
        dispatch(setAlert('Course Could Not Deleted Successfully', 'notMatchedP'))
}
}


export const updateCourse = (formData, id, navigate) => async dispatch => {

    console.log(id, 'from action update')
    console.log(formData, 'from action update')
    try {
        const headersConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify(formData);

        const response = await axios.put(`https://damp-savannah-56514.herokuapp.com/api/course/updatecourse/${id}`, body, headersConfig);

        dispatch({
            type: ActionTypes.UPDATE_COURSE
        });

        dispatch(setAlert('Course Updated Successfully', 'Pcreated'));
        navigate('/login')

    } catch (error) {
        console.log(error)
        const errors = error.response.data.errors;
        if (errors) {
            errors.map(error => dispatch(setAlert(error.msg, 'notcreated')))
        }

        dispatch({
            type: ActionTypes.UPDATE_COURSE_FAIL
        })
        dispatch(setAlert('Course Could Not Updated Successfully', 'notcreated'));
    }
}


export const showSingleCourse = (id) => async dispatch => {
    console.log(id, 'from action')
    try {
        const response = await axios.get(`https://damp-savannah-56514.herokuapp.com/api/course/coursebyid/${id}`);

        dispatch({
            type: ActionTypes.SHOW_SINGLE_COURSE,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.SHOW_SINGLE_COURSE_ERROR
        })
    }
}