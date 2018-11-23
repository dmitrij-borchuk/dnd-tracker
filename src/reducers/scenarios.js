import {
  GET_SCENARIOS,
  SET_SCENARIOS,
} from '../actions/scenarios';

const defaultState = {
  list: [],
  loading: false,
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

    default:
      return state;
  }
}
