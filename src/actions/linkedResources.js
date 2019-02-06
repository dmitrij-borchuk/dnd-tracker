export const GET_LINKED_RESOURCES = 'GET_LINKED_RESOURCES';
export const getLinkedResources = data => ({
  type: GET_LINKED_RESOURCES,
  payload: data,
});

export const GET_LINKED_RESOURCE = 'GET_LINKED_RESOURCE';
export const getLinkedResource = data => ({
  type: GET_LINKED_RESOURCE,
  payload: data,
});

export const GET_LINKED_RESOURCE_FAILED = 'GET_LINKED_RESOURCE_FAILED';
export const getLinkedResourceFailed = data => ({
  type: GET_LINKED_RESOURCE_FAILED,
  payload: data,
});

export const SET_LINKED_RESOURCES = 'SET_LINKED_RESOURCES';
export const setLinkedResources = data => ({
  type: SET_LINKED_RESOURCES,
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
