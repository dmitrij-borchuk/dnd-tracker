import { IContainer, IContainerToSave } from '../interfaces/container'

export const FETCH_CONTAINERS = 'FETCH_CONTAINERS'
export interface IFetchContainersAction {
  type: typeof FETCH_CONTAINERS
  payload?: string
}
export const fetchContainers = (parentId?: string): IFetchContainersAction => ({
  type: FETCH_CONTAINERS,
  payload: parentId,
})

export const SET_CONTAINERS_ERROR = 'SET_CONTAINERS_ERROR'
export interface ISetContainersErrorAction {
  type: typeof SET_CONTAINERS_ERROR
  payload: Error
}
export const setContainerError = (error: Error): ISetContainersErrorAction => ({
  type: SET_CONTAINERS_ERROR,
  payload: error,
})

export const SET_CONTAINERS = 'SET_CONTAINERS'
export interface ISetContainersAction {
  type: typeof SET_CONTAINERS
  payload: IContainer[]
}
export const setContainers = (data: IContainer[]): ISetContainersAction => ({
  type: SET_CONTAINERS,
  payload: data,
})

export const FETCH_CONTAINER = 'FETCH_CONTAINER'
export interface IFetchContainerAction {
  type: typeof FETCH_CONTAINER
  payload: string
}
export const fetchContainer = (data: string): IFetchContainerAction => ({
  type: FETCH_CONTAINER,
  payload: data,
})

export const SET_CURRENT_CONTAINER = 'SET_CURRENT_CONTAINER'
export interface ISetCurrentContainerAction {
  type: typeof SET_CURRENT_CONTAINER
  payload: IContainer
}
export const setCurrentContainer = (data: IContainer): ISetCurrentContainerAction => ({
  type: SET_CURRENT_CONTAINER,
  payload: data,
})

export const RESET_CURRENT_CONTAINER = 'RESET_CURRENT_CONTAINER'
export interface IResetCurrentContainerAction {
  type: typeof RESET_CURRENT_CONTAINER
}
export const resetCurrentContainer = (): IResetCurrentContainerAction => ({
  type: RESET_CURRENT_CONTAINER,
})

export const RESET_CONTAINERS_STORE = 'RESET_CONTAINERS_STORE'
export interface IResetContainersStoreAction {
  type: typeof RESET_CONTAINERS_STORE
}
export const resetContainersStore = (): IResetContainersStoreAction => ({
  type: RESET_CONTAINERS_STORE,
})

export const SAVE_CONTAINER = 'SAVE_CONTAINER'
export interface ISaveContainerAction {
  type: typeof SAVE_CONTAINER
  payload: IContainerToSave
}
export const saveContainer = (data: IContainerToSave): ISaveContainerAction => ({
  type: SAVE_CONTAINER,
  payload: data,
})

export const REMOVE_CONTAINER = 'REMOVE_CONTAINER'
export interface IRemoveContainerAction {
  type: typeof REMOVE_CONTAINER
  payload: IContainer
}
export const removeContainer = (data: IContainer): IRemoveContainerAction => ({
  type: REMOVE_CONTAINER,
  payload: data,
})

export type ContainersAction =
  | IFetchContainersAction
  | ISetContainersErrorAction
  | ISetContainersAction
  | IFetchContainerAction
  | ISetCurrentContainerAction
  | IResetCurrentContainerAction
  | ISaveContainerAction
  | IResetContainersStoreAction
