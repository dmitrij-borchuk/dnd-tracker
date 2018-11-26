export const FETCH_CAMPAIGN = 'FETCH_CAMPAIGN';
export const fetchCampaign = data => ({
  type: FETCH_CAMPAIGN,
  payload: data,
});

export const SET_CAMPAIGN = 'SET_CAMPAIGN';
export const setCampaign = data => ({
  type: SET_CAMPAIGN,
  payload: data,
});

export const RESET_CAMPAIGN = 'RESET_CAMPAIGN';
export const resetCampaign = () => ({
  type: RESET_CAMPAIGN,
});

export const GET_CAMPAIGNS = 'GET_CAMPAIGNS';
export const getCampaigns = () => ({
  type: GET_CAMPAIGNS,
});

export const SET_CAMPAIGNS = 'SET_CAMPAIGNS';
export const setCampaigns = data => ({
  type: SET_CAMPAIGNS,
  payload: data,
});

export const SAVE_CAMPAIGN = 'SAVE_CAMPAIGN';
export const saveCampaign = data => ({
  type: SAVE_CAMPAIGN,
  payload: data,
});

export const SAVE_CAMPAIGN_FAILED = 'SAVE_CAMPAIGN_FAILED';
export const saveCampaignFailed = data => ({
  type: SAVE_CAMPAIGN_FAILED,
  payload: data,
});
