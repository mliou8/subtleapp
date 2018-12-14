import firebase from 'db/firebase';

function configureProvider () {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  provider.addScope('user_friends');
  firebase.auth().useDeviceLanguage();
  provider.setCustomParameters({
    'display': 'popup'
  });
  return provider;
}


export function signUpUser(credentials) { 
  const provider = configureProvider();
  return firebase.auth().signInWithRedirect(provider).then(function(result) {
        const token = result.credential.accessToken;
        const user = result.user;
      }).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
}

export function authUser() {
  console.log("Authenticating the User")
  return {
    type: AUTH_USER
  }
}
// export function signInUser(credentials) {
//   return function(dispatch) {
//     Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
//       .then(response => {
//         dispatch(authUser());
//         dispatch(fetchUserData());
//       })
//       .then(response => {
//         browserHistory.push('/matchpage');
//       })
//       .catch(error => {
//         dispatch(authError(error));
//       });
//   }
// }

// export function signOutUser() {
//   Firebase.auth().signOut();
//   browserHistory.push('/');
// 
//   return {
//     type: SIGN_OUT_USER
//   }
// }