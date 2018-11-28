import {
  SET_SCENES,
  SET_SCENE,
  RESET_SCENE,
  RESET_SCENE_LIST,
} from '../actions/scenes';

const defaultState = {
  list: [],
  loading: false,
  currentScene: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_SCENES:
      return {
        ...state,
        list: action.payload,
      };

    case SET_SCENE:
      return {
        ...state,
        currentScene: action.payload,
      };

    case RESET_SCENE:
      return {
        ...state,
        currentScene: null,
      };

    case RESET_SCENE_LIST:
      return {
        ...state,
        list: [],
      };

    default:
      return state;
  }
}
