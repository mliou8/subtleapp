import React from "react";
import Video from "app/components/common/media/Video";
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView, Image, } from 'react-native';
import VideoUrl from 'assets/videos/video.mp4';
const expoAppID = '1789703297808706';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.logIn = this.logIn.bind(this);
  }
  
    async logIn() {
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Expo.Facebook.logInWithReadPermissionsAsync(expoAppID, {
          permissions: ['public_profile', 'email'],
      });
      
    if (type === 'success') {
      alert("Success")
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    console.log(`Facebook Login Error: ${message}`);
  }
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
      <Button
        title={'Log into Facebook'} 
        onPress={() => this.logIn()}/>
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
