import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import app from './app';
import scenarios from './scenarios';
import campaigns from './campaigns';

export default combineReducers({
  app,
  scenarios,
  campaigns,
  // form: formReducer,
});
