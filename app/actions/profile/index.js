import config from '../../../config.js';
import { Alert } from 'react-native';
import { AuthSession } from 'expo';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';
import { userUpdated } from 'app/actions/login';

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
    var docRef = db.collection('users').doc(userID);

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
    const user = firebase.auth().currentUser;
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

export const addNetwork = (networkObj, currentUser) => {
  return async dispatch => {
    const userRef = db.collection("users").doc(currentUser.uid);
    return db.runTransaction((transaction) => {
      return transaction.get(userRef).then(function(user) {
        if (!user.exists) {
          throw "Document does not exist!";
        }
        const networksUpdate = user.data().socialNetworks;
        networksUpdate.push(networkObj)
        transaction.update(userRef, { socialNetworks: networksUpdate });
        return user.data().uid
      })
    })
    .then(function(uid) {
      console.log("Document successfully updated");
      dispatch(updateUser(uid));
    })
    .catch(function(error) {
      console.error("Error updating document: ", error);
    })
  }
}

export const removeNetwork = (networkObj, currentUser) => {
  return async dispatch => {     
    const userRef = db.collection("users").doc(currentUser.uid);
    return db.runTransaction((transaction) => {
      return transaction.get(userRef).then(function(user) {
        if (!user.exists) {
          throw "Document does not exist!";
        }
        const currentNetworks = user.data().socialNetworks;
        const filteredNetworks = currentNetworks.filter((networks) => { 
          return networks.source !== networkObj.source; 
        }); 
        if (filteredNetworks.length === 0) {
          filteredNetworks = [{}];
        }        
        console.log("filteredNetworks is ", filteredNetworks);
        transaction.update(userRef, {socialNetworks: filteredNetworks});
        return user.data().uid
      })
    })
    .then(function(uid) {
      console.log("Document successfully updated ", uid);
      dispatch(updateUser(uid));
    })
    .catch(function(error) {
      console.error("Error updating document: ", error);
    })
  }
}

const updateUser = (uid) => {
  return async dispatch => {
    const userRef = db.collection("users").doc(uid);
    userRef
      .get()
      .then(function(user) {
        if (user.exists) {
          const profile = user.data();
          console.log("newProfile");
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
  }
}