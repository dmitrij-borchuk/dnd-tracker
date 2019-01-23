import * as actions from '../actions/resources';

const defaultState = {
  list: [],
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
        list: action.payload,
        loading: false,
      };

    case actions.SAVE_RESOURCE_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    // Linked resources
    case actions.GET_LINKED_RESOURCES:
      return {
        ...state,
        loading: true,
      };

    case actions.GET_LINKED_RESOURCES_SUCCESS:
      return {
        ...state,
        loading: false,
        linkedResources: action.payload,
      };

    case actions.GET_LINKED_RESOURCES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actions.RESET_LINKED_RESOURCES_LIST:
      return {
        ...state,
        linkedResources: [],
      };

    default:
      return state;
  }
}
