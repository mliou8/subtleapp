import firebase from 'db/firebase';
import db from 'db/firestore';
import {Client, ClientError} from 'app/client/Client'

export const PROFILE_FETCHED = 'PROFILE_FETCHED';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';

export const PROFILE_UPDATED = 'PROFILE_UPDATED';

export const profileUpdated = updatedProfileInfo => {
  return {
    type: PROFILE_UPDATED,
    updatedProfileInfo
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

export const fetchUserProfileInfo = userID => {
  return async dispatch => {
    try {
      dispatch(profileFetched(await Client.current().getUserDetails(userID)));
    } catch (e) {
      const msg2 = 'Error Retrieving User Document';
      dispatch(profileNotFound(msg2));
    }
  };
};

export const profileAddFollower = profileUserInfo => {
  return async dispatch => {
    /*
    const user = firebase.auth().currentUser;
    const userData = {
      uid: user.uid,
      displayName: user.providerData[0].displayName,
      photoURL: user.providerData[0].photoURL
    };
    const followersListUpdated = profileUserInfo.followers.concat(userData);
    const updatedProfileInfo = profileUserInfo;
    updatedProfileInfo.followers = followersListUpdated;
    const userOnView = db.collection('users').doc(profileUserInfo.uid);

    userOnView
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion(userData)
      })
      .then(function() {
        dispatch(profileUpdated(updatedProfileInfo));
      });
      */
  };
};

export const profileRemoveFollower = profileUserInfo => {
  return async dispatch => {
    /*
    var user = firebase.auth().currentUser;
    const userData = {
      uid: user.uid,
      displayName: user.providerData[0].displayName,
      photoURL: user.providerData[0].photoURL
    };

    const followersListUpdated = profileUserInfo.followers.filter(
      item => item.uid !== userData.uid
    );
    const updatedProfileInfo = profileUserInfo;
    updatedProfileInfo.followers = followersListUpdated;
    const profileOnViewRef = db.collection('users').doc(profileUserInfo.uid);

    profileOnViewRef
      .update({
        followers: firebase.firestore.FieldValue.arrayRemove(userData)
      })
      .then(function() {
        dispatch(profileUpdated(updatedProfileInfo));
      });
      */
  };
};

export const addNewChatToOtherUser = (userInfo, profileUserInfo) => {
  return async dispatch => {
    const chatListUpdated = profileUserInfo.conversations.concat(userInfo);

    const updatedProfileInfo = profileUserInfo;
    updatedProfileInfo.conversations = chatListUpdated;
    const userOnView = db.collection('users').doc(profileUserInfo.uid);

    userOnView
      .update({
        conversations: firebase.firestore.FieldValue.arrayUnion(userInfo)
      })
      .then(function() {
        dispatch(profileUpdated(updatedProfileInfo));
      });
  };
};
