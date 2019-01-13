import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { ROUTES } from '../constants';
import { push } from '../utils/history';
import {
  setResources,
  SAVE_RESOURCE,
  GET_RESOURCES,
  saveResourceFailed,
} from '../actions/resources';
import {
  uploadFile,
  getResourceUrl,
} from '../api/files';
import {
  getResources,
  saveResource,
} from '../api/resources';

const getUserIdSelector = state => state.auth.currentUser.uid;

function* fetchResourcesSaga() {
  const userId = yield select(getUserIdSelector);
  const data = yield call(getResources, userId);
  const urls = yield Promise.all(data.map(resource => getResourceUrl(userId, resource.name)));
  const patchedData = data.map((item, index) => ({
    ...item,
    url: urls[index],
  }));
  yield put(setResources(patchedData));
}

function* saveResourceSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    yield call(uploadFile, userId, action.payload.name, action.payload.file);
    yield call(saveResource, userId, {
      name: action.payload.name,
      description: action.payload.description,
      type: action.payload.type,
    });
    push(ROUTES.RESOURCES);
  } catch (e) {
    yield put(saveResourceFailed(e));
  }
}

function* saga() {
  yield takeLatest(SAVE_RESOURCE, saveResourceSaga);
  yield takeLatest(GET_RESOURCES, fetchResourcesSaga);
}

export default saga;
