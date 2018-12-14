import Firebase from 'firebase';
import config from '../config'
Firebase.initializeApp(config.firebaseConfig);

export default Firebase;