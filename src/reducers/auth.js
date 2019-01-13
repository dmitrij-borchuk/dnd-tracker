import * as actions from '../actions/auth';

const defaultState = {
  currentUser: null,
  error: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case actions.SIGN_IN_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
