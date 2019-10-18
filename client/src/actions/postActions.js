import axios from 'axios'
import {ADD_POST, GET_POST, GET_POSTS, DELETE_POST, POST_LOADING, GET_ERRORS, CLEAR_ERRORS} from "./types";

// Add Post
export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/post', postData)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Get Posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/post')
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
};
//DELETE POST
export const deletePost = (post_id) => dispatch => {
    dispatch(setPostLoading())
    axios.delete(`/api/post/${post_id}`,)
        .then(res =>
            dispatch({
                type: DELETE_POST,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        );
};

//LIKE POST
export const addLike = post_id => dispatch => {
    axios.post(`/api/post/like/${post_id}`)
        .then(res => dispatch(getPosts()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        );
};

//UNLIKE POST
export const removeLike = (post_id) => dispatch => {
    axios.delete(`/api/post/unlike/${post_id}`,)
        .then(res =>
            dispatch(getPosts()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        );
};

//set loading post
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};