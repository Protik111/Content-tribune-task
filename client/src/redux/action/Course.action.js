import axios from "axios";
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