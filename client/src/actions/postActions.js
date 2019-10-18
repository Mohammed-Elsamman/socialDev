import axios from 'axios'
import {ADD_POST, GET_POST, GET_POSTS, DELETE_POST, POST_LOADING, GET_ERRORS} from "./types";

//ADD POST
export const addPost = postData => dispatch => {
    axios.post("/api/post", postData)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        );
};