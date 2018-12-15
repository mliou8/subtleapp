import firebase from 'firebase';
import config from '../../../config.js';
import { Alert } from 'react-native'

firebase.initializeApp(config.firebaseConfig);

const FACEBOOK_LOGIN_SUCCESS = 'facebook_login_success';
const FACEBOOK_LOGIN_FAIL = 'facebook_login_fail';

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }
});

export async function facebookLogin (dispatch) {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(config.fbAppID, {
    permissions: ['public_profile', 'email', 'user_friends'],
  });

  if (type === 'success') {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    accessToken = token;
    return fetch(`https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`)
    .then((response) => {
      try {
        firebase.database().ref(`/users/${response.uid}/userDetails`).set({
          email: response.email,
          phone: response.phone,
          firstname: response.firstname,
          lastname: response.lastname,
          displayName: response.displayName,
          fbEmail: response.email,
          fbDisplayName: response.displayName,
          fbPhotoURL: response.photoURL
        });
      } catch (e) {
        console.log("error ", e)
      }
    })  
  } else {
      //return (dispatch({ type: FACEBOOK_LOGIN_FAIL }));
      //console.log (try again)
    }
};

export async function emailLogin (email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const userId = firebase.auth().currentUser.uid;
    return userId + '';
};

export function testFB(content) {
  firebase.database().ref('users/1').set({highscore: content})
}

