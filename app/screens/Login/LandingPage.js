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
import DialogInput from 'react-native-dialog-input';
import firebase from 'db/firebase';
import { Button, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import db from 'db/firestore';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: this.props.modalOpen,
      inviteError: this.props.inviteError,
    };
    this.closeModal = this.closeModal.bind(this);
    this.submitInput = this.submitInput.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.authenticated) {
      Alert.alert(`Welcome back!`);
      this.props.navigation.navigate('MainScreen');
    }
    if (this.props.modalOpen === true && !prevProps.modalOpen) {
      this.setState({modalOpen: this.props.modalOpen});
    }
    if (prevProps.modalOpen == true && !this.props.modalOpen) {
      this.setState({modalOpen: this.props.modalOpen});
    }
    if (!prevProps.inviteError && this.props.inviteError) {
      this.setState({inviteError: this.props.inviteError});
    }
  }
  
  submitInput(input) {
    this.props.checkCode(input);
  }
  
  closeModal() {
    this.setState({modalOpen: false});
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
        <Text>Login with Facebook</Text>
        </Button>
        <DialogInput isDialogVisible={this.state.modalOpen}
          title={"Please Enter Invite Code"}
          hintInput={this.state.inviteError ? 'Please Try Again' : 'Invite Code'}
          submitInput={(inputText) => {this.submitInput(inputText)}}
          closeDialog={() => {this.closeModal()}}>
        </DialogInput>
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
