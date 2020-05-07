import axios from 'axios';
import {
  POST_LOADING,
  GET_POST,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  STATUS_POST,
  GET_POST_USER,
  GET_ERRORS,
  UN_POST_LOAD,
  CLEAR_ERRORS,
} from './types';

// add post
export const addPost = postData => async dispatch => {
  try {
    dispatch(clearErrors());
    dispatch(setPostLoading());
    const post = await axios.post('/api/posts/', postData);
    // console.log([post.data.data]);
    dispatch({
      type: ADD_POST,
      payload: post.data.data,
    });
  } catch (err) {
    console.log(err);
    dispatch(setUnloading());
  }
};

// get post
export const getPostAll = () => async dispatch => {
  try {
    dispatch(setPostLoading());
    const post = await axios.get(`/api/posts/`);
    // console.log(post.data.data);
    dispatch({
      type: GET_POSTS,
      payload: post.data.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_POSTS,
      payload: null,
    });
  }
};

// get post by id
export const getPostId = postid => async dispatch => {
  try {
    dispatch(setPostLoading());
    const post = await axios.get(`/api/posts/${postid}`);
    dispatch({
      type: GET_POST,
      payload: post.data,
    });
  } catch (err) {
    dispatch({
      type: GET_POST,
      payload: null,
    });
  }
};

//  get post of user
export const getPostUser = userid => async dispatch => {
  try {
    dispatch(setPostLoading());
    const post = await axios.get(`/api/posts/user/${userid}`);
    dispatch({
      type: GET_POST_USER,
      payload: post.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_POST_USER,
      payload: null,
    });
  }
};

// status post
export const statusPost = (postid, statusData) => async dispatch => {
  try {
    dispatch(clearErrors());
    dispatch(setPostLoading());
    const post = await axios.put(`/api/posts/${postid}`, statusData);
    dispatch({type: STATUS_POST});
  } catch (err) {
    const error = err.response.data;
    dispatch(setUnloading());
    dispatch(setErrors(error));
  }
};

// delete
export const deletePost = postid => async dispatch => {
  try {
    dispatch(setPostLoading());
    const post = await axios.delete(`/api/posts/${postid}`);
    console.log(post);
    dispatch({type: DELETE_POST});
  } catch (err) {
    const error = err.response.data;
    dispatch(setUnloading());
    dispatch(setErrors(error));
  }
};

// loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};

// close loading
export const setUnloading = () => {
  return {
    type: UN_POST_LOAD,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

// set Errors
export const setErrors = error => {
  return {
    type: GET_ERRORS,
    payload: error,
  };
};
