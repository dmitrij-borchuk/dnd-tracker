import { db } from '../utils/firebase';

export const getScenario = id => db.collection('scenario').doc(id).get().then(
  querySnapshot => querySnapshot.data(),
);

export const getScenarios = campaignId => db.collection('scenario')
  .where('campaignId', '==', campaignId)
  .get()
  .then(querySnapshot => querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })));

export const saveScenario = data => db.collection('scenario').add(data);
