import { combineReducers } from "redux";
import alertReducer from './reducer/Alert.reducer';
import authReducer from "./reducer/Auth.reducer";

export default combineReducers({
    alertReducer,
    authReducer
})