import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { ROUTES } from '../constants';
import { push } from '../utils/history';
import {
  GET_CAMPAIGNS,
  SAVE_CAMPAIGN,
  setCampaigns,
  // SAVE_SCENARIO,
  FETCH_CAMPAIGN,
  saveCampaignFailed,
  setCampaign,
  setCampaignError,
} from '../actions/campaigns';
import {
  getCampaigns,
  getCampaign,
  saveCampaign,
} from '../api/campaigns';

function* fetchCampaignsSaga() {
  try {
    const list = yield call(getCampaigns);
    yield put(setCampaigns(list));
  } catch (error) {
    yield put(setCampaignError(error));
  }
}

function* fetchCampaignSaga(action) {
  const data = yield call(getCampaign, action.payload);
  yield put(setCampaign(data));
}

function* saveCampaignSaga(action) {
  try {
    yield call(saveCampaign, action.payload);
    push(ROUTES.CAMPAIGNS);
  } catch (e) {
    yield put(saveCampaignFailed(e));
  }
}

function* campaignsSaga() {
  yield takeLatest(GET_CAMPAIGNS, fetchCampaignsSaga);
  yield takeLatest(SAVE_CAMPAIGN, saveCampaignSaga);
  yield takeLatest(FETCH_CAMPAIGN, fetchCampaignSaga);
}

export default campaignsSaga;
