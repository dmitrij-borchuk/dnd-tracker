import { all } from 'redux-saga/effects';
import scenariosSaga from './scenarios';
import campaignsSaga from './campaigns';
import scenesSaga from './scenes';
import resourcesSaga from './resources';
import authSaga from './auth';
import commonSaga from './common';

function* saga() {
  yield all([
    scenariosSaga(),
    campaignsSaga(),
    scenesSaga(),
    resourcesSaga(),
    authSaga(),
    commonSaga(),
  ]);
}

export default saga;
