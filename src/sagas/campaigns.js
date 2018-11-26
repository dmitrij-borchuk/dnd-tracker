import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
// import { ROUTES } from '../constants';
// import { push } from '../utils/history';
import {
  GET_CAMPAIGNS,
  setCampaigns,
  // SAVE_SCENARIO,
  // FETCH_SCENARIO,
  // saveScenarioFailed,
  // setScenario,
} from '../actions/campaigns';
import {
  getCampaigns,
  // saveScenario,
  // getScenario,
} from '../api/campaigns';

function* fetchCampaignsSaga() {
  const list = yield call(getCampaigns);
  yield put(setCampaigns(list));
}

// function* fetchScenarioSaga(action) {
//   const data = yield call(getScenario, action.payload);
//   yield put(setScenario(data));
// }

// function* saveScenarioSaga(action) {
//   try {
//     yield call(saveScenario, action.payload);
//     push(ROUTES.SCENARIOS);
//   } catch (e) {
//     yield put(saveScenarioFailed(e));
//   }
// }

function* campaignsSaga() {
  yield takeLatest(GET_CAMPAIGNS, fetchCampaignsSaga);
  // yield takeLatest(SAVE_SCENARIO, saveScenarioSaga);
  // yield takeLatest(FETCH_SCENARIO, fetchScenarioSaga);
}

export default campaignsSaga;
