import config from '../../../config.js';
import { Alert } from 'react-native';
import { AuthSession } from 'expo';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';

export const PROFILE_FETCHED = 'PROFILE_FETCHED';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';

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
          console.log('Document data:', doc.data());
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
