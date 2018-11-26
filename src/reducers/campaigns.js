import {
  SET_CAMPAIGNS,
  // SET_SCENARIOS,
  SET_CAMPAIGN,
  // RESET_SCENARIO,
} from '../actions/campaigns';

const defaultState = {
  list: [],
  loading: false,
  currentCampaign: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_CAMPAIGNS:
      return {
        ...state,
        list: action.payload,
      };

    // case SET_SCENARIOS:
    //   return {
    //     ...state,
    //     list: action.payload,
    //   };

    case SET_CAMPAIGN:
      return {
        ...state,
        currentCampaign: action.payload,
      };

    // case RESET_SCENARIO:
    //   return {
    //     ...state,
    //     currentScenario: null,
    //   };

    default:
      return state;
  }
}
