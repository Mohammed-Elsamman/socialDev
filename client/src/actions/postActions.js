import axios from 'axios'
import {ADD_POST, GET_POST, GET_POSTS, DELETE_POST, POST_LOADING, GET_ERRORS, CLEAR_ERRORS} from "./types";
import {getGroupPosts} from "./groupActions";
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
                payload: err.response.data.errors
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

// Get User Posts
export const getUserPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/post/my_post')
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

// Get Post
export const getPost = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/post/${id}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POST,
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
export const addLike = (post_id, groupId) => dispatch => {
    axios.post(`/api/post/like/${post_id}`)
        .then(res => {
            if (groupId) {
                return dispatch(getGroupPosts(groupId))
            } else {
                return dispatch(getPosts())
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        );
};

//UNLIKE POST
export const removeLike = (post_id, groupId) => dispatch => {
    axios.delete(`/api/post/unlike/${post_id}`,)
        .then(res => {
            if (groupId) {
                return dispatch(getGroupPosts(groupId))
            } else {
                return dispatch(getPosts())
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        );
};


//Add Comment
export const addComment = (post_id, commentData) => dispatch => {
    dispatch(clearErrors());
    axios.post(`/api/post/comment/${post_id}`, commentData)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        );
};

//delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios.delete(`/api/post/comment/${postId}/${commentId}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
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