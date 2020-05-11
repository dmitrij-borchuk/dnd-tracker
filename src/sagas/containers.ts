import { call, put, takeLatest, select } from 'redux-saga/effects'
import { ROUTES } from '../constants'
import { push } from '../utils/history'
import {
  GET_CAMPAIGNS,
  SAVE_CAMPAIGN,
  setCampaigns,
  FETCH_CAMPAIGN,
  REMOVE_CAMPAIGN,
  saveCampaignFailed,
  setCampaign,
  setCampaignError,
  removeCampaignSuccess,
  removeCampaignFailed,
  fetchCampaignError,
} from '../actions/campaigns'
import { getCampaigns, getCampaign, saveCampaign, removeCampaign } from '../api/campaigns'
import {
  FETCH_CONTAINERS,
  IFetchContainersAction,
  setContainers,
  setContainerError,
  SAVE_CONTAINER,
  ISaveContainerAction,
  FETCH_CONTAINER,
  IFetchContainerAction,
  setCurrentContainer,
} from '../actions/containers'
import { IStore } from '../interfaces'
import { getContainers, saveContainers, getContainer } from '../api/containers'

const getUserIdSelector = (state: IStore) => state.auth.currentUser.uid

function* fetchContainersSaga(action: IFetchContainersAction) {
  try {
    const userId = yield select(getUserIdSelector)
    const list = yield call(getContainers, userId, action.payload)
    yield put(setContainers(list))
  } catch (error) {
    yield put(setContainerError(error))
  }
}

function* saveContainerSaga(action: ISaveContainerAction) {
  try {
    const userId = yield select(getUserIdSelector)
    const containerWrapper = yield call(saveContainers, userId, action.payload)
    if (containerWrapper) {
      // `containerWrapper` exists in case creation
      push(`/${containerWrapper.id}`)
    } else {
      // when edit lets use id from known instance
      push(`/${action.payload.id}`)
    }
  } catch (error) {
    yield put(setContainerError(error))
  }
}

function* fetchContainerSaga(action: IFetchContainerAction) {
  try {
    const userId = yield select(getUserIdSelector)
    const data = yield call(getContainer, userId, action.payload)
    yield put(setCurrentContainer(data))
  } catch (error) {
    yield put(setContainerError(error))
  }
}

// function* saveCampaignSaga(action) {
//   try {
//     const userId = yield select(getUserIdSelector)
//     yield call(saveCampaign, userId, action.payload)
//     push(ROUTES.CAMPAIGNS)
//   } catch (e) {
//     yield put(saveCampaignFailed(e))
//   }
// }

// function* removeCampaignSaga(action) {
//   try {
//     const userId = yield select(getUserIdSelector)
//     yield call(removeCampaign, userId, action.payload)
//     yield put(removeCampaignSuccess(action.payload))
//   } catch (e) {
//     yield put(removeCampaignFailed(e))
//   }
// }

function* containersSaga() {
  yield takeLatest(FETCH_CONTAINERS, fetchContainersSaga)
  yield takeLatest(SAVE_CONTAINER, saveContainerSaga)
  yield takeLatest(FETCH_CONTAINER, fetchContainerSaga)
  // yield takeLatest(REMOVE_CAMPAIGN, removeCampaignSaga)
}

export default containersSaga
