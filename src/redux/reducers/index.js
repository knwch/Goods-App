import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorsRedever from './errorsReducer';
export default combineReducers({
  auth: authReducer,
  errors: errorsRedever,
});
