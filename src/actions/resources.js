// export const FETCH_SCENE = 'FETCH_SCENE';
// export const fetchScene = data => ({
//   type: FETCH_SCENE,
//   payload: data,
// });

// export const SET_SCENE = 'SET_SCENE';
// export const setScene = data => ({
//   type: SET_SCENE,
//   payload: data,
// });

// export const RESET_SCENE = 'RESET_SCENE';
// export const resetScene = () => ({
//   type: RESET_SCENE,
// });

// export const RESET_SCENE_LIST = 'RESET_SCENE_LIST';
// export const resetSceneList = () => ({
//   type: RESET_SCENE_LIST,
// });

// export const GET_SCENES = 'GET_SCENES';
// export const getScenes = scenarioId => ({
//   type: GET_SCENES,
//   payload: scenarioId,
// });

// export const SET_SCENES = 'SET_SCENES';
// export const setScenes = data => ({
//   type: SET_SCENES,
//   payload: data,
// });

export const SAVE_RESOURCE = 'SAVE_RESOURCE';
export const saveResource = data => ({
  type: SAVE_RESOURCE,
  payload: data,
});

export const SAVE_RESOURCE_FAILED = 'SAVE_RESOURCE_FAILED';
export const saveResourceFailed = data => ({
  type: SAVE_RESOURCE_FAILED,
  payload: data,
});
