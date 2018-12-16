import React from "react";
import Video from "app/components/common/media/Video";
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView, Image, } from 'react-native';
import VideoUrl from 'assets/videos/video.mp4';
import FacebookLoginButton from 'components/login/FacebookLoginButton';
import { testFB, facebookSignup, facebookAuth, facebookLogin } from 'actions/login';
import { Entypo } from '@expo/vector-icons';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const str = "some string"
    return (
      <View style={styles.container}>
        <Video
          videoSrc={VideoUrl}
          loop={true}
          videoStyle={styles.backgroundVideo}
        /> 
      <Entypo 
        name="facebook-with-circle" 
        size={64} 
        color="black"
        onPress={() => facebookLogin()}
        style={styles.fbIcon}>
      </Entypo>
      <Button
        title={"Just take me in with no sign in"} 
        onPress={() => this.props.navigation.navigate("MainScreen")}/>
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
    justifyContent: 'center',
  },
  fbIcon: {
    display: 'flex',
    marginBottom: 30,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});
