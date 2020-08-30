import * as actions from '../actions/linkedResources';

const defaultState = {
  list: {}
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case actions.SET_LINKED_RESOURCES:
      return {
        ...state,
        list: action.payload.reduce((acc, item) => ({
          ...acc,
          [item.id]: item,
        }), {})
      }

    // case actions.GET_LINKED_RESOURCES:
    //   return {
    //     ...state,
    //     loading: true,
    //   };

    // case actions.GET_LINKED_RESOURCES_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     linkedResources: action.payload,
    //   };

    case actions.GET_LINKED_RESOURCE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actions.RESET_LINKED_RESOURCES_LIST:
      return defaultState;

    default:
      return state;
  }
}
