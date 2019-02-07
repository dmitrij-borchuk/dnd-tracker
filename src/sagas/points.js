import {
  call,
  put,
  takeLatest,
  select,
  all,
} from 'redux-saga/effects';
import { push } from '../utils/history';
import { ROUTES } from '../constants';
import * as actions from '../actions/points';
import * as linkedResourcesPageActions from '../actions/linkedResourcesPage';
import {
  getPoints,
  savePoint,
} from '../api/points';

const getUserIdSelector = state => state.auth.currentUser.uid;

function* getPointsSaga(action) {
  const userId = yield select(getUserIdSelector);
  const list = yield call(getPoints, userId, action.payload);
  yield put(actions.setPoints(list));
}

function* savePointsSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    yield all(action.payload.points.map(point => savePoint(userId, point)));
    push(`${ROUTES.SCENES}/${action.payload.sceneId}`);
  } catch (error) {
    yield put(actions.savePointsFailed(error));
  }
}

function* savePointSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    yield savePoint(userId, action.payload);
    yield put(actions.savePointSuccess(action.payload));
    yield put(linkedResourcesPageActions.setModalState(false));
  } catch (error) {
    yield put(actions.savePointFailed(error));
  }
}

function* mySaga() {
  yield takeLatest(actions.GET_POINTS, getPointsSaga);
  yield takeLatest(actions.SAVE_POINTS, savePointsSaga);
  yield takeLatest(actions.SAVE_POINT, savePointSaga);
}

export default mySaga;
