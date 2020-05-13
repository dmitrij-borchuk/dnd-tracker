import { IContainer } from './container'

export interface IContainersStore {
  current?: IContainer
  currentLoading: boolean
  error?: Error
  list: IContainer[]
  listLoading: boolean
}
