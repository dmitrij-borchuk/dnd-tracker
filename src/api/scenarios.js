import {
  getList,
  getItem,
  saveItem,
} from './utils';

export const getScenarios = userId => getList(`users/${userId}/scenarios`);
export const getScenario = (userId, id) => getItem(`users/${userId}/scenarios`, id);
export const saveScenario = (userId, data) => saveItem(`users/${userId}/scenarios`, data);
