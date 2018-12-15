import React from "react";
import Video from "app/components/common/media/Video";
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView, Image, } from 'react-native';
import VideoUrl from 'assets/videos/video.mp4';
import FacebookLoginButton from 'components/login/FacebookLoginButton';

export default class EmailSignup extends React.Component {
  constructor(props) {
    super(props)
    this.signInFacebook = this.signInFacebook.bind(this)
  }
  
  signInFacebook () {
    // this.props.dispatch(facebookLogin);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the log in page</Text>
        <Video
          videoSrc={VideoUrl}
          isLooping={true}
          style={{ width: "80%", height: "80%" }}
        />
      <FacebookLoginButton
        onPress={() => facebookLogin()}/>
      <Button 
        title={"Title Props "}
        onPress={() => testFB(str)}/>
      <Button
        title={"Just take me in"} 
        onPress={this.props.login}/>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
