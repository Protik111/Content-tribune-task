import { ActionTypes } from './Alert.types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: ActionTypes.SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: ActionTypes.REMOVE_ALERT, payload: id}), 3000);
};