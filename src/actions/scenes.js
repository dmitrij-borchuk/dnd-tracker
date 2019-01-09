export const FETCH_SCENE = 'FETCH_SCENE';
export const fetchScene = data => ({
  type: FETCH_SCENE,
  payload: data,
});

export const SET_SCENE = 'SET_SCENE';
export const setScene = data => ({
  type: SET_SCENE,
  payload: data,
});

export const RESET_SCENE = 'RESET_SCENE';
export const resetScene = () => ({
  type: RESET_SCENE,
});

export const RESET_SCENE_LIST = 'RESET_SCENE_LIST';
export const resetSceneList = () => ({
  type: RESET_SCENE_LIST,
});

export const GET_SCENES = 'GET_SCENES';
export const getScenes = scenarioId => ({
  type: GET_SCENES,
  payload: scenarioId,
});

export const SET_SCENES = 'SET_SCENES';
export const setScenes = data => ({
  type: SET_SCENES,
  payload: data,
});

export const SAVE_SCENE = 'SAVE_SCENE';
export const saveScene = data => ({
  type: SAVE_SCENE,
  payload: data,
});

export const SAVE_SCENE_FAILED = 'SAVE_SCENE_FAILED';
export const saveSceneFailed = data => ({
  type: SAVE_SCENE_FAILED,
  payload: data,
});

export const SAVE_SCENE_SUCCESS = 'SAVE_SCENE_SUCCESS';
export const saveSceneSuccess = data => ({
  type: SAVE_SCENE_SUCCESS,
  payload: data,
});
