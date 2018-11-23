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
} from '../actions/scenarios';
import {
  saveScenario,
  getScenarios,
} from '../api/scenarios';

function* fetchScenariosSaga() {
  try {
    const list = yield call(getScenarios);
    yield put({ type: SET_SCENARIOS, payload: list });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* saveScenarioSaga(action) {
  try {
    yield call(saveScenario, action.payload);
    push(ROUTES.SCENARIOS);
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* mySaga() {
  yield takeLatest(SAVE_SCENARIO, saveScenarioSaga);
  yield takeLatest(GET_SCENARIOS, fetchScenariosSaga);
}

export default mySaga;
