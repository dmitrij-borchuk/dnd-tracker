import { SET_USER } from '../actions/auth';

const defaultState = {
  currentUser: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
