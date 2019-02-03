import * as actions from '../actions/resources';
import { arrayToMap } from './utils';

const defaultState = {
  list: {},
  loading: false,
  current: null,
  error: null,
  linkedResources: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    // Resources
    case actions.GET_RESOURCES:
      return {
        ...state,
        loading: true,
      };

    case actions.SET_RESOURCES:
      return {
        ...state,
        list: arrayToMap(action.payload),
      };

    case actions.SAVE_RESOURCE_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    // Resource
    case actions.GET_RESOURCE:
      return {
        loading: true,
      };

    case actions.SET_RESOURCE:
      return {
        loading: false,
        current: action.payload,
      };

    case actions.RESET_RESOURCE:
      return {
        current: null,
      };

    default:
      return state;
  }
}
