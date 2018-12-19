import firebaseObj from "db/firebase";
const db = firebaseObj.db

export async function createUser(user) {
  const { uid, someothervariables } = user;
  const newUser = {
    profilePhoto: profileUrl,
    name: firstName,
  }
  firebase.collection("users").doc(uid).set(newUser);
}

export async function fetchUser(uid) {
  const uid2 = "wXljG5fAco27EmudBCal";
  const docRef = db.collection("users").doc(uid2);
  
  docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          console.log("Document data doesn't exist.")
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}

export function fetchFollowers(uid) {
    
}

export function fetchFollowing(uid) {
  
}

export function fetchNetworks(uid) {
  
}

export function updateNetworks(uid) {
  
}
 // 
 // 
 //       const remoteUri = await this.uploadPhotoAsync(reducedImage);
 //       this.collection.add({
 //         text,
 //         uid: this.uid,
 //         timestamp: this.timestamp,
 //         imageWidth: width,
 //         imageHeight: height,
 //         image: remoteUri,
 //         user: getUserInfo(),
 //       });
 //     } catch ({ message }) {
 //       alert(message);
 //     }
 //   };
 // }
 
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