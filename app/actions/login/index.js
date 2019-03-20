import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';
import {Client, ClientError} from '../../client/Client'

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CREATE_PROFILE_ERROR = 'CREATE_PROFILE_ERROR';
export const USER_INFO_FETCHED = 'USER_INFO_FETCHED';
export const USER_INFO_NOT_FOUND = 'USER_INFO_NOT_FOUND';
export const USER_UPDATED = 'USER_UPDATED';
export const EDIT_USER_FAIL = 'EDIT_USER_FAIL';

const client = new Client("https://www.grden.app/ws");

export const userInfoFetched = userProfile => {
  return {
    type: USER_INFO_FETCHED,
    userProfile
  };
};

export const userInfoNotFound = errorMsg => {
  return {
    type: USER_INFO_NOT_FOUND,
    errorMsg
  };
};

export const createProfileError = errorMsg => {
  return {
    type: CREATE_PROFILE_ERROR,
    errorMsg
  };
};

export const authSuccess = () => {
  return {
    type: AUTH_SUCCESS
  };
};

export const logOutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const userUpdated = updatedUserInfo => {
  return {
    type: USER_UPDATED,
    userInfo: updatedUserInfo
  };
};

export const editUserFail = errorMsg => {
  return {
    type: EDIT_USER_FAIL,
    errorMsg
  };
};



export async function doesUserExist() {
  const exists = await client.doesAccountExist(await firebase.auth().currentUser.getIdToken(false));
  return exists;
}

export function logUserIn() {
  return async dispatch => {
    const exists = await doesUserExist();

    if (exists) {
      const user = await client.loginWithFirebase(await firebase.auth().currentUser.getIdToken(false));
      dispatch(userUpdated(user));
      dispatch(authSuccess());
    }
  };
}

export function createUser(user) {
  return async dispatch => {
    try {
      const user = await client.loginWithFirebase(await firebase.auth().currentUser.getIdToken(false));
      dispatch(userUpdated(user));
      dispatch(authSuccess());
    } catch (e) {
        console.error('Error creating user: ', e);
        dispatch(createProfileError(e));
    };
  };
}

export function userLogout() {
  return async dispatch => {
    try {
      await firebase.auth().signOut();
      dispatch(logOutSuccess());
    } catch (e) {
      console.log('Error: ', e);
    }
  };
}

export const fetchUserInfo = userID => {
  return async dispatch => {
    try {
      dispatch(userInfoFetched(await client.getUserDetails(userID)));
    } catch {
      const msg2 = 'Error Retrieving User Document';
      dispatch(userInfoNotFound(msg2));
    }
  };
};

export const followUser = (userObj, currUserInfo) => {
  return async dispatch => {
    /*
    const user = firebase.auth().currentUser;
    const currUserRef = db.collection('users').doc(user.uid);
    const currUserInfoUpdated = currUserInfo;
    const currFollowing = [...currUserInfo.following, userObj];

    currUserInfoUpdated.following = currFollowing;

    currUserRef
      .update({
        following: firebase.firestore.FieldValue.arrayUnion(userObj)
      })
      .then(function() {
        dispatch(userUpdated(currUserInfoUpdated));
      });
    */
  };
};

export const unfollowUser = (userObj, currUserInfo) => {
  return async dispatch => {
    /*
    const user = firebase.auth().currentUser;
    const currUserInfoUpdated = currUserInfo;
    const currFollowing = currUserInfo.following.filter(item => {
      if (item.uid !== userObj.uid) {
        return item;
      }
    });
    currUserInfoUpdated.following = currFollowing;
    const currUserRef = db.collection('users').doc(user.uid);
    currUserRef
      .update({
        following: firebase.firestore.FieldValue.arrayRemove(userObj)
      })
      .then(function() {
        dispatch(userUpdated(currUserInfoUpdated));
      });

      */
  };
};

export const addNetwork = (networkObj, currentUser) => {
  return async dispatch => {
    try {
      const user = client.getUserSelfCached();
      const socialNew = user.social.slice(0);
      socialNew.push(networkObj);
      await client.updateUser({social: socialNew});
      dispatch(updateUser(user.uid));
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };
};

export const removeNetwork = (networkObj, currentUser) => {
  return async dispatch => {
    try {
      const user = client.getUserSelfCached();
      const socialNew = user.social.slice(0).filter(i=>i.type !== networkObj.type);
      await client.updateUser({social: socialNew});
      dispatch(updateUser(user.uid));
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };
};
export const addNewChatToCurrentUser = (userToMsgInfo, userInfo) => {
  return async dispatch => {
    const userChatsUpdated = userInfo.conversations.concat(userToMsgInfo);
    const updatedUserInfo = userInfo;
    updatedUserInfo.conversations = userChatsUpdated;
    const currUserOnRef = db.collection('users').doc(userInfo.uid);
    currUserOnRef
      .update({
        conversations: firebase.firestore.FieldValue.arrayUnion(userToMsgInfo)
      })
      .then(function() {
        dispatch(userUpdated(updatedUserInfo));
      });
  };
};

const updateUser = uid => {
  return async dispatch => {
    try {
      dispatch(userUpdated(await client.getUserDetails(uid)));
    } catch (e) {
      const msg = 'Error Retrieving User Document';
      dispatch(userInfoNotFound(msg));
    }
  };
};
