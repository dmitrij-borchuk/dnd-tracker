import { storage } from '../utils/firebase';

// Create a root reference
const storageRef = storage.ref();

export const uploadFile = (userId, name, file) => {
  // Create a reference to image
  const ref = storageRef.child(`users/${userId}/${name}`);
  // const ref = storageRef.child(name);

  return ref.put(file);
};

export const getResourceUrl = (userId, name) => storageRef.child(`users/${userId}/${name}`).getDownloadURL();
