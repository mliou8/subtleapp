import firebase from "./firebase";
require("firebase/firestore");

const mySettings = { timestampsInSnapshots: true };
var db = firebase.firestore();

db.settings(mySettings);

export default db;
