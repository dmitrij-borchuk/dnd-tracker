import { combineReducers } from 'redux';
import common from './common';
import scenarios from './scenarios';
import campaigns from './campaigns';
import scenes from './scenes';
import auth from './auth';

export default combineReducers({
  common,
  scenarios,
  campaigns,
  scenes,
  auth,
});
