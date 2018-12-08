import { storage } from '../utils/firebase';

// Create a root reference
const storageRef = storage.ref();

// eslint-disable-next-line import/prefer-default-export
export const uploadFile = (name, file) => {
  console.log('=-= name', name)
  console.log('=-= file', file)
  // Create a reference to 'mountains.jpg'
  const ref = storageRef.child(name);

  return ref.put(file);
  // .then(function (snapshot) {
  //   console.log('Uploaded a blob or file!');
  // });
};
