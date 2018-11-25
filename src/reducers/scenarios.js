import {
  GET_SCENARIOS,
  SET_SCENARIOS,
  SET_SCENARIO,
  RESET_SCENARIO,
} from '../actions/scenarios';

const defaultState = {
  list: [],
  loading: false,
  currentScenario: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_SCENARIOS:
      return {
        ...state,
        list: action.payload,
      };

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

    default:
      return state;
  }
}
