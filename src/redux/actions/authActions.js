import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {AsyncStorage} from 'react-native';
import {SET_CURRENT_USER, SET_LOADING, UN_LOADING, GET_ERRORS} from './types';
import setAuthToken from '../../utils/setAuthToken';
// signup
export const signupUser = userData => async dispatch => {
  dispatch(setUserLoading());
  try {
    const user = await axios.post(`/api/auth/signup`, userData);
    dispatch(setUnloading());
  } catch (err) {
    console.log(err);
  }
};

// signin
export const signinUser = userData => async dispatch => {
  dispatch(setUserLoading());
  try {
    const res = await axios.post(`/api/auth/signin`, userData);
    const {token} = res.data;
    await AsyncStorage.getItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    console.error(err);
  }
};

// signout
export const signoutUser = () => async dispatch => {
  await AsyncStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

// loading
const setUserLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// close loading
const setUnloading = () => {
  return {
    type: UN_LOADING,
  };
};

// set current user
const setCurrentUser = decode => {
  return {
    type: SET_CURRENT_USER,
    payload: decode,
  };
};
