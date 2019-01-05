import {
  getList,
  getItem,
  saveItem,
} from './utils';

export const getScenes = (userId, scenarioId) => getList(
  `users/${userId}/scenes`,
  req => req.where('scenarioId', '==', scenarioId),
);
export const getScene = (userId, id) => getItem(`users/${userId}/scenes`, id);
export const saveScene = (userId, data) => saveItem(`users/${userId}/scenes`, data);
