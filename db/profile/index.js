import firebase from "db/firebase";
import db from "../db";

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

export function addNetwork(networkObj) {
  const userRef = db.collection("users").doc(currentUser.uid);
  const currentUser = currentUser();
  const networkToUpdate = fetchNetworks(currentUser);
  currentNetworks.push(newNetwork);
  return userRef.update({
    socialNetworks: networkToUpdate 
  })
  .then(function() {
    console.log("Document successfully updated!");
    //dispatch action showing edited user
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      //dispatch action showing edited user fail
      // handle error by showing alert and redirecting
      console.error("Error updating document: ", error);
  });
}

export function removeNetwork(networkObj) {
  const userRef = db.collection("users").doc(currentUser.uid);
  const currentUser = currentUser();
  const networkToUpdate = fetchNetworks(currentUser);

  const filteredNetwork = networkToUpdate.filter((networks) => { 
    return networks.type !== networkObj.type; 
  }); 
  
  return userRef.update({
    socialNetworks: filteredNetwork 
  })
  .then(function() {
    console.log("Document successfully updated!");
    //dispatch action showing edited user
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      //dispatch action showing edited user fail
      console.error("Error updating document: ", error);
  });
}
 
// Helpers
function currentUser() {
  var user = firebase.auth().currentUser;
  if (!user) {
    return null;
  } else {
    return user;
  }

}