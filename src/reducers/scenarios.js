import * as actions from '../actions/scenarios';

const defaultState = {
  list: [],
  loading: false,
  currentScenario: null,
  error: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case actions.GET_SCENARIOS:
      return {
        ...state,
        loading: true,
      };

    case actions.SET_SCENARIOS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };

    case actions.SET_SCENARIO:
      return {
        ...state,
        currentScenario: action.payload,
      };

    case actions.RESET_SCENARIO:
      return {
        ...state,
        currentScenario: null,
      };

    case actions.RESET_SCENARIO_LIST:
      return {
        ...state,
        list: [],
      };

    case actions.SAVE_SCENARIO_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case actions.REMOVE_SCENARIO:
      return {
        ...state,
        loading: true,
      };

    case actions.REMOVE_SCENARIO_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
        loading: false,
      };

    case actions.REMOVE_SCENARIO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
