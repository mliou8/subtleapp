import * as firebase from "firebase";
import '@firebase/firestore';
import config from "../config";

firebase.initializeApp(config.firebaseConfig);
const db = firebase.firestore().settings({ timestampsInSnapshots: true });

export default dbObj = {
  firebase : firebase,
  db : db,
}
