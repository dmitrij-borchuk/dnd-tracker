import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import app from './app';
import scenarios from './scenarios';
import campaigns from './campaigns';
import scenes from './scenes';

export default combineReducers({
  app,
  scenarios,
  campaigns,
  scenes,
  // form: formReducer,
});
