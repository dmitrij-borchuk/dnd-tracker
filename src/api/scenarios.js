import {
  getList,
  getItem,
  saveItem,
  removeItem,
} from './utils';

export const getScenarios = (userId, campaignId) => getList(
  `users/${userId}/scenarios`,
  req => req.where('campaignId', '==', campaignId),
);
export const getScenario = (userId, id) => getItem(`users/${userId}/scenarios`, id);
export const saveScenario = (userId, data) => saveItem(`users/${userId}/scenarios`, data);
export const removeScenario = (userId, id) => removeItem(`users/${userId}/scenarios`, id);
