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
  REMOVE_SCENARIO,
  saveScenarioFailed,
  setScenario,
  removeScenarioSuccess,
  removeScenarioFailed,
  fetchScenarioError,
} from '../actions/scenarios';
import {
  saveScenario,
  getScenarios,
  getScenario,
  removeScenario,
} from '../api/scenarios';

const getUserIdSelector = state => state.auth.currentUser.uid;

function* fetchScenariosSaga(action) {
  const userId = yield select(getUserIdSelector);
  const list = yield call(getScenarios, userId, action.payload);
  yield put({ type: SET_SCENARIOS, payload: list });
}

function* fetchScenarioSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    const data = yield call(getScenario, userId, action.payload);
    yield put(setScenario(data));
  } catch (e) {
    yield put(fetchScenarioError(e));
  }
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

function* removeScenarioSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    yield call(removeScenario, userId, action.payload);
    yield put(removeScenarioSuccess(action.payload));
  } catch (e) {
    yield put(removeScenarioFailed(e));
  }
}

function* mySaga() {
  yield takeLatest(SAVE_SCENARIO, saveScenarioSaga);
  yield takeLatest(GET_SCENARIOS, fetchScenariosSaga);
  yield takeLatest(FETCH_SCENARIO, fetchScenarioSaga);
  yield takeLatest(REMOVE_SCENARIO, removeScenarioSaga);
}

export default mySaga;
