import { combineReducers } from 'redux'
import common from './common'
import scenarios from './scenarios'
import campaigns from './campaigns'
import scenes from './scenes'
import auth from './auth'
import resources from './resources'
import linkedResources from './linkedResources'
import points from './points'
import linkedResourcesPage from './linkedResourcesPage'
import containers from './containers'

export default combineReducers({
  common,
  scenarios,
  campaigns,
  scenes,
  auth,
  resources,
  linkedResources,
  points,
  linkedResourcesPage,
  containers,
})
