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

// Resource
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

// Linked resources
export const GET_LINKED_RESOURCES = 'GET_LINKED_RESOURCES';
export const getLinkedResources = data => ({
  type: GET_LINKED_RESOURCES,
  payload: data,
});

export const GET_LINKED_RESOURCES_SUCCESS = 'GET_LINKED_RESOURCES_SUCCESS';
export const getLinkedResourcesSuccess = data => ({
  type: GET_LINKED_RESOURCES_SUCCESS,
  payload: data,
});

export const GET_LINKED_RESOURCES_FAILED = 'GET_LINKED_RESOURCES_FAILED';
export const getLinkedResourcesFailed = data => ({
  type: GET_LINKED_RESOURCES_FAILED,
  payload: data,
});

export const RESET_LINKED_RESOURCES_LIST = 'RESET_LINKED_RESOURCES_LIST';
export const resetLinkedResourcesList = () => ({
  type: RESET_LINKED_RESOURCES_LIST,
});

export const SAVE_LINKED_RESOURCE = 'SAVE_LINKED_RESOURCE';
export const saveLinkedResource = data => ({
  type: SAVE_LINKED_RESOURCE,
  payload: data,
});
