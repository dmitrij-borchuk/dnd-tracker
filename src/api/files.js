import { storage } from '../utils/firebase';

// Create a root reference
const storageRef = storage.ref();

// eslint-disable-next-line import/prefer-default-export
export const uploadFile = (userId, name, file) => {
  // Create a reference to image
  const ref = storageRef.child(`users/${userId}/${name}`);
  // const ref = storageRef.child(name);

  return ref.put(file);
};

// eslint-disable-next-line import/prefer-default-export
export const getResources = (userId) => {
  // Create a reference to image
  const ref = storageRef.child(`users/${userId}/${name}`);
  // const ref = storageRef.child(name);

  return ref.put(file);
};
