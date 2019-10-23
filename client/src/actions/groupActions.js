import axios from 'axios'
import {GET_GROUP, GET_GROUPS, ADD_GROUP, GET_ERRORS} from "./types";

//get all groups
export const getGroups = () => dispatch => {
    axios.get("/api/group/")
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
    axios.post("/api/group", groupDate)
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
    axios.get(`/api/group/${id}`)
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
    axios.get(`/api/group/group/${id}`)
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
    axios.delete(`/api/group/${id}`)
        .then(res => dispatch(getGroups())
        ).catch(err =>
        dispatch(getGroups())
    )
};




