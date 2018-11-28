import { all } from 'redux-saga/effects';
import scenariosSaga from './scenarios';
import campaignsSaga from './campaigns';
import scenesSaga from './scenes';

function* saga() {
  yield all([
    scenariosSaga(),
    campaignsSaga(),
    scenesSaga(),
  ]);
}

export default saga;
