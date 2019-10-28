import axios from 'axios'
import {
    GET_FOLLOWERS,
    GET_FOLLOWING,
} from "./types";
import {getProfileByHandel, getProfiles} from "./profileActions";

// Get Following
export const getFollowing = (id) => dispatch => {
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
export const followingUser = (Id, followId, history, profileHandle) => dispatch => {
    console.log(profileHandle);
    axios.post(`/api/user/follow/${Id}/${followId}`)
        .then(res => {
                if (profileHandle) {
                    console.log(1);
                     history.push(`/profile/`)
                    return history.push(`/profile/${profileHandle}`)
                } else {
                    return dispatch(getProfiles())
                }
            }
        ).catch(err => {
            if (profileHandle) {
                console.log(1);
                 history.push(`/profile/`)
                return history.push(`/profile/${profileHandle}`)
            } else {
                return dispatch(getProfiles())
            }
        }
    );
};

//unfollowing user
export const unFollowingUser = (Id, followId, history, profileHandle) => dispatch => {
    console.log(profileHandle);
    axios.post(`/api/user/unfollow/${Id}/${followId}`)
        .then(res => {
                if (profileHandle) {
                    console.log(1);
                     history.push(`/profile/`)
                    return history.push(`/profile/${profileHandle}`)
                } else {
                    return dispatch(getProfiles())
                }
            }
        ).catch(err => {
            if (profileHandle) {
                console.log(1);
                 history.push(`/profile/`)
                return history.push(`/profile/${profileHandle}`)
            } else {
                return dispatch(getProfiles())
            }
        }
    );
};

//unfollowing user
export const unFollowingUserPage = (Id, followId) => dispatch => {
    axios.post(`/api/user/unfollow/${Id}/${followId}`)
        .then(res =>
            dispatch(getFollowing(Id))
        ).catch(err =>
        dispatch(getFollowing(Id))
    );
};