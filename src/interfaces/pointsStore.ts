import { Vocabulary } from '../types';
import { IPoint } from './points';

export interface IPointsStore {
  list: Vocabulary<IPoint>,
  error?: Error,
  loading: boolean,
}
