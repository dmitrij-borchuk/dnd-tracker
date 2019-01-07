import { db } from '../utils/firebase';

export const getList = (collection, filterFn) => {
  let req = db.collection(collection);

  if (filterFn) {
    req = filterFn(req);
  }

  return req.get().then(
    querySnapshot => querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })),
  );
};

export const getItem = (collection, id) => db.collection(collection).doc(id).get().then(
  doc => ({
    id: doc.id,
    ...doc.data(),
  }),
);

export const addItem = (collection, data) => db.collection(collection).add(data);

export const saveItem = (collection, { id, ...data }) => {
  if (id) {
    return db.collection(collection).doc(id).update(data);
  }

  return db.collection(collection).add(data);
};

export const removeItem = (collection, id) => db.collection(collection).doc(id).delete();
