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
        return user.social; 
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
 