import * as actions from '../actions/campaigns';

const defaultState = {
  list: [],
  loading: false,
  currentCampaign: null,
  error: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case actions.SET_CAMPAIGNS:
      return {
        ...state,
        list: action.payload,
      };

    case actions.SET_CAMPAIGN:
      return {
        ...state,
        currentCampaign: action.payload,
      };

    case actions.SET_CAMPAIGN_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case actions.RESET_CAMPAIGN:
      return {
        ...state,
        currentCampaign: null,
      };

    default:
      return state;
  }
}
