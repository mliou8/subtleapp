import firebase from 'firebase';
import config from '../../../config.js';
import { Alert } from 'react-native'
import { AuthSession } from 'expo';


firebase.initializeApp(config.firebaseConfig);

export const types = {
  FACEBOOK_LOGIN_SUCCESS: 'FACEBOOK_LOGIN_SUCCESS',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAIL: 'AUTH_FAIL',
}

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }
});

 function facebookLoginSuccess(user) {
  return {
    type: FACEBOOK_LOGIN_SUCCESS,
    facebookUser,
    authenticated, 
  }
}

 function authSuccess(user) {
  return {
    type: AUTH_SUCCESS, 
    authenticated,
  }
}

 function authFail(errorMsg) {
  return {
    type: AUTH_FAIL, 
    authenticated,
    errorMsg,
  }
}

export async function facebookLogin (dispatch) {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(config.fbAppID, {
    permissions: ['public_profile', 'email'],
  });

  if (type === 'success') {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, facebookUser: token });
    dispatch({ type: AUTH_SUCCESS })
  } else {
    dispatch({ type: AUTH_FAIL, errorMsg: 'Authentication failed' });
  }
};

export async function testLogin (dispatch) {
  dispatch({ type: AUTH_SUCCESS }) 
}

export async function emailLogin (email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const userId = firebase.auth().currentUser.uid;
    return userId + '';
};


