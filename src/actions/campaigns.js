export const FETCH_CAMPAIGN = 'FETCH_CAMPAIGN';
export const fetchCampaign = data => ({
  type: FETCH_CAMPAIGN,
  payload: data,
});
export const FETCH_CAMPAIGN_ERROR = 'FETCH_CAMPAIGN_ERROR';
export const fetchCampaignError = data => ({
  type: FETCH_CAMPAIGN_ERROR,
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

export const SET_CAMPAIGN_ERROR = 'SET_CAMPAIGN_ERROR';
export const setCampaignError = error => ({
  type: SET_CAMPAIGN_ERROR,
  error: true,
  payload: error,
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

export const REMOVE_CAMPAIGN = 'REMOVE_CAMPAIGN';
export const removeCampaign = data => ({
  type: REMOVE_CAMPAIGN,
  payload: data,
});

export const REMOVE_CAMPAIGN_FAILED = 'REMOVE_CAMPAIGN_FAILED';
export const removeCampaignFailed = data => ({
  type: REMOVE_CAMPAIGN_FAILED,
  payload: data,
});

export const REMOVE_CAMPAIGN_SUCCESS = 'REMOVE_CAMPAIGN_SUCCESS';
export const removeCampaignSuccess = data => ({
  type: REMOVE_CAMPAIGN_SUCCESS,
  payload: data,
});
