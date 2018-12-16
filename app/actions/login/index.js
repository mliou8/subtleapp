import firebase from "firebase";
import config from "../../../config.js";
import { Alert } from "react-native";
import { AuthSession } from "expo";

firebase.initializeApp(config.firebaseConfig);

export const types = {
  FACEBOOK_LOGIN_SUCCESS: "facebook_login_success",
  FACEBOOK_LOGIN_FAIL: "facebook_login_fail",
  AUTH_SUCCESS: "authenticated"
};

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
    console.log("We are authenticated now!");
  }
});

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
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
}

export async function emailLogin(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
  const userId = firebase.auth().currentUser.uid;
  return userId + "";
}

export function testFB(content) {
  firebase
    .database()
    .ref("users/1")
    .set({ highscore: content });
}
