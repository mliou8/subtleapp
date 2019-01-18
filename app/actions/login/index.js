import config from '../../../config.js';
import DialogInput from 'react-native-dialog-input';
import { AuthSession } from 'expo';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';

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

export function doesUserExist(user) {
  const userRef = db.collection('users').doc(user.uid);
  return userRef.get().then(function(dbUser) {
    if (dbUser.exists) {
      return true;
    } else {
      return false;
    }
  });
}

export function logUserIn(user) {
  return async dispatch => {
    const userRef = db.collection('users').doc(user.uid);
    userRef.get().then(function(dbUser) {
      if (dbUser.exists) {
        dispatch(userUpdated(dbUser.data()));
        dispatch(authSuccess());
      } else {
        return false;
      }
    });
  };
}

function createUser(user) {
  return async dispatch => {
    const currTime = Date.now();
    const currentTime = moment(currTime).format('MMMM Do YYYY, h:mm:ss a');
    const newUser = {
      uid: user.uid,
      provider: user.providerData[0].providerId,
      providerID: user.providerData[0].uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastLoginAt: currentTime,
      followers: [],
      following: [],
      socialNetworks: [{ source: 'facebook', sourceUrl: 'facebookprofileurl' }]
    };
    db.collection('users')
      .doc(user.uid)
      .set(newUser)
      .then(function() {
        dispatch(userUpdated(newUser));
        dispatch(authSuccess());
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
        dispatch(createProfileError(error));
      });
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
    var docRef = db.collection('users').doc(`${userID}`);

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          const profile = doc.data();
          dispatch(userInfoFetched(profile));
        } else {
          const msg = 'No such user with that uid';
          dispatch(userInfoNotFound(msg));
        }
      })
      .catch(function(error) {
        const msg2 = 'Error Retrieving User Document';
        dispatch(profileNotFound(msg2));
      });
  };
};

export const followUser = (userObj, currUserInfo) => {
  return async dispatch => {
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
  };
};

export const unfollowUser = (userObj, currUserInfo) => {
  return async dispatch => {
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
  };
};

export const addNetwork = (networkObj, currentUser) => {
  return async dispatch => {
    const userRef = db.collection('users').doc(currentUser.uid);
    return db
      .runTransaction(transaction => {
        return transaction.get(userRef).then(function(user) {
          if (!user.exists) {
            throw 'Document does not exist!';
          }
          const networksUpdate = user.data().socialNetworks;
          networksUpdate.push(networkObj);
          transaction.update(userRef, { socialNetworks: networksUpdate });
          return user.data().uid;
        });
      })
      .then(function(uid) {
        console.log('Document successfully updated');
        dispatch(updateUser(uid));
      })
      .catch(function(error) {
        console.error('Error updating document: ', error);
      });
  };
};

export const removeNetwork = (networkObj, currentUser) => {
  return async dispatch => {
    const userRef = db.collection('users').doc(currentUser.uid);
    return db
      .runTransaction(transaction => {
        return transaction.get(userRef).then(function(user) {
          if (!user.exists) {
            throw 'Document does not exist!';
          }
          const currentNetworks = user.data().socialNetworks;
          const filteredNetworks = currentNetworks.filter(networks => {
            return networks.source !== networkObj.source;
          });
          if (filteredNetworks.length === 0) {
            filteredNetworks = [{}];
          }
          // currentUser.socialNetworks = filteredNetworks;
          transaction.update(userRef, { socialNetworks: filteredNetworks });
          return user.data().uid;
        });
      })
      .then(function(uid) {
        console.log('Document successfully updated ', uid);
        dispatch(updateUser(uid));
        // dispatch(userUpdated(currentUser));
      })
      .catch(function(error) {
        console.error('Error updating document: ', error);
      });
  };
};
export const addNewChatToCurrentUser = (userToMsgInfo, userInfo) => {
  return async dispatch => {
    const currTime = Date.now();
    userToMsgInfo.lastMessageTime = moment(currTime).format(
      'MMMM Do YYYY, h:mm:ss a'
    );

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
    const userRef = db.collection('users').doc(uid);
    userRef
      .get()
      .then(function(user) {
        if (user.exists) {
          const profile = user.data();
          // console.log('newProfile');
          dispatch(userUpdated(profile));
        } else {
          const msg = 'No such user with that uid';
          dispatch(profileNotFound(msg));
        }
      })
      .catch(function(error) {
        const msg = 'Error Retrieving User Document';
        dispatch(profileNotFound(msg));
      });
  };
};
