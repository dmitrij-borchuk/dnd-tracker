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
  saveScenarioFailed,
} from '../actions/scenarios';
import {
  saveScenario,
  getScenarios,
} from '../api/scenarios';

function* fetchScenariosSaga() {
  const list = yield call(getScenarios);
  yield put({ type: SET_SCENARIOS, payload: list });
}

function* saveScenarioSaga(action) {
  try {
    yield call(saveScenario, action.payload);
    push(ROUTES.SCENARIOS);
  } catch (e) {
    yield put(saveScenarioFailed(e));
  }
}

function* mySaga() {
  yield takeLatest(SAVE_SCENARIO, saveScenarioSaga);
  yield takeLatest(GET_SCENARIOS, fetchScenariosSaga);
}

export default mySaga;
