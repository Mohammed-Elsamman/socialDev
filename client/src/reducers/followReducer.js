import {GET_FOLLOWING, GET_FOLLOWERS} from '../actions/types';

const initialState = {
    followers: [],
    following: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FOLLOWING:
            return {
                ...state,
                following: action.payload,
                loading: false
            };
        case GET_FOLLOWERS:
            return {
                ...state,
                followers: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
