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
