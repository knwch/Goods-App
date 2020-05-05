import {
  POST_LOADING,
  GET_POST,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  STATUS_POST,
  GET_POST_USER,
  UN_POST_LOAD,
} from '../actions/types';

const initialState = {
  post: {},
  posts: [],
  postUser: [],
  loading: false,
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
      };
    case STATUS_POST:
      return {
        ...state,
        success: !state.success,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        postUser: [action.payload, ...state.postUser],
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case GET_POST_USER:
      return {
        ...state,
        postUser: action.payload,
        loading: false,
      };
    case UN_POST_LOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
