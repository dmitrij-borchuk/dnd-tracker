import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { ROUTES } from '../constants';
import { push } from '../utils/history';
import {
  // saveResource,
  SAVE_RESOURCE,
  saveResourceFailed,
} from '../actions/resources';
import {
  uploadFile,
} from '../api/files';

// function* fetchScenesSaga(action) {
//   const list = yield call(getScenes, action.payload);
//   yield put(setScenes(list));
// }

// function* fetchSceneSaga(action) {
//   const data = yield call(getScene, action.payload);
//   yield put(setScene(data));
// }

function* saveResourceSaga(action) {
  try {
    yield call(uploadFile, action.payload.name, action.payload.file);
    push(ROUTES.RESOURCES);
  } catch (e) {
    yield put(saveResourceFailed(e));
  }
}

function* saga() {
  yield takeLatest(SAVE_RESOURCE, saveResourceSaga);
  // yield takeLatest(GET_SCENES, fetchScenesSaga);
  // yield takeLatest(FETCH_SCENE, fetchSceneSaga);
}

export default saga;
