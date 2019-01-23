import {
  call,
  put,
  takeLatest,
  select,
  all,
} from 'redux-saga/effects';
import { ROUTES } from '../constants';
import { push } from '../utils/history';
import {
  SAVE_RESOURCE,
  setResources,
  GET_RESOURCES,
  saveResourceFailed,
  GET_LINKED_RESOURCES,
  SAVE_LINKED_RESOURCE,
  getLinkedResourcesSuccess,
  getLinkedResourcesFailed,
} from '../actions/resources';
import {
  uploadFile,
  getResourceUrl,
} from '../api/files';
import {
  getResources,
  saveResource,
  getLinkedResources,
  saveLinkedResources,
  getResource,
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

// Linked resources
function* getLinkedResourcesSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    const data = yield call(getLinkedResources, userId, action.payload);
    const resources = yield all(
      data.map(item => call(getResource, userId, item.resourceId)),
    );
    yield put(getLinkedResourcesSuccess(resources));
  } catch (e) {
    yield put(getLinkedResourcesFailed(e));
  }
}

function* saveLinkedResourceSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    yield call(saveLinkedResources, userId, action.payload);
    push(`${ROUTES.SCENES}/${action.payload.linkedTo}`);
  } catch (e) {
    yield put(saveResourceFailed(e));
  }
}

function* saga() {
  yield takeLatest(SAVE_RESOURCE, saveResourceSaga);
  yield takeLatest(GET_RESOURCES, fetchResourcesSaga);
  yield takeLatest(GET_LINKED_RESOURCES, getLinkedResourcesSaga);
  yield takeLatest(SAVE_LINKED_RESOURCE, saveLinkedResourceSaga);
}

export default saga;
