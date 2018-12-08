import { db } from '../utils/firebase';

export const getScene = id => db.collection('scene').doc(id).get().then(
  querySnapshot => querySnapshot.data(),
);

export const getScenes = scenarioId => db.collection('scene')
  .where('scenarioId', '==', scenarioId)
  .get()
  .then(querySnapshot => querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })));

export const saveScene = data => db.collection('scene').add(data);
