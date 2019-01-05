import {
  getList,
  getItem,
  saveItem,
} from './utils';

export const getResources = userId => getList(`users/${userId}/resources`);
export const getResource = (userId, id) => getItem(`users/${userId}/resources`, id);
export const saveResource = (userId, data) => saveItem(`users/${userId}/resources`, data);
