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
  REMOVE_CAMPAIGN,
  saveCampaignFailed,
  setCampaign,
  setCampaignError,
  removeCampaignSuccess,
  removeCampaignFailed,
} from '../actions/campaigns';
import {
  getCampaigns,
  getCampaign,
  saveCampaign,
  removeCampaign,
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

function* removeCampaignSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    yield call(removeCampaign, userId, action.payload);
    yield put(removeCampaignSuccess, action.payload);
  } catch (e) {
    yield put(removeCampaignFailed(e));
  }
}

function* campaignsSaga() {
  yield takeLatest(GET_CAMPAIGNS, fetchCampaignsSaga);
  yield takeLatest(SAVE_CAMPAIGN, saveCampaignSaga);
  yield takeLatest(FETCH_CAMPAIGN, fetchCampaignSaga);
  yield takeLatest(REMOVE_CAMPAIGN, removeCampaignSaga);
}

export default campaignsSaga;
