import db from '../utils/firebase';

export const getScenarios = () => db.collection('scenario').get().then(
  querySnapshot => querySnapshot.docs.map(doc => doc.data()),
);

export const saveScenario = data => db.collection('scenario').add(data);
