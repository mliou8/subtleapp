import config from '../../../config.js';
import { Alert } from 'react-native';
import { AuthSession } from 'expo';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';

export const PROFILE_FETCHED = 'PROFILE_FETCHED';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
export const PROFILE_ADD_FOLLOWER = 'PROFILE_ADD_FOLLOWER';
export const PROFILE_REMOVE_FOLLOWER = 'PROFILE_REMOVE_FOLLOWER';

export const profileFollowerAdded = userToFollowID => {
  return {
    type: PROFILE_ADD_FOLLOWER,
    userToFollowID
  };
};
export const profileFollowerRemoved = userToUnfollowID => {
  return {
    type: PROFILE_REMOVE_FOLLOWER,
    userToUnfollowID
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

export const fetchUser = userID => {
  return async dispatch => {
    var docRef = db.collection('users').doc(`${userID}`);

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          const profile = doc.data();
          dispatch(profileFetched(profile.profile));
        } else {
          const msg = 'No such user with that uid';

          dispatch(profileNotFound(msg));
        }
      })
      .catch(function(error) {
        const msg2 = 'Error Retrieving User Document';
        dispatch(profileNotFound(msg2));
      });
  };
};

export const profileAddFollower = profileUserID => {
  return async dispatch => {
    const user = firebase.auth().currentUser;
    const userData = {
      uid: user.uid,
      displayName: user.providerData[0].displayName,
      photoURL: user.providerData[0].photoURL
    };
    const userOnView = db.collection('users').doc(profileUserID);

    userOnView
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion(userData)
      })
      .then(function() {
        dispatch(profileFollowerAdded(profileUserID));
      });
  };
};

export const profileRemoveFollower = profileUserID => {
  return async dispatch => {
    var user = firebase.auth().currentUser;
    const userData = {
      uid: user.uid,
      displayName: user.providerData[0].displayName,
      photoURL: user.providerData[0].photoURL
    };

    const userOnViewRef = db.collection('users').doc(profileUserID);

    userOnViewRef
      .update({
        followers: firebase.firestore.FieldValue.arrayRemove(userData)
      })
      .then(function() {
        dispatch(profileFollowerRemoved(profileUserID));
      });
  };
};

export function addNetwork(networkObj) {
  const currentUser = currentUser();
  const userRef = db.collection("users").doc(currentUser.uid);
  console.log("currentUser ", currentUser)
  const networkToUpdate = fetchNetworks(currentUser);
  currentNetworks.push(newNetwork);
  return userRef.update({
    socialNetworks: networkToUpdate,
  })
  .then(function() {
    console.log("Document successfully updated");
  })
  .catch(function(error) {
    console.error("Error updating document: ", error);
   })
}

export function removeNetwork(networkObj) {
  const currentUser = currentUser();
  console.log("currentUser ", currentUser)
  const userRef = db.collection("users").doc(currentUser.uid);
  const networkToUpdate = fetchNetworks(currentUser);
  const filteredNetwork = networkToUpdate.filter((networks) => { 
     return networks.type !== networkObj.type; 
   }); 
  return userRef.update({
    socialNetworks: filteredNetwork 
  })
  .then(function() {
    console.log("Document successfully updated!");
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
}

function currentUser() {
  const user = firebase.auth().currentUser;
  console.log("user is ", user);
  if (!user) {
    return null;
  }
  else {
    return user;
  }
}