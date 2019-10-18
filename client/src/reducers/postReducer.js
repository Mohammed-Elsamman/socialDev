import isEmpty from '../validation/is-empty';

import {ADD_POST, GET_POST, GET_POSTS, POST_LOADING,DELETE_POST ,SET_CURRENT_USER} from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case DELETE_POST:
          return {
                ...state,
                posts: state.posts.filter(post=>post._id !== action.payload.id),
                loading: false
            };
        default:
            return state;
    }
}
