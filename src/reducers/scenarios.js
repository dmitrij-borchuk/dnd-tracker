import { GET_SCENARIOS } from '../actions';

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
    default:
      return state;
  }
}
