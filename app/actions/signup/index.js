import firebase from 'firebase';
import { firebaseConfig } from '../../../config.js';
import { Alert } from 'react-native'

firebase.initializeApp(firebaseConfig);

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }
});

export async function emailSignup (email, password, firstname, lastname) {
  const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
  await firebase.auth().signInWithEmailAndPassword(email, password);
  const userId = user.uid
  return userId + '';
};

function authUser() {
  console.log("Authenticating the User")
  return {
    type: AUTH_USER
  }
}
