import config from "../../../config.js";
import { Alert } from "react-native";
import { AuthSession } from "expo";
import moment from "moment";
import firebase from "db/firebase";
import db from "db/firestore";

// export const USER_PROFILE_CREATED = "USER_PROFILE_CREATED";
export const CREATE_PROFILE_ERROR = "CREATE_PROFILE_ERROR";
export const PROFILE_FETCHED = "PROFILE_FETCHED";
export const PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND";

// export const userProfileCreated = userProfile => {
//   return {
//     type: USER_PROFILE_CREATED,
//     userProfile
//   };
// };

export const createProfileError = errorMsg => {
  return {
    type: CREATE_PROFILE_ERROR,
    errorMsg
  };
};

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
export function addUserProfile() {
  return async dispatch => {
    //var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(user => {
      // if (user !== null) {
      // console.log("current user is ", user);
      const currTime = Date.now();
      const currentTime = moment(currTime).format("MMMM Do YYYY, h:mm:ss a");
      const profile = {};
      profile.uid = user.uid;
      profile.facebookUser = user.providerData[0];
      profile.displayName = user.providerData[0].displayName;
      profile.email = user.providerData[0].email;
      profile.photoURL = user.providerData[0].photoURL;
      profile.lastLoginAt = currentTime;
      profile.followers = [];
      profile.following = [];
      profile.mediaTags = [];
      return createUserProfile(profile);
      // }
    });
  };
}

export function createUserProfile(facebookInfo) {
  return async dispatch => {
    db.collection("users")
      .doc(`${facebookInfo.uid}`)
      .set({
        facebookInfo
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        dispatch(userProfileCreated(facebookInfo));
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        //erorr here
        dispatch(createProfileError(error));
      });
  };
}

export const fetchUser = userID => {
  return async dispatch => {
    var docRef = db.collection("users").doc(`${userID}`);

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          const profile = doc.data();
          dispatch(profileFetched(profile));
        } else {
          const msg = "No such user with that uid";
          return addUserProfile();
          //.then(dispatch(profileNotFound(msg)));
        }
      })
      .catch(function(error) {
        const msg2 = "Error Retrieving User Document";
        dispatch(profileNotFound(msg2));
      });
  };
};

///thse are next --- they aslo need actions creaters too! right now they haev none!
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
