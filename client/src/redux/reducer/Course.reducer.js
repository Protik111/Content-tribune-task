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
        default:
            return state;
    }
}

export default courseReducer;