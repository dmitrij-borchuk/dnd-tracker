import * as actions from '../actions/scenes';

const defaultState = {
  list: [],
  loading: false,
  currentScene: null,
  error: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case actions.SET_SCENES:
      return {
        ...state,
        list: action.payload,
      };

    case actions.SET_SCENE:
      return {
        ...state,
        loading: false,
        currentScene: action.payload,
      };

    case actions.RESET_SCENE:
      return {
        ...state,
        currentScene: null,
      };

    case actions.RESET_SCENE_LIST:
      return {
        ...state,
        list: [],
      };

    case actions.SAVE_SCENE:
      return {
        ...state,
        loading: true,
      };

    case actions.SAVE_SCENE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case actions.SAVE_SCENE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actions.REMOVE_SCENE:
      return {
        ...state,
        loading: true,
      };

    case actions.REMOVE_SCENE_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
        loading: false,
      };

    case actions.REMOVE_SCENE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actions.FETCH_SCENE:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
