import { all } from 'redux-saga/effects';
import scenariosSaga from './scenarios';
import campaignsSaga from './campaigns';
import scenesSaga from './scenes';
import resourcesSaga from './resources';

function* saga() {
  yield all([
    scenariosSaga(),
    campaignsSaga(),
    scenesSaga(),
    resourcesSaga(),
  ]);
}

export default saga;
