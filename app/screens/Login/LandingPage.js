import React from 'react';
import Video from 'app/components/common/media/Video';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Alert
} from 'react-native';
import VideoUrl from 'assets/videos/video.mp4';

import firebase from 'db/firebase';
import { Button, Icon, Text } from 'native-base';
import { connect } from 'react-redux';

import db from 'db/firestore';

import { facebookLogin, fetchUserInfo } from 'actions/login/index';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        Alert.alert(`Hey! ${user.displayName}`);
        this.props.fetchUserInfo(user.uid);
        this.props.navigation.navigate('MainScreen', {
          displayName: user.displayName
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Video
          videoSrc={VideoUrl}
          loop={true}
          videoStyle={styles.backgroundVideo}
          muted={true}
        />
        <Button
          rounded
          iconLeft
          bordered
          light
          color="white"
          onPress={() => this.props.facebookLogin()}
        >
          <Icon
            name="facebook-with-circle"
            type="Entypo"
            style={{ color: 'white', fontSize: 30 }}
          />
          <Text> Login with facebook </Text>
        </Button>
        <Button rounded iconLeft bordered light style={{ marginTop: 10 }}>
          <Icon
            name="email"
            type="MaterialIcons"
            style={{ color: 'white', fontSize: 30 }}
          />
          <Text> Login with email </Text>
        </Button>
        <Button
          rounded
          iconLeft
          bordered
          light
          title={'Just take me in with no sign in'}
          onPress={() => {
            this.props.testLogin();
            this.props.navigation.navigate('MainScreen');
          }}
          style={{ backgroundColor: 'white', marginTop: 10 }}
        >
          <Text style={{ color: 'black' }}>take me in without signing in </Text>
        </Button>
      </View>
    );
  }
}
{
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    authenticated: state.login.authenticated,
    userRegistered: state.login.userRegistered,
    userInfo: state.login.userInfo,
    login: state.login
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: () => {
      dispatch(facebookLogin());
    },
    createUserProfile: userInfo => {
      dispatch(createUserProfile(userInfo));
    },
    fetchUserInfo: uid => {
      dispatch(fetchUserInfo(uid));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  }
});
