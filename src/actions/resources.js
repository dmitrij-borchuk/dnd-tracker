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

export const GET_RESOURCES = 'GET_RESOURCES';
export const getResources = () => ({
  type: GET_RESOURCES,
});

export const SET_RESOURCES = 'SET_RESOURCES';
export const setResources = data => ({
  type: SET_RESOURCES,
  payload: data,
});

export const GET_RESOURCE = 'GET_RESOURCE';
export const getResource = data => ({
  type: GET_RESOURCE,
  payload: data,
});

export const SET_RESOURCE = 'SET_RESOURCE';
export const setResource = data => ({
  type: SET_RESOURCE,
  payload: data,
});

export const RESET_RESOURCE = 'RESET_RESOURCE';
export const resetResource = data => ({
  type: RESET_RESOURCE,
  payload: data,
});
