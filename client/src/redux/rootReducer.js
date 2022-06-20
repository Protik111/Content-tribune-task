import { combineReducers } from "redux";
import alertReducer from './reducer/Alert.reducer';
import authReducer from "./reducer/Auth.reducer";
import courseReducer from "./reducer/Course.reducer";

export default combineReducers({
    alertReducer,
    authReducer,
    courseReducer
})