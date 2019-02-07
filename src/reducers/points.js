import * as actions from '../actions/points';
import { arrayToMap } from './utils';

const defaultState = {};

export default function (state = defaultState, action) {
  switch (action.type) {
    case actions.SET_POINTS:
      return arrayToMap(action.payload);

    case actions.SAVE_POINT_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };

    default:
      return state;
  }
}
