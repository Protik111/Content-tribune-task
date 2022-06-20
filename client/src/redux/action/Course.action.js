import axios from "axios";
import { setAlert } from "./Alert.action";
import { ActionTypes } from "./Course.types";

export const showCourses = () => async dispatch => {
    try {
        const response = await axios.get('/api/course/showcourse');

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
        const response = await axios.post('api/course/createcourse', body, headersConfig);

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