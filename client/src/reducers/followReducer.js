import {GET_FOLLOWING, GET_FOLLOWERS} from '../actions/types';

const initialState = {
    followers: [],
    following: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FOLLOWING:
            console.log(action.payload.follwoing);
            return {
                ...state,
                following: action.payload.follwoing,
                loading: false
            };
        case GET_FOLLOWERS:
            console.log(action.payload);
            return {
                ...state,
                followers: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
