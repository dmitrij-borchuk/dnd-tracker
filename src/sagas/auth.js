import { call, put, takeLatest } from 'redux-saga/effects';
import {
  SIGN_IN,
  SIGN_OUT,
  setUser,
  signInError,
} from '../actions/auth';
import { signIn, signOut } from '../utils/firebase';
import { STORAGE_SET } from '../utils/localStorageMiddleware';

function* signInSaga() {
  try {
    const result = yield call(signIn);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // yield put(setUser(result.user));
    yield put({
      type: STORAGE_SET,
      payload: {
        key: 'token',
        data: token,
      },
    });
    yield put({
      type: STORAGE_SET,
      payload: {
        key: 'user',
        // The signed-in user info.
        data: result.user,
      },
    });
    // eslint-disable-next-line no-undef
    window.location.reload();
  } catch (e) {
    yield put(signInError(e));
    throw e;
    // TODO: show error
  }
}

function* signOutSaga() {
  try {
    yield call(signOut);
    yield put(setUser(null));
  } catch (e) {
    // TODO: show error
  }
}

function* saga() {
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
}

export default saga;
