import firebase from "db/firebase";

export function createUserifNoneExists(user) {
  const docRef = firebase.database().ref("/users/" + user.uid)
  docRef.once('value').then(function(snapshot) {
    if (snapshot.val() !== null) {
      console.log("User already exists in database.");
    } else {
      const { uid, photoURL, displayName, lastLoginAt = "", email, followers = [], following = [], } = user;
      const newUser = { uid, photoURL, displayName, lastLoginAt, email };
      docRef.set(newUser);
      console.log("New User Created from FB credentials.");
    }
  })
}

export function fetchUser(uid) {
  const docRef = firebase.database().ref("/users/" + uid)
  
  docRef.once('value').then(function(snapshot) {
    if (snapshot.val() !== null) {
      console.log("snapshot is ", snapshot.val())
      return snapshot.val();
    } else {
      return "";
    }
  })
}

export function fetchFollowers(uid) {
  const docRef = firebase.database().ref("/users/" + uid)
  
  docRef.once('value').then(function(snapshot) {
    if (snapshot.val() !== null) {
      console.log("snapshot is ", snapshot.val())
      return snapshot.val();
    } else {
      return "";
    }
  })  
}

export function fetchFollowing(uid) {
  const docRef = firebase.database().ref("/users/" + uid)
  
  docRef.once('value').then(function(snapshot) {
    if (snapshot.val() !== null) {
      console.log("snapshot is ", snapshot.val())
      return snapshot.val();
    } else {
      return "";
    }
  })
}

export function followUser(uid) {   
  const currentUser = firebase.auth().currentUser;
  const docRefUser = firebase.database().ref("/users/" + uid);
  const docRefSelf = firebase.database().ref("/users/" + currentUser.uid);

  docRefUser.once('value').then(function(snapshot) {
    if (snapshot.val() !== null) {
      const originalUser = snapshot.val();
      const followers = snapshot.val().followers
      followers.push(currentUser.uid)
      snapshot.val().followers
      return snapshot.val();
    } else {
      return "";
    }
  })
}

export function fetchNetworks(uid) {
  
}

export function updateNetworks(uid) {
  
}
 
// Helpers
function getCollection(collectionName) {
  return firebase.firestore().collection(collectionName);
}

function getUid() {
  return (firebase.auth().currentUser || {}).uid;
}

function getTimestamp() {
  return Date.now();
}