import {
  put,
  takeLatest,
} from 'redux-saga/effects';
import { SETUP_APP } from '../actions/common';
import { setUser } from '../actions/auth';
import { getCurrentUser } from '../utils/firebase';

function* setupAppSaga() {
  try {
    const user = yield getCurrentUser();
    yield put(setUser(user));
  } catch (e) {
    // TODO: show error
  }
}

function* saga() {
  yield takeLatest(SETUP_APP, setupAppSaga);
}

export default saga;
