import {
  getList,
  getItem,
  saveItem,
} from './utils';

export const getCampaigns = () => getList('campaign');
export const getCampaign = id => getItem('campaign', id);
export const saveCampaign = data => saveItem('campaign', data);
