import {
  getList,
  getItem,
} from './utils';

export const getCampaigns = () => getList('campaign');

export const getCampaign = id => getItem('campaign', id);
