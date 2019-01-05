import {
  call,
  put,
  takeLatest,
  select,
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

const getUserIdSelector = state => state.auth.currentUser.uid;

function* fetchScenariosSaga(action) {
  const userId = yield select(getUserIdSelector);
  const list = yield call(getScenarios, userId, action.payload);
  yield put({ type: SET_SCENARIOS, payload: list });
}

function* fetchScenarioSaga(action) {
  const userId = yield select(getUserIdSelector);
  const data = yield call(getScenario, userId, action.payload);
  yield put(setScenario(data));
}

function* saveScenarioSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    yield call(saveScenario, userId, action.payload);
    push(`${ROUTES.CAMPAIGNS}/${action.payload.campaignId}`);
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
