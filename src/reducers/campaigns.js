import * as actions from '../actions/campaigns';

const defaultState = {
  list: [],
  loading: false,
  currentCampaign: null,
  error: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case actions.GET_CAMPAIGNS:
    case actions.FETCH_CAMPAIGN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.FETCH_CAMPAIGN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actions.SET_CAMPAIGNS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };

    case actions.SET_CAMPAIGN:
      return {
        ...state,
        currentCampaign: action.payload,
        loading: false,
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

    case actions.REMOVE_CAMPAIGN:
      return {
        ...state,
        loading: true,
      };

    case actions.REMOVE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
        loading: false,
      };

    case actions.REMOVE_CAMPAIGN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
