import axios from 'axios'
import {GET_GROUP, GET_GROUPS, ADD_GROUP, GET_ERRORS, GET_POSTS} from "./types";
import {setPostLoading} from "./postActions";

//get all groups
export const getGroups = () => dispatch => {
    console.log(1111);
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
export const getMyGroups = uid => dispatch => {
    axios.get(`/api/groups/${uid}`)
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
    if (window.confirm("Are You Shure To Delete this group")) {
        axios.delete(`/api/groups/${id}`)
            .then(res => dispatch(getGroups())
            ).catch(err =>
            dispatch(getGroups())
        )
    }
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
export const askToJoinGroup = (id, uid, getgroup) => dispatch => {
    axios.post(`/api/groups/askjoin/${id}/${uid}`)
        .then(res => {
            if (getgroup) {
                console.log(getgroup);
                return dispatch(geGroup(id))
            } else {
                return dispatch(getGroups())

            }
        })
        .catch(err => dispatch(getGroups()))
};

//cancel request to join a group
export const cancelToJoinGroup = (id, uid, getgroup) => dispatch => {
    axios.post(`/api/groups/cancel/${id}/${uid}`)
        .then(res => {
            if (getgroup) {
                console.log(getgroup);
                return dispatch(geGroup(id))
            } else {
                return dispatch(getGroups())

            }
        })
        .catch(err => dispatch(getGroups()))
};


//get group members
export const geGroupMembers = id => dispatch => {
    axios.get(`/api/groups/${id}/members`)
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

//get group members
export const geGroupManagers = id => dispatch => {
    axios.get(`/api/groups/${id}/managers`)
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

//get group requests
export const geGroupRequests = id => dispatch => {
    axios.get(`/api/groups/${id}/requests`)
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