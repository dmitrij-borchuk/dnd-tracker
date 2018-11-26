import { all } from 'redux-saga/effects';
import scenariosSaga from './scenarios';
import campaignsSaga from './campaigns';

function* saga() {
  yield all([
    scenariosSaga(),
    campaignsSaga(),
  ]);
}

export default saga;
