import { IPoint } from "../interfaces/points";

export interface IFetchPointsAction {
  type: 'GET_POINTS'
  payload?: string
}
export const getPoints = (linkedId: string): IFetchPointsAction => ({
  type: 'GET_POINTS',
  payload: linkedId,
});

export interface ISetPointsAction {
  type: 'SET_POINTS'
  payload: IPoint[]
}
export const setPoints = (data: IPoint[]): ISetPointsAction => ({
  type: 'SET_POINTS',
  payload: data,
});

export interface ISavePointsAction {
  type: 'SAVE_POINTS'
  payload: IPoint[]
}
export const savePoints = (data: IPoint[]) => ({
  type: 'SAVE_POINTS',
  payload: data,
});

export const SAVE_POINTS_FAILED = 'SAVE_POINTS_FAILED';
export const savePointsFailed = (data: Error) => ({
  type: SAVE_POINTS_FAILED,
  payload: data,
});

export const SAVE_POINT = 'SAVE_POINT';
export const savePoint = (data: IPoint) => ({
  type: SAVE_POINT,
  payload: data,
});

export interface ISavePointSuccessAction {
  type: 'SAVE_POINT_SUCCESS'
  payload: IPoint
}
export const savePointSuccess = (data: IPoint): ISavePointSuccessAction => ({
  type: 'SAVE_POINT_SUCCESS',
  payload: data,
});

export const SAVE_POINT_FAILED = 'SAVE_POINT_FAILED';
export const savePointFailed = (data: Error) => ({
  type: SAVE_POINT_FAILED,
  payload: data,
});

export type PointsAction =
  | IFetchPointsAction
  // | ISetPointsErrorAction
  | ISetPointsAction
  |ISavePointSuccessAction
  // | IFetchPointAction
  // | ISetCurrentPointAction
  // | IResetCurrentPointAction
  // | ISavePointAction
  // | IResetPointsStoreAction
