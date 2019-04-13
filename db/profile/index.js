import firebase from "db/firebase";
import db from "../db";
import { generateInviteCode } from "util/invite";

export const fetchUser = userID => {
     const userRef = db.collection("users").doc(userID);
      userRef.get()
      .then(function(user) {
         if (user.exists) {
           return user;
         } else {
           return null;
         }
       })
       .catch(function(error) {
         console.log("Error in retrieving user: ", error)
       });
 };

export function fetchNetworks(user) {
  const userRef = db.collection("users").doc(user.uid);

  userRef.get()
    .then(function(user) {
      if (user.exists) {
        return user.socialNetworks;
      } else {
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}

export async function createCode(currUser) {
  try {
    const inviteCode = generateInviteCode();
    await db.collection("codes").doc(inviteCode).set({
      userGenerated: currUser.uid,
      usersUsed: [],
    })
    return inviteCode
  }
  catch (err) {
    console.log("Error code ", err);
  }
}

export async function blockUser(blockedUserId) {
  try {
    const user = firebase.auth().currentUser;
    const currUserRef = db.collection("blocked").doc(user.uid);
    const blockedUserRef = db.collection("blocked").doc(blockedUserId);
    currUserRef.set({
      blockedUsers: firebase.firestore.FieldValue.arrayUnion(blockedUserId)
    }, {merge: true});
    await blockedUserRef.set({
      blockedUsers: firebase.firestore.FieldValue.arrayUnion(user.uid)
    }, {merge: true});
  } catch (err) {
    console.log("Error code ", err);
  }
}

export async function checkIfBlocked(blockedUserId) {
  try {
    const user = firebase.auth().currentUser;
    const currUserRef = db.collection("blocked").doc(user.uid);
    await currUserRef.get().then((doc) => {
      if (doc.exists) {
        if (doc.data().blockedUsers.indexOf(blockedUserId) !== -1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    })
  } catch (err) {
    console.log("Error code ", err);
  }
}
