import React from "react";
import Video from "app/components/common/media/Video";
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView, Image, } from 'react-native';
import VideoUrl from 'assets/videos/video.mp4';
import FacebookLoginButton from 'components/login/FacebookLoginButton';
import { testFB, facebookSignup, facebookAuth, facebookLogin } from 'actions/login';


export default class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.signInFacebook = this.signInFacebook.bind(this)
  }
  
  signInFacebook () {
    // this.props.dispatch(facebookLogin);
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
      <Button 
        title={"facebookLoginOGFunction"}
        onPress={() => facebookLogin()}/>
      <Button
        title={"Just take me in with no sign in"} 
        onPress={this.props.login}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});
