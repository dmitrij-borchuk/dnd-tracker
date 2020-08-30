import {
  getList,
  getItem,
  saveItem,
} from './utils';
import { IResource } from '../interfaces/resource';
import { ILinkedResource } from '../interfaces';

const getResPath = (userId: string) => `users/${userId}/resources`

export const getResources = (userId: string) => getList(getResPath(userId));
export const getResource = (userId: string, id: string) => getItem(getResPath(userId), id);
export const saveResource = (userId: string, data: IResource) => saveItem(getResPath(userId), data);

const getLinkedResPath = (userId: string) => `users/${userId}/linkedResources`

export const getLinkedResources = (userId: string, linkedTo: string) => getList(
  getLinkedResPath(userId),
  req => req.where('linkedTo', '==', linkedTo),
);
export const saveLinkedResources = (userId: string, data: ILinkedResource) => saveItem(getLinkedResPath(userId), data);
export const getLinkedResource = (userId: string, id: string) => getItem(getLinkedResPath(userId), id);
