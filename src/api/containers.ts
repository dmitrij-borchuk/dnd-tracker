import firebase from 'firebase'
import { getList, getItem, saveItem, removeItem } from './utils'
import { IContainerToSave } from '../interfaces/container'

const getPath = (userId: string) => `users/${userId}/containers`

export const getContainers = (userId: string, parentId?: string) =>
  getList(getPath(userId), (req) => req.where('parentId', '==', parentId || 'root'))
export const getContainer = (userId: string, id: string) => getItem(getPath(userId), id)
export const saveContainers = (userId: string, data: IContainerToSave) => saveItem(getPath(userId), data)
// export const removePoint = (userId, id) => removeItem(`users/${userId}/points`, id)
