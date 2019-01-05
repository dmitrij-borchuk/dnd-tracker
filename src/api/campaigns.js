import {
  getList,
  getItem,
  saveItem,
} from './utils';

export const getCampaigns = userId => getList(`users/${userId}/campaigns`);
export const getCampaign = (userId, id) => getItem(`users/${userId}/campaigns`, id);
export const saveCampaign = (userId, data) => saveItem(`users/${userId}/campaigns`, data);
