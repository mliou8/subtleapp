import firebase from 'db/firebase'

export async function emailLogin (email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const userId = firebase.auth().currentUser.uid;
    return userId + '';
};

export async function facebookLogin () {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(config.fbAppID, {
    permissions: ['public_profile', 'email', 'user_friends'],
  });

  if (type === 'success') {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    try {
      await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    } catch (error) {
      console.log('cannot login ', error);
    }
  } else {
    Alert.alert('Hey sorry');
  }
};

function authUser() {
  console.log("Authenticating the User")
  return {
    type: AUTH_USER
  }
}
