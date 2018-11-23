import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { ROUTES } from '../constants';
import { push } from '../utils/history';
import { SAVE_SCENARIO } from '../actions/scenarios';
import { saveScenario } from '../api/scenarios';

function* fetchScenarios(action) {
  try {
    yield call(saveScenario, action.payload);
    push(ROUTES.SCENARIOS + '/');
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* mySaga() {
  yield takeLatest(SAVE_SCENARIO, fetchScenarios);
}

export default mySaga;
