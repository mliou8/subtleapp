import config from '../../../config.js';
import { Alert } from 'react-native';
import { AuthSession } from 'expo';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';

export const FACEBOOK_LOGIN_SUCCESS = 'FACEBOOK_LOGIN_SUCCESS';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const USER_PROFILE_CREATED = 'USER_PROFILE_CREATED';
export const CREATE_PROFILE_ERROR = 'CREATE_PROFILE_ERROR';
export const USER_INFO_FETCHED = 'USER_INFO_FETCHED';
export const USER_INFO_NOT_FOUND = ' USER_INFO_NOT_FOUND';
export const USER_FOLLOWED = 'USER_FOLLOWED';
export const USER_UNFOLLOWED = 'USER_UNFOLLOWED';

function facebookLoginSuccess(facebookUser) {
  return {
    type: FACEBOOK_LOGIN_SUCCESS,
    facebookUser
  };
}

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

function userProfileCreated(userProfile) {
  return {
    type: USER_PROFILE_CREATED,
    userProfile
  };
}
function createProfileError(errorMsg) {
  return {
    type: CREATE_PROFILE_ERROR,
    errorMsg
  };
}

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
function logOutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}
export const userFollowed = userToFollow => {
  return {
    type: USER_FOLLOWED,
    userToFollow
  };
};
export const userUnfollowed = userToUnfollow => {
  return {
    type: USER_UNFOLLOWED,
    userToUnfollow
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
      await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)

        .catch(function(error) {
          console.error(error);
          dispatch(authFail(error));
        });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user !== null) {
          console.log('current user is ', user);
          const currTime = Date.now();
          const currentTime = moment(currTime).format(
            'MMMM Do YYYY, h:mm:ss a'
          );

          db.collection('users')
            .doc(user.uid)
            .set({
              uid: user.uid,
              provider: user.providerData[0].providerId,
              providerID: user.providerData[0].uid,
              displayName: user.providerData[0].displayName,
              email: user.providerData[0].email,
              photoURL: user.providerData[0].photoURL,
              lastLoginAt: currentTime,
              followers: [],
              following: [],
              socialNetworks: [
                { source: 'Facebook', sourceUrl: 'facebookprofileurl' }
              ]
            })
            .then(function(docRef) {
              console.log('Document written with ID:');
              dispatch(userProfileCreated(userInfo));
            })
            .catch(function(error) {
              console.error('Error adding document: ', error);

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
  return userId + '';
}

export async function userLogout() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        console.log('Sign out!');
        console.log(firebase.auth().currentUser);
        dispatch(logOutSuccess());
      },
      function(error) {
        console.error(error);
      }
    );
}
export const fetchUserInfo = userID => {
  return async dispatch => {
    var docRef = db.collection('users').doc(`${userID}`);

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data());
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

export const followUser = userObj => {
  return async dispatch => {
    var user = firebase.auth().currentUser;
    const currUserRef = db.collection('users').doc(user.uid);

    currUserRef
      .update({
        following: firebase.firestore.FieldValue.arrayUnion(userObj)
      })
      .then(function() {
        dispatch(userFollowed(userObj));
      });
  };
};

export const unfollowUser = userObj => {
  return async dispatch => {
    var user = firebase.auth().currentUser;
    const currUserRef = db.collection('users').doc(user.uid);
    currUserRef
      .update({
        following: firebase.firestore.FieldValue.arrayRemove(userObj)
      })
      .then(function() {
        dispatch(userUnfollowed(userObj));
      });
  };
};
