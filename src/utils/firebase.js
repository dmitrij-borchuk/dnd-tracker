import * as firebase from 'firebase'
import getConfig from '../config/keys'

// TODO:
/*
  It looks like you're using the development build of the Firebase JS SDK.
  When deploying Firebase apps to production, it is advisable to only import
  the individual SDK components you intend to use.

  For the module builds, these are available in the following manner
  (replace <PACKAGE> with the name of a component - i.e. auth, database, etc):

  CommonJS Modules:
  const firebase = require('firebase/app');
  require('firebase/<PACKAGE>');

  ES Modules:
  import firebase from 'firebase/app';
  import 'firebase/<PACKAGE>';

  Typescript:
  import * as firebase from 'firebase/app';
  import 'firebase/<PACKAGE>';
*/

const FirebaseConfig = getConfig()

firebase.initializeApp(FirebaseConfig)

export const storage = firebase.storage()

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore()

export const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  return firebase.auth().signInWithPopup(provider)
}

export const signOut = () => firebase.auth().signOut()

export const getCurrentUser = () =>
  new Promise((res) => {
    firebase.auth().onAuthStateChanged((user) => {
      res(user)
    })
  })
