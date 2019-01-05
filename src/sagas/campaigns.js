import {
  call,
  put,
  takeLatest,
  select,
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

const getUserIdSelector = state => state.auth.currentUser.uid;

function* fetchCampaignsSaga() {
  try {
    const userId = yield select(getUserIdSelector);
    const list = yield call(getCampaigns, userId);
    yield put(setCampaigns(list));
  } catch (error) {
    yield put(setCampaignError(error));
  }
}

function* fetchCampaignSaga(action) {
  const userId = yield select(getUserIdSelector);
  const data = yield call(getCampaign, userId, action.payload);
  yield put(setCampaign(data));
}

function* saveCampaignSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    yield call(saveCampaign, userId, action.payload);
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
