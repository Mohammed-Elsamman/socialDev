import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from "../actions/types";

const initialState = {
    profile: null,
    profiles: null,
    loading: false
};

export default function (state = initialState, action) {
    console.log(action.payload);
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                loading: true
            };
        case PROFILE_LOADING:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null,
            };
        default:
            return state;
    }

}