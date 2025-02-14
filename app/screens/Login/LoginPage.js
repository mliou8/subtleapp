
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import Dialog from "react-native-dialog";
import firebase from 'db/firebase';
import { Button, Icon, Text } from 'native-base';
import db from 'db/firestore';
import { doesUserExist, logUserIn, createUser } from 'app/actions/login';
import store from 'app/redux/';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      modalOpen: false,
      errorMessage: null,
      initialized: false,
      inviteCode: ""
    };
    this.closeModal = this.closeModal.bind(this);
    this.submitInput = this.submitInput.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        doesUserExist(user).then(exists => {
          if (exists) {
            store.dispatch(logUserIn(user));
          } else {
            this.setState({ ...this.state, initialized: true, errorMessage: null });
            this.props.navigation.navigate("InviteCodePage");
          }
        });
      } else {
        this.setState({ ...this.state, initialized: true });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.setState({ ...this.state, authenticated: true });
      this.props.navigation.navigate('MainScreen');
    }
  }

  async facebookLogin() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      config.fbAppID,
      {
        permissions: ['public_profile', 'email']
      }
    );

    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase.auth().signOut();
      await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    } else {
      this.setState({ ...this.state, errorMessage: 'Facebook Login Failed.' })
    }
  }

  async submitInput() {
    const inviteRef = db.collection('codes').doc(this.state.inviteCode);
    const user = firebase.auth().currentUser;
    const dbCode = inviteRef.get();

    if (dbCode.exists) {
      await inviteRef.update({
        usersUsed: firebase.firestore.FieldValue.arrayUnion(user.uid)
      });
      this.setState({ ...this.state, modalOpen: false });
      store.dispatch(createUser(user));
    } else {
      this.setState({ ...this.state, errorMessage: "Wrong invite code. Please try again." });
    }
  }

  closeModal() {
    this.setState({ ...this.state, modalOpen: false });
  }

  render() {
    if (!this.state.initialized) {
      return <View></View>
    } else {
      return (
        <SafeAreaView style={styles.container}>
        <Image
          source={{uri: 'assets/videos/stevenyuen.gif'}}
          style={styles.backgroundVideo}
        />
          <View style={{flex:1, flexDirection:'column'}}>
            <View style={{flexGrow: 1}}></View>
            <Button
              rounded
              iconLeft
              block
              style={styles.loginButton}
              color="white"
              onPress={() => this.facebookLogin()}
            >
              <Icon
                name="facebook-with-circle"
                type="Entypo"
                style={{ color: 'white', fontSize: 30 }}
              />
              <Text style={styles.loginButtonText}>Sign in with Facebook</Text>
            </Button>

            {/*
            <Button
              rounded
              block
              iconLeft
              title={'Just take me in with no sign in'}
              onPress={() => {
                this.props.navigation.navigate('MainScreen');
              }}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>take me in without signing in </Text>
            </Button>*/}
          </View>
        </SafeAreaView>
      );
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
  fbIcon: {
    display: 'flex',
    marginBottom: 30
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  loginButton: {
    marginBottom: 30
  }
});
