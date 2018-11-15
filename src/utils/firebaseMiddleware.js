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

      return db.collection(action.firebase.path).get().then(querySnapshot => next({
        ...action,
        payload: querySnapshot.docs.map(doc => doc.data()),
      }));
    }

    return next(action);
  };
}
