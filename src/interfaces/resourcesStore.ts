import { IResource } from './resource'
import { Vocabulary } from '../types';

export interface IResourcesStore {
  list: Vocabulary<IResource>,
  error: Error,
  loading: boolean,
}
