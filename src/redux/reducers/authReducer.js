import {
  SET_CURRENT_USER,
  SET_LOADING,
  UN_LOADING,
  SET_SUCCESS,
} from '../actions/types';
import isEmpty from '../../utils/validator/isEmpty';
const initialState = {
  isAuthenticated: false,
  user: {},
  success: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      };
    case UN_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: !state.success,
        loading: false,
      };
    default:
      return state;
  }
};
