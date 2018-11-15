import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import db from '../utils/firebase';
import { GET_SCENARIOS } from '../actions';
// import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchScenarios(action) {
  try {
    const user = yield call(Api.fetchUser, action.payload.userId);

    const querySnapshot = yield db.collection('scenario').get();
    const scenarios = querySnapshot.docs.map(doc => doc.data());
    // .then(querySnapshot => next({
    //   ...action,
    //   payload: querySnapshot.docs.map(doc => doc.data()),
    // }));

    yield put({ type: 'USER_FETCH_SUCCEEDED', user: user });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* mySaga() {
  yield takeLatest(GET_SCENARIOS, fetchScenarios);
}

export default mySaga;
