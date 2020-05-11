import * as actions from '../actions/containers'
import { IContainersStore } from '../interfaces/containersStore'
import { ContainersAction } from '../actions/containers'

const defaultState: IContainersStore = {
  list: [],
  currentLoading: false,
  listLoading: false,
}

export default function (state = defaultState, action: ContainersAction): IContainersStore {
  switch (action.type) {
    case actions.FETCH_CONTAINERS:
      return {
        ...state,
        listLoading: true,
        error: undefined,
      }

    case actions.SET_CONTAINERS_ERROR:
      return {
        ...state,
        currentLoading: false,
        listLoading: false,
        error: action.payload,
      }

    case actions.SET_CONTAINERS:
      return {
        ...state,
        list: action.payload,
        listLoading: false,
        error: undefined,
      }

    case actions.FETCH_CONTAINER:
      return {
        ...state,
        currentLoading: true,
        error: undefined,
      }

    case actions.SET_CURRENT_CONTAINER:
      return {
        ...state,
        current: action.payload,
        currentLoading: false,
        error: undefined,
      }

    case actions.RESET_CONTAINERS_STORE:
      return defaultState

    default:
      return state
  }
}
