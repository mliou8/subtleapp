import firebase from 'firebase';
import config from '../../../config.js';
import { Alert } from 'react-native'
import { AuthSession } from 'expo';


firebase.initializeApp(config.firebaseConfig);

export const types = {
  FACEBOOK_LOGIN_SUCCESS : 'facebook_login_success',
  FACEBOOK_LOGIN_FAIL : 'facebook_login_fail',
  AUTH_SUCCESS: 'authenticated',
}

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }
});

export async function facebookLogin (dispatch) {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(config.fbAppID, {
    permissions: ['public_profile', 'email'],
  });

  if (type === 'success') {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
};

export async function facebookAuth (dispatch) {
   let redirectUrl = AuthSession.getRedirectUrl();
   let result = await AuthSession.startAsync({
     authUrl:
       `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
       `&client_id=${config.fbAppID}` +
       `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
   });
   return result; 
 };
 
export async function facebookSignup (dispatch) {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(config.fbAppID, {
    permissions: ['public_profile', 'email'],
  });

  if (type === 'success') {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    accessToken = token;
    try {
        let user = await firebase.auth().signInWithCredential(credential);
        var displayName = firstname + ' ' + lastname;
        // write user properties to firebase
        firebase.database().ref(`/users/${user.uid}/userDetails`).set({
          email: email,
          phone: phone,
          firstname: firstname,
          lastname: lastname,
          displayName: displayName,
          fbEmail: user.email,
          fbDisplayName: user.displayName,
          fbPhotoURL: user.photoURL
        });
      } catch (error) {
        console.log(error);
      }
    }
}

export async function emailLogin (email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const userId = firebase.auth().currentUser.uid;
    return userId + '';
};

export function testFB(content) {
  firebase.database().ref('users/1').set({highscore: content})
}

