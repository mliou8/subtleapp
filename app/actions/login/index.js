import config from "../../../config.js";
import { Alert } from "react-native";
import { AuthSession } from "expo";
import firebase from "db/firebase";

export const FACEBOOK_LOGIN_SUCCESS = "FACEBOOK_LOGIN_SUCCESS";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

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
