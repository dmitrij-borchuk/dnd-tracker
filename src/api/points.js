import {
  getList,
  getItem,
  saveItem,
  removeItem,
} from './utils';
/** Structure:
 * {object} point
 * {string} point.name
 * {string} point.description - rich text
 * {number} point.x
 * {number} point.y
 * {string} point.linkedId - resource id
 */

export const getPoints = (userId, linkedId) => getList(
  `users/${userId}/points`,
  req => req.where('linkedId', '==', linkedId),
);
export const getPoint = (userId, id) => getItem(`users/${userId}/points`, id);
export const savePoint = (userId, data) => saveItem(`users/${userId}/points`, data);
export const removePoint = (userId, id) => removeItem(`users/${userId}/points`, id);
