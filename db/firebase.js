import * as firebase from 'firebase';
import config from '../config'

firebase.initializeApp(config.firebaseConfig);

export default firebase