import * as scenariosActions from '../actions/scenarios';

const defaultState = {
  list: [],
  loading: false,
  currentScenario: null,
  error: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case scenariosActions.SET_SCENARIOS:
      return {
        ...state,
        list: action.payload,
      };

    case scenariosActions.SET_SCENARIO:
      return {
        ...state,
        currentScenario: action.payload,
      };

    case scenariosActions.RESET_SCENARIO:
      return {
        ...state,
        currentScenario: null,
      };

    case scenariosActions.RESET_SCENARIO_LIST:
      return {
        ...state,
        list: [],
      };

    case scenariosActions.SAVE_SCENARIO_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
