import config from '../../../config.js';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';
import {Client, ClientError} from '../../../client/Client.js'

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const USER_PROFILE_CREATED = 'USER_PROFILE_CREATED';
export const CREATE_PROFILE_ERROR = 'CREATE_PROFILE_ERROR';
export const USER_INFO_FETCHED = 'USER_INFO_FETCHED';
export const USER_INFO_NOT_FOUND = 'USER_INFO_NOT_FOUND';
export const USER_UPDATED = 'USER_UPDATED';
export const EDIT_USER_FAIL = 'EDIT_USER_FAIL';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const INVITE_ERROR = 'INVITE_ERROR';

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

export const authFail = errorMsg => {
  return {
    type: AUTH_FAIL,
    errorMsg
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

export const openModal = () => {
  return {
    type: OPEN_MODAL
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const inviteError = () => {
  return {
    type: INVITE_ERROR
  };
};

export function facebookLogin() {
  return async dispatch => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      config.fbAppID,
      {
        permissions: ['public_profile', 'email']
      }
    );

    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    } else {
      const errorMsg = 'Facebook Login Failed.';
      dispatch(authFail(errorMsg));
    }
  };
}

export async function doesUserExist(user) {
  const firebase_id_token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
  console.log("id token: "+ firebase_id_token);
  return await client.doesAccountExist(firebase_id_token);
  
}

export function logUserIn(user) {
  return async dispatch => {
    const firebase_id_token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
    const user_exists = await client.doesAccountExist(firebase_id_token);

    if (user_exists) {
      const firebase_id_token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
      await client.loginWithFirebase(firebase_id_token);

      dispatch(userUpdated(client.getUserSelfCached()));
      dispatch(authSuccess());
    } else {
      return false;
    }
  };
}

function createUser(user) {
  return async dispatch => {
    try {
      const firebase_id_token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
      await client.loginWithFirebase(firebase_id_token);
      dispatch(userUpdated(client.getUserSelfCached()));
      dispatch(authSuccess());
    } catch (error) {
      console.error('Error adding document: ', error);
      dispatch(createProfileError(error.message));
    }
  };
}

export function checkCode(code) {
  return async dispatch => {
    const inviteRef = db.collection('codes').doc(code);
    const user = firebase.auth().currentUser;
    inviteRef.get().then(dbCode => {
      if (dbCode.exists) {
        dispatch(createUser(user));
        dispatch(closeModal());
        inviteRef.update({
          usersUsed: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });
      } else {
        dispatch(inviteError());
      }
    });
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
    } catch (error) {
      dispatch(profileNotFound(error.message));
    }
  };
};

export const followUser = (userObj, currUserInfo) => {
  return async dispatch => {

  };
};

export const unfollowUser = (userObj, currUserInfo) => {
  return async dispatch => {
    
  };
};

export const addNetwork = (networkObj, currentUser) => {
  return async dispatch => {
    try {  
      const user = await client.getUserSelf();
      const newUser = await client.updateUser({social:user.social.push(networkObj)});
      
      dispatch(updateUser());
    } catch (error) {
      console.error('Error updating document: ', error.message);
    }
  };
};

export const removeNetwork = (networkObj, currentUser) => {
  return async dispatch => {
    try {  
      const user = await client.getUserSelf();
      const newUser = await client.updateUser({
        social:user.social.filter((s) => s.url !== networkObj.url)
      });
      
      dispatch(updateUser());
    } catch (error) {
      console.error('Error updating document: ', error.message);
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
    } catch(error) {
      dispatch(profileNotFound(error.message));
    }
  };
};
