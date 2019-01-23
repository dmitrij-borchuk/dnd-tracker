import {
  call,
  put,
  takeLatest,
  select,
  all,
} from 'redux-saga/effects';
import { ROUTES } from '../constants';
import { push } from '../utils/history';
import * as actions from '../actions/resources';
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
  yield put(actions.setResources(patchedData));
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
    yield put(actions.saveResourceFailed(e));
  }
}

// Resource
function* fetchResourceSaga(action) {
  const userId = yield select(getUserIdSelector);
  const data = yield call(getResource, userId, action.payload);
  const url = yield call(getResourceUrl, userId, data.name);
  yield put(actions.setResource({
    ...data,
    url,
  }));
}

// Linked resources
function* getLinkedResourcesSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    const data = yield call(getLinkedResources, userId, action.payload);
    const resources = yield all(
      data.map(item => call(getResource, userId, item.resourceId)),
    );
    yield put(actions.getLinkedResourcesSuccess(resources));
  } catch (e) {
    yield put(actions.getLinkedResourcesFailed(e));
  }
}

function* saveLinkedResourceSaga(action) {
  try {
    const userId = yield select(getUserIdSelector);
    yield call(saveLinkedResources, userId, action.payload);
    push(`${ROUTES.SCENES}/${action.payload.linkedTo}`);
  } catch (e) {
    yield put(actions.saveResourceFailed(e));
  }
}

function* saga() {
  yield takeLatest(actions.SAVE_RESOURCE, saveResourceSaga);
  yield takeLatest(actions.GET_RESOURCES, fetchResourcesSaga);
  yield takeLatest(actions.GET_LINKED_RESOURCES, getLinkedResourcesSaga);
  yield takeLatest(actions.SAVE_LINKED_RESOURCE, saveLinkedResourceSaga);
  yield takeLatest(actions.GET_RESOURCE, fetchResourceSaga);
}

export default saga;
