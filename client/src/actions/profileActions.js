import axios from 'axios'
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    GET_ERRORS,
    CLEAR_CURRENT_PROFILE,
    SET_CURRENT_USER,
} from "./types";

//get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get("/api/profile")
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        ).catch(err =>
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    );
};

//get all profile
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get("/api/profile/all")
        .then(res =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        ).catch(err =>
        dispatch({
            type: GET_PROFILES,
            payload: null
        })
    );
};

//get suggestion profiles
export const getSuggestionProfiles = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get("/api/profile/suggestions")
        .then(res =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        ).catch(err =>
        dispatch({
            type: GET_PROFILES,
            payload: null
        })
    );
};
//get profile By handle
export const getProfileByHandel = handle => dispatch => {
    dispatch(setProfileLoading())
    axios.get(`/api/profile/handle/${handle}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        ).catch(err =>
        dispatch({
            type: GET_PROFILE,
            payload: null
        })
    );
};

//create profile
export const createProfile = (profileDate, history) => dispatch => {
    axios.post("/api/profile", profileDate)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        )
};

//Delete my account
export const deleteAccount = () => dispatch => {
    if (window.confirm("Are You Shure To Delete Your Account")) {
        axios.delete("/api/profile")
            .then(res =>
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        )
    }
};

//profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//clear current profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
};


//Add Experience
export const addExperience = (profileDate, history) => dispatch => {
    axios.post("/api/profile/experience", profileDate)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        )
};
//Delete Experience
export const deleteExperience = exp_id => dispatch => {
    if (window.confirm("Are You Shure To Delete this experience")) {
        axios.delete(`/api/profile/experience/${exp_id}`)
            .then(res =>
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
            ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        )
    }
};

//Add Experience
export const addEducation = (profileDate, history) => dispatch => {
    axios.post("/api/profile/education", profileDate)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        )
};

//Delete Education
export const deleteEducation = edu_id => dispatch => {
    if (window.confirm("Are You Shure To Delete this education")) {
        axios.delete(`/api/profile/education/${edu_id}`)
            .then(res =>
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
            ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        )
    }
};

