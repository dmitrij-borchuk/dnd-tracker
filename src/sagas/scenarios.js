import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { ROUTES } from '../constants';
import { push } from '../utils/history';
import {
  SAVE_SCENARIO,
  GET_SCENARIOS,
  SET_SCENARIOS,
  FETCH_SCENARIO,
  saveScenarioFailed,
  setScenario,
} from '../actions/scenarios';
import {
  saveScenario,
  getScenarios,
  getScenario,
} from '../api/scenarios';

function* fetchScenariosSaga(action) {
  const list = yield call(getScenarios, action.payload);
  yield put({ type: SET_SCENARIOS, payload: list });
}

function* fetchScenarioSaga(action) {
  const data = yield call(getScenario, action.payload);
  yield put(setScenario(data));
}

function* saveScenarioSaga(action) {
  try {
    yield call(saveScenario, action.payload);
    push(`${ROUTES.CAMPAIGN}/${action.payload.campaignId}`);
  } catch (e) {
    yield put(saveScenarioFailed(e));
  }
}

function* mySaga() {
  yield takeLatest(SAVE_SCENARIO, saveScenarioSaga);
  yield takeLatest(GET_SCENARIOS, fetchScenariosSaga);
  yield takeLatest(FETCH_SCENARIO, fetchScenarioSaga);
}

export default mySaga;
