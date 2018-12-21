import config from "../../../config.js";
import { Alert } from "react-native";
import { AuthSession } from "expo";
import firebase from "db/firebase";

export const FACEBOOK_LOGIN_SUCCESS = "FACEBOOK_LOGIN_SUCCESS";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

function facebookLoginSuccess(facebookUser) {
  return {
    type: FACEBOOK_LOGIN_SUCCESS,
    facebookUser
  };
}

function authSuccess() {
  return {
    type: AUTH_SUCCESS
  };
}

function authFail(errorMsg) {
  return {
    type: AUTH_FAIL,
    errorMsg
  };
}
export const logOutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export async function facebookLogin(dispatch) {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    config.fbAppID,
    {
      permissions: ["public_profile", "email"]
    }
  );
  if (type === "success") {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    dispatch(facebookLoginSuccess(token));
    dispatch(authSuccess());
  } else {
    const errorMsg = "Facebook Login Failed.";
    dispatch(authFail(errorMsg));
  }
}

export async function testLogin(dispatch) {
  dispatch(authSuccess());
}

export async function emailLogin(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
  const userId = firebase.auth().currentUser.uid;
  return userId + "";
}

export async function userLogout() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        console.log("Sign out!");
        console.log(firebase.auth().currentUser);
        dispatch(logOutSuccess());
      },
      function(error) {
        console.error(error);
      }
    );
}
