import config from '../../../config.js';
import { Alert } from 'react-native';
import { AuthSession } from 'expo';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';

export const PROFILE_FETCHED = 'PROFILE_FETCHED';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
export const USER_FOLLOWED = 'USER_FOLLOWED';
export const USER_UNFOLLOWED = 'USER_UNFOLLOWED';

export const userFollowed= userToFollow => {
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
export const profileFetched = userProfile => {
  return {
    type: PROFILE_FETCHED,
    userProfile
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



// export const followUser = userID => {
//   return async dispatch => {

//   var user = firebase.auth().currentUser;
//   const catData = {
//     uid: 'AobBHaD1U9WJWOCMNFC8',
//     displayName: 'bailey',
//     photoURL: 'https://loremflickr.com/176/230/cat'
//   };
//   const userData = {
//     uid: user.uid,
//     displayName: user.providerData[0].displayName,
//     photoURL: user.providerData[0].photoURL
//   };
//   const currUser = db.collection('users').doc(user.uid);
//   const userOnView = db.collection('users').doc(catData.uid);
//   // const userOnView = db.collection('users').doc(userOnDisplay.uid);
//   const nowFollowing = this.state.followingList;
//   nowFollowing.push(catData);
//   currUser.update({
//     following: firebase.firestore.FieldValue.arrayUnion(catData)
//   });
//   userOnView
//     .update({
//       followers: firebase.firestore.FieldValue.arrayUnion(userData)
//     })
//     .then(function() {
//       console.log('Document successfully written!');
//     });
//     dispatch(userFollowed(userTOFollow)
//   }
// }
// }
