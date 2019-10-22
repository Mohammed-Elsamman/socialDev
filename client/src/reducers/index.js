import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from "./postReducer";
import followReducer from "./followReducer";
import groupReducer from "./groupReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    post: postReducer,
    follow: followReducer,
    group: groupReducer,
});
