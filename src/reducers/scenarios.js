import {
  SET_SCENARIOS,
  SET_SCENARIO,
  RESET_SCENARIO,
  RESET_SCENARIO_LIST,
} from '../actions/scenarios';

const defaultState = {
  list: [],
  loading: false,
  currentScenario: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_SCENARIOS:
      return {
        ...state,
        list: action.payload,
      };

    case SET_SCENARIO:
      return {
        ...state,
        currentScenario: action.payload,
      };

    case RESET_SCENARIO:
      return {
        ...state,
        currentScenario: null,
      };

    case RESET_SCENARIO_LIST:
      return {
        ...state,
        list: [],
      };

    default:
      return state;
  }
}
