import config from "../../../config.js";
import { Alert } from "react-native";
import { AuthSession } from "expo";
import moment from "moment";
import firebase from "db/firebase";
import db from "db/firestore";

export const FACEBOOK_LOGIN_SUCCESS = "FACEBOOK_LOGIN_SUCCESS";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const USER_PROFILE_CREATED = "USER_PROFILE_CREATED";
export const CREATE_PROFILE_ERROR = "CREATE_PROFILE_ERROR";

function facebookLoginSuccess(facebookUser) {
  return {
    type: FACEBOOK_LOGIN_SUCCESS,
    facebookUser
  };
}

export const userProfileCreated = userProfile => {
  return {
    type: USER_PROFILE_CREATED,
    userProfile
  };
};
export const createProfileError = errorMsg => {
  return {
    type: CREATE_PROFILE_ERROR,
    errorMsg
  };
};

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

export function facebookLogin() {
  return async dispatch => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      config.fbAppID,
      {
        permissions: ["public_profile", "email"]
      }
    );
    if (type === "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .catch(function(error) {
          console.error(error);
          dispatch(authFail(error));
        });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user !== null) {
          console.log("current user is ", user);
          const currTime = Date.now();
          const currentTime = moment(currTime).format(
            "MMMM Do YYYY, h:mm:ss a"
          );
          const profile = {};
          profile.uid = user.uid;
          profile.provider = user.providerData[0].providerId;
          profile.providerID = user.providerData[0].uid;
          profile.displayName = user.providerData[0].displayName;
          profile.email = user.providerData[0].email;
          profile.photoURL = user.providerData[0].photoURL;
          profile.lastLoginAt = currentTime;
          profile.followers = [];
          profile.following = [];
          profile.mediaTags = [];

          db.collection("users")
            .doc(user.uid)
            .set({
              profile
            })
            .then(function(docRef) {
              console.log("Document written with ID:");
              dispatch(userProfileCreated(profile));
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);

              dispatch(createProfileError(error));
            });
        }
      });

      dispatch(facebookLoginSuccess(token));
      dispatch(authSuccess());
    }
  };
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
