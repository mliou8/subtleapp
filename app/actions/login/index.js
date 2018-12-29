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
export const USER_INFO_NOT_FOUND = 'USER_INFO_NOT_FOUND';
export const USER_UPDATED = 'USER_UPDATED';

export const facebookLoginSuccess = (facebookUser) => {
  return {
    type: FACEBOOK_LOGIN_SUCCESS,
    facebookUser
  };
}

export const userInfoFetched = (userProfile) => {
  return {
    type: USER_INFO_FETCHED,
    userProfile
  };
};

export const userInfoNotFound = (errorMsg) => {
  return {
    type: USER_INFO_NOT_FOUND,
    errorMsg
  };
};

export const userProfileCreated = (userProfile) => {
  return {
    type: USER_PROFILE_CREATED,
    userProfile
  };
}

export const createProfileError = (errorMsg) => {
  return {
    type: CREATE_PROFILE_ERROR,
    errorMsg
  };
}

export const authSuccess = () => {
  return {
    type: AUTH_SUCCESS
  };
}

export const authFail = (errorMsg) => {
  return {
    type: AUTH_FAIL,
    errorMsg
  };
}

export const logOutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
}

export const userUpdated = (updatedUserInfo) => {
  return {
    type: USER_UPDATED,
    updatedUserInfo
  };
};

firebase.auth().onAuthStateChanged(function(user) {
  createUserIfNoneExists(user)
});

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
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
      } else {
        const errorMsg = "Facebook Login Failed.";
        dispatch(authFail(errorMsg));
      }
    }
  }
  
function createUserIfNoneExists(user) {
  const userRef = db.collection('users').doc(user.uid);
  console.log("user is ", user);
  
  userRef
    .get()
    .then(function(dbUser) {
      if (!dbUser.exists) {
        const currTime = Date.now();
   	    const currentTime = moment(currTime).format('MMMM Do YYYY, h:mm:ss a');
        const newUser = {
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
        }
        db.collection('users')
          .doc(user.uid)
          .set(newUser)
          .then(function() {
            dispatch(userProfileCreated(newUser));
          })
          .catch(function(error) {
            console.error('Error adding document: ', error);
            dispatch(createProfileError(error));
          });
      }
    })
  }


export async function userLogout() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
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
    var user = firebase.auth().currentUser;
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
    var user = firebase.auth().currentUser;
    const currUserInfoUpdated = currUserInfo;
    const currFollowing = currUserInfoUpdated.following.filter(item => {
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
