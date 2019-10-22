import axios from 'axios'
import {GET_GROUP, GET_GROUPS, ADD_GROUP,GET_ERRORS} from "./types";

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

//create profile
export const createGroup = (groupDate, history) => dispatch => {
    console.log(groupDate);
    axios.post("/api/group", groupDate)
        .then(res => history.push("/group"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        )
};




