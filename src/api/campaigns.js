import {
  getList,
  getItem,
  addItem,
} from './utils';

export const getCampaigns = () => getList('campaign');
export const getCampaign = id => getItem('campaign', id);
export const saveCampaign = data => addItem('scenario', data);
