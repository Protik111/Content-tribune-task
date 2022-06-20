import { ActionTypes } from '../action/Course.types.js';

const initialState = {
    course: null
}

const courseReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.SHOW_COURSES:
            return {
                ...state,
                course: payload
            }
        case ActionTypes.SHOW_COURSES_ERROR:
            return {
                ...state,
                course: null
            }
        case ActionTypes.CREATE_COURSE:
        case ActionTypes.CREATE_COURSE_ERROR:
        case ActionTypes.DELETE_COURSE:
        case ActionTypes.DELETE_COURSE_ERROR:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default courseReducer;