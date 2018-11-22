import db from './firebase';

const assert = (obj, prop, message) => {
  if (!obj[prop]) {
    throw new Error(message);
  }
};

export default function firebaseMiddleware(store) {
  return next => (action) => {
    if (action.firebase) {
      // Check for the correct config
      assert(action.firebase, 'path', '`action.firebase.path` is required');

      store.dispatch({
        type: `${action.type}_REQUEST`,
      });

      switch (action.firebase.method) {
        case 'get':
          return db.collection(action.firebase.path).get().then(querySnapshot => next({
            ...action,
            payload: querySnapshot.docs.map(doc => doc.data()),
          }));

        case 'save':
          return db.collection(action.firebase.path).add(
            action.payload,
          ).then(querySnapshot => next({
            ...action,
            payload: querySnapshot.docs.map(doc => doc.data()),
          }));

        default:
          throw new Error('`action.firebase.method` key should be one of the next: `get`, `save`');
      }
    }

    return next(action);
  };
}
