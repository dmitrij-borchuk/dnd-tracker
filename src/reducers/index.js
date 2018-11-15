import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import app from './app';
import scenarios from './scenarios';

export default combineReducers({
  app,
  scenarios,
  // form: formReducer,
});
