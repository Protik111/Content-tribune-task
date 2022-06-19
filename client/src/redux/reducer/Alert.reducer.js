import { ActionTypes } from '../action/Alert.types';

const initialState = [];

const alertReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.SET_ALERT: 
            return [...state, payload];
        case ActionTypes.REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}

export default alertReducer;