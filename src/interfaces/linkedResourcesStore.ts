import { Vocabulary } from '../types';
import { ILinkedResource } from './linkedResource';

export interface ILinkedResourcesStore {
  list: Vocabulary<ILinkedResource>,
  error: Error,
  loading: boolean,
}
