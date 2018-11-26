import db from '../utils/firebase';

export const getList = collection => db.collection(collection).get().then(
  querySnapshot => querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })),
);

export const getItem = (collection, id) => db.collection(collection).doc(id).get().then(
  querySnapshot => querySnapshot.data(),
);

export const addItem = (collection, data) => db.collection(collection).add(data);
