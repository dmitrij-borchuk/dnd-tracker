import {
  call,
  put,
  takeLatest,
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
} from '../actions/scenes';
import {
  saveScene,
  getScenes,
  getScene,
} from '../api/scenes';

function* fetchScenesSaga(action) {
  const list = yield call(getScenes, action.payload);
  yield put(setScenes(list));
}

function* fetchSceneSaga(action) {
  const data = yield call(getScene, action.payload);
  yield put(setScene(data));
}

function* saveSceneSaga(action) {
  try {
    yield call(saveScene, action.payload);
    push(`${ROUTES.SCENARIOS}/${action.payload.scenarioId}`);
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
