import axios from 'axios'
import {GET_GROUP, GET_GROUPS, ADD_GROUP, GET_ERRORS, GET_POSTS} from "./types";
import {setPostLoading} from "./postActions";

//get all groups
export const getGroups = () => dispatch => {
    axios.get("/api/groups/")
        .then(res =>
            dispatch({
                type: GET_GROUPS,
                payload: res.data
            })
        ).catch(err =>
        dispatch({
            type: GET_GROUPS,
            payload: null
        })
    );
};

//create group
export const createGroup = (groupDate, history) => dispatch => {
    console.log(groupDate);
    axios.post("/api/groups", groupDate)
        .then(res => history.push("/groups"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        )
};
//get my groups
export const getMyGroups = id => dispatch => {
    axios.get(`/api/groups/${id}`)
        .then(res => dispatch({
                type: GET_GROUPS,
                payload: res.data
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data.errors
        })
    )
};

//get group by id
export const geGroup = id => dispatch => {
    console.log(id);
    axios.get(`/api/groups/group/${id}`)
        .then(res => dispatch({
                type: GET_GROUP,
                payload: res.data
            })
        ).catch(err =>
        dispatch({
            type: GET_GROUP,
            payload: null
        })
    )
};

//delete a group
export const deleteGroup = id => dispatch => {
    console.log(id);
    axios.delete(`/api/groups/${id}`)
        .then(res => dispatch(getGroups())
        ).catch(err =>
        dispatch(getGroups())
    )
};


// Get Group Posts
export const getGroupPosts = id => dispatch => {
    dispatch(setPostLoading());
    axios.get(`/api/groups/post/${id}`)
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

//send request to join a group
export const askToJoinGroup = (id,uid) => dispatch => {
    console.log(id);
    console.log(uid);
    axios.post(`/api/groups/askjoin/${id}/${uid}`)
        .then(res => dispatch(getGroups()))
        .catch(err => dispatch(getGroups()))
};

//cancel request to join a group
export const cancelToJoinGroup = (id,uid) => dispatch => {
    console.log(id);
    console.log(uid);
    axios.post(`/api/groups/cancel/${id}/${uid}`)
        .then(res => dispatch(getGroups()))
        .catch(err => dispatch(getGroups()))
};

