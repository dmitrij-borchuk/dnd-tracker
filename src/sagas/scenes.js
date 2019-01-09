import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { ROUTES } from '../constants';
import { push } from '../utils/history';
import {
  SAVE_SCENE,
  GET_SCENES,
  FETCH_SCENE,
  saveSceneFailed,
  setScene,
  setScenes,
  saveSceneSuccess,
} from '../actions/scenes';
import {
  saveScene,
  getScenes,
  getScene,
} from '../api/scenes';

const getUserIdSelector = state => state.auth.currentUser.uid;

function* fetchScenesSaga(action) {
  const userId = yield select(getUserIdSelector);
  const list = yield call(getScenes, userId, action.payload);
  yield put(setScenes(list));
}

function* fetchSceneSaga(action) {
  const userId = yield select(getUserIdSelector);
  const data = yield call(getScene, userId, action.payload);
  yield put(setScene(data));
}

function* saveSceneSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    yield call(saveScene, userId, action.payload);
    yield put(saveSceneSuccess());
    if (action.payload.id) {
      push(`${ROUTES.SCENES}/${action.payload.id}`);
    } else {
      push(`${ROUTES.SCENARIOS}/${action.payload.scenarioId}`);
    }
  } catch (e) {
    yield put(saveSceneFailed(e));
  }
}

function* mySaga() {
  yield takeLatest(SAVE_SCENE, saveSceneSaga);
  yield takeLatest(GET_SCENES, fetchScenesSaga);
  yield takeLatest(FETCH_SCENE, fetchSceneSaga);
}

export default mySaga;
