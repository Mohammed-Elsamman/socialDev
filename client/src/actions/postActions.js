import axios from 'axios'
import {ADD_POST, GET_POST, GET_POSTS, DELETE_POST, POST_LOADING, GET_ERRORS, CLEAR_ERRORS} from "./types";
import {getGroupPosts} from "./groupActions";
// Add Post
export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/posts', postData)
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
        .get('/api/posts')
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
        .get('/api/posts/my_post')
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
        .get(`/api/posts/${id}`)
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
    if (window.confirm("Are You Shure To Delete this post")) {
        dispatch(setPostLoading())
        axios.delete(`/api/posts/${post_id}`,)
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
    }
};

//LIKE POST
export const addLike = (post_id, groupId) => dispatch => {
    axios.post(`/api/posts/like/${post_id}`)
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
    axios.delete(`/api/posts/unlike/${post_id}`,)
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
    console.log(commentData);
    axios.post(`/api/posts/comment/${post_id}`, commentData)
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
    axios.delete(`/api/posts/comment/${postId}/${commentId}`)
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