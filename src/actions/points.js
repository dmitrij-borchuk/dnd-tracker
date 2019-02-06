export const GET_POINTS = 'GET_POINTS';
export const getPoints = linkedId => ({
  type: GET_POINTS,
  payload: linkedId,
});

export const SET_POINTS = 'SET_POINTS';
export const setPoints = data => ({
  type: SET_POINTS,
  payload: data,
});

export const SAVE_POINTS = 'SAVE_POINTS';
export const savePoints = data => ({
  type: SAVE_POINTS,
  payload: data,
});

export const SAVE_POINTS_FAILED = 'SAVE_POINTS_FAILED';
export const savePointsFailed = data => ({
  type: SAVE_POINTS_FAILED,
  payload: data,
});

export const SAVE_POINT = 'SAVE_POINT';
export const savePoint = data => ({
  type: SAVE_POINT,
  payload: data,
});

export const SAVE_POINT_SUCCESS = 'SAVE_POINT_SUCCESS';
export const savePointSuccess = data => ({
  type: SAVE_POINT_SUCCESS,
  payload: data,
});

export const SAVE_POINT_FAILED = 'SAVE_POINT_FAILED';
export const savePointFailed = data => ({
  type: SAVE_POINT_FAILED,
  payload: data,
});
