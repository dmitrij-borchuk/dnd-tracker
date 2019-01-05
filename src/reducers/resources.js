import * as actions from '../actions/resources';

const defaultState = {
  list: [],
  loading: false,
  current: null,
  error: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case actions.SET_RESOURCES:
      return {
        ...state,
        list: action.payload,
      };

    case actions.SAVE_RESOURCE_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    // case actions.SET_CAMPAIGN_ERROR:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };

    // case actions.RESET_CAMPAIGN:
    //   return {
    //     ...state,
    //     currentCampaign: null,
    //   };

    default:
      return state;
  }
}
