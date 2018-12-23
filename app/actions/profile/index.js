import config from "../../../config.js";
import { Alert } from "react-native";
import { AuthSession } from "expo";
import moment from "moment";
import firebase from "db/firebase";
import db from "db/firestore";

export const PROFILE_FETCHED = "PROFILE_FETCHED";
export const PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND";

export const profileFetched = userProfile => {
  return {
    type: PROFILE_FETCHED,
    userProfile
  };
};

export const profileNotFound = errorMsg => {
  return {
    type: PROFILE_NOT_FOUND,
    errorMsg
  };
};

export const fetchUser = userID => {
  return async dispatch => {
    var docRef = db.collection("users").doc(`${userID}`);

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          const profile = doc.data();
          dispatch(profileFetched(profile.profile));
        } else {
          const msg = "No such user with that uid";

          dispatch(profileNotFound(msg));
        }
      })
      .catch(function(error) {
        const msg2 = "Error Retrieving User Document";
        dispatch(profileNotFound(msg2));
      });
  };
};

export const fetchFollowers = userID => {
  var docRef = db.collection("users").doc(userID);
  // const docRef = firebase.database().ref("/users/" + uid);

  docRef.once("value").then(function(snapshot) {
    if (snapshot.val() !== null) {
      console.log("snapshot is ", snapshot.val());
      return snapshot.val();
    } else {
      return "";
    }
  });
};

export const fetchFollowing = uid => {
  // const docRef = firebase.database().ref("/users/" + uid);
  var docRef = db.collection("users").doc(uid);

  docRef.once("value").then(function(snapshot) {
    if (snapshot.val() !== null) {
      console.log("snapshot is ", snapshot.val());
      return snapshot.val();
    } else {
      return "";
    }
  });
};

export const followUser = uid => {
  const currentUser = firebase.auth().currentUser;
  const docRefUser = db.collection("users").doc(uid);
  // const docRefUser = firebase.database().ref("/users/" + uid);
  const docRefSelf = db.collection("users").doc(currentUser.uid);
  // const docRefSelf = firebase.database().ref("/users/" + currentUser.uid);

  docRefUser.once("value").then(function(snapshot) {
    if (snapshot.val() !== null) {
      const originalUser = snapshot.val();
      const followers = snapshot.val().followers;
      followers.push(currentUser.uid);
      snapshot.val().followers;
      return snapshot.val();
    } else {
      return "";
    }
  });
};

export function fetchNetworks(uid) {}

export function updateNetworks(uid) {}

// Helpers
function getCollection(collectionName) {
  return firebase.firestore().collection(collectionName);
}

function getUid() {
  return (firebase.auth().currentUser || {}).uid;
}

function getTimestamp() {
  return Date.now();
}
