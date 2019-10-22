import axios from 'axios'
import {
    GET_FOLLOWERS,
    GET_FOLLOWING,
} from "./types";
import {getProfiles} from "./profileActions";

// Get Following
export const getFollwoing = (id) => dispatch => {
    axios
        .get(`/api/user/following/${id}`)
        .then(res =>
            dispatch({
                type: GET_FOLLOWING,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_FOLLOWING,
                payload: null
            })
        );
};

// Get Followers
export const getFollowers = (id) => dispatch => {
    axios
        .get(`/api/user/followers/${id}`)
        .then(res =>
            dispatch({
                type: GET_FOLLOWERS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_FOLLOWERS,
                payload: null
            })
        );
};


//following user
export const followingUser = (Id, followId) => dispatch => {
    axios.post(`/api/user/follow/${Id}/${followId}`)
        .then(res =>
            dispatch(getProfiles())
        ).catch(err =>
        dispatch(getProfiles())
    );
};

//unfollowing user
export const unFollowingUser = (Id, followId) => dispatch => {
    axios.post(`/api/user/unfollow/${Id}/${followId}`)
        .then(res =>
            dispatch(getProfiles())
        ).catch(err =>
        dispatch(getProfiles())
    );
};

//unfollowing user
export const unFollowingUserPage = (Id, followId) => dispatch => {
    console.log(Id);
    console.log(followId);
    axios.post(`/api/user/unfollow/${Id}/${followId}`)
        .then(res =>
            dispatch(getFollwoing(Id))
        ).catch(err =>
        dispatch(getFollwoing(Id))
    );
};