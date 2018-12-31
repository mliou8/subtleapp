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
export const PROFILE_UPDATED = 'PROFILE_UPDATED';

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

export const profileUpdated = updatedProfileInfo => {
  return {
    type: PROFILE_UPDATED,
    profileInfo: updatedProfileInfo
  };
};
export const profileInfoFetched = userProfile => {
  return {
    type: PROFILE_FETCHED,
    userProfile
  };
};

export const profileInfoNotFound = errorMsg => {
  return {
    type: PROFILE_NOT_FOUND,
    errorMsg
  };
};

export const fetchUserProfileInfo = userID => {
  return async dispatch => {
    var docRef = db.collection('users').doc(`${userID}`);

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          const profile = doc.data();
          dispatch(profileInfoFetched(profile));
        } else {
          const msg = 'No such user with that uid';

          dispatch(profileInfoNotFound(msg));
        }
      })
      .catch(function(error) {
        const msg2 = 'Error Retrieving User Document';
        dispatch(profileInfoNotFound(msg2));
      });
  };
};

export const profileAddFollower = (userToFollowID, currProfileInfo) => {
  return async dispatch => {
    const user = firebase.auth().currentUser;
    const userData = {
      uid: user.uid,
      displayName: user.providerData[0].displayName,
      photoURL: user.providerData[0].photoURL
    };
    const followersListUpdated = currProfileInfo.push(userData);
    const updatedProfileInfo = currProfileInfo;
    updatedProfileInfo.followers = followersListUpdated;
    const userOnView = db.collection('users').doc(userToFollowID);

    userOnView
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion(userData)
      })
      .then(function() {
        dispatch(profileUpdated(updatedProfileInfo));
      });
  };
};

export const profileRemoveFollower = (userToUnfollowID, currProfileInfo) => {
  return async dispatch => {
    var user = firebase.auth().currentUser;
    const userData = {
      uid: user.uid,
      displayName: user.providerData[0].displayName,
      photoURL: user.providerData[0].photoURL
    };
    const followersListUpdated = currProfileInfo.filter(
      item => item.uid !== userToUnfollowID
    );
    const updatedProfileInfo = currProfileInfo;
    updatedProfileInfo.followers = followersListUpdated;
    const userOnViewRef = db.collection('users').doc(userToUnfollowID);

    userOnViewRef
      .update({
        followers: firebase.firestore.FieldValue.arrayRemove(userData)
      })
      .then(function() {
        dispatch(profileUpdated(updatedProfileInfo));
      });
  };
};
