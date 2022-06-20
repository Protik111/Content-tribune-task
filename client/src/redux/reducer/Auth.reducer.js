import { ActionTypes } from '../action/Auth.types';

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    loading: true,
    admin: false
}

const authReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false
            };
        case ActionTypes.ADMIN_SUCCESS:
            return {
                ...state,
                admin: payload,
                user: payload,
                isAuthenticated: true,
                loading: false
            }
        case ActionTypes.ADMIN_ERROR:
            return {
                ...state,
                admin: false,
                user: payload,
                isAuthenticated: true,
                loading: false
            }
        case ActionTypes.REGISTER_SUCCESS:
        case ActionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case ActionTypes.REGISTER_FAIL:
        case ActionTypes.AUTH_ERROR:
        case ActionTypes.LOGIN_FAIL:
        case ActionTypes.LOGOUT:
        case 'ACCOUNT_DELETE':
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                admin: false
            };
        default:
            return state;
    }
}

export default authReducer;