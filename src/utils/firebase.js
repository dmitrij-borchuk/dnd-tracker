import * as firebase from 'firebase';
import { FirebaseConfig } from '../config/keys';

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();

export default databaseRef.child('todos');
