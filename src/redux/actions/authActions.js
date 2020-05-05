import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as Keychain from 'react-native-keychain';
import {
  SET_CURRENT_USER,
  SET_LOADING,
  UN_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_SUCCESS,
} from './types';
import setAuthToken from '../../utils/setAuthToken';
// signup
export const signupUser = userData => async dispatch => {
  try {
    dispatch(setUserLoading());
    const user = await axios.post(`/api/auth/signup`, userData);
    console.log(user.data);
    dispatch(setSuccess());
    dispatch(clearError());
  } catch (err) {
    const error = err.response.data;
    dispatch(setUnloading());
    dispatch(setError(error));
  }
};

// signin
export const signinUser = userData => async dispatch => {
  try {
    dispatch(clearError());
    dispatch(setUserLoading());
    const res = await axios.post(`/api/auth/signin`, userData);
    const {token} = res.data;
    await Keychain.setGenericPassword('jwtToken', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    dispatch(clearError());
  } catch (err) {
    const error = err.response.data;
    dispatch(setUnloading());
    dispatch(setError(error));
  }
};

// signout
export const signoutUser = () => async dispatch => {
  await Keychain.resetGenericPassword();
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

// loading
export const setUserLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// close loading
export const setUnloading = () => {
  return {
    type: UN_LOADING,
  };
};

// set current user
export const setCurrentUser = decode => {
  return {
    type: SET_CURRENT_USER,
    payload: decode,
  };
};

// set success signup
export const setSuccess = () => {
  return {
    type: SET_SUCCESS,
  };
};
// set error
export const setError = error => {
  return {
    type: GET_ERRORS,
    payload: error,
  };
};

// clear error
export const clearError = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
