import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { ROUTES } from '../constants';
import { push } from '../utils/history';
import {
  // saveResource,
  SAVE_RESOURCE,
  GET_RESOURCES,
  saveResourceFailed,
} from '../actions/resources';
import {
  uploadFile,
} from '../api/files';

// function* fetchScenesSaga(action) {
//   const list = yield call(getScenes, action.payload);
//   yield put(setScenes(list));
// }

function* fetchResourceSaga(action) {
  const data = yield call(getScene, action.payload);
  yield put(setScene(data));
}

const getUserIdSelector = state => state.auth.currentUser.uid;

function* saveResourceSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    yield call(uploadFile, userId, action.payload.name, action.payload.file);
    push(ROUTES.RESOURCES);
  } catch (e) {
    yield put(saveResourceFailed(e));
  }
}

function* saga() {
  yield takeLatest(SAVE_RESOURCE, saveResourceSaga);
  yield takeLatest(GET_RESOURCES, fetchResourceSaga);
  // yield takeLatest(FETCH_SCENE, fetchSceneSaga);
}

export default saga;
