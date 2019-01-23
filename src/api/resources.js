import {
  getList,
  getItem,
  saveItem,
} from './utils';

export const getResources = userId => getList(`users/${userId}/resources`);
export const getResource = (userId, id) => getItem(`users/${userId}/resources`, id);
export const saveResource = (userId, data) => saveItem(`users/${userId}/resources`, data);

export const getLinkedResources = (userId, linkedTo) => getList(
  `users/${userId}/linkedResources`,
  req => req.where('linkedTo', '==', linkedTo),
);
export const saveLinkedResources = (userId, data) => saveItem(`users/${userId}/linkedResources`, data);
