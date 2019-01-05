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

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // doesnt work yet
    if (this.props.authenticated) {
      this.props.navigation.navigate('MainScreen');
    }
  }
  componentDidUpdate() {
    const userName = this.props.userInfo.displayName.split(' ');

    if (this.props.authenticated) {
      Alert.alert(`Welcome back ${userName[0]}!`);
      this.props.navigation.navigate('MainScreen');
    }
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
