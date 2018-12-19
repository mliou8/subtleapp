import firebase from "db/firebase";


export async function createUser(user) {
  const { uid, someothervariables } = user;
  
}

export async function fetchUser(uid) {
  // Upload Data
   uploadPhotoAsync = async uri => {
     const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
     return uploadPhoto(uri, path);
   };

   post = async ({ text, image: localUri }) => {
     try {
       const { uri: reducedImage, width, height } = await shrinkImageAsync(
         localUri,
       );

       const remoteUri = await this.uploadPhotoAsync(reducedImage);
       this.collection.add({
         text,
         uid: this.uid,
         timestamp: this.timestamp,
         imageWidth: width,
         imageHeight: height,
         image: remoteUri,
         user: getUserInfo(),
       });
     } catch ({ message }) {
       alert(message);
     }
   };
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