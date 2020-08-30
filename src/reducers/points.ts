import { PointsAction } from '../actions/points';
import { IPointsStore } from '../interfaces/pointsStore'
import { arrayToMap } from './utils';

const defaultState: IPointsStore = {
  list: {},
  loading: false,
};

export default function (state = defaultState, action: PointsAction) {
  switch (action.type) {
    case 'SET_POINTS':
      return {
        ...state,
        list: arrayToMap(action.payload),
      };

    case 'SAVE_POINT_SUCCESS':
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.id]: action.payload,
        }
      };

    default:
      return state;
  }
}
