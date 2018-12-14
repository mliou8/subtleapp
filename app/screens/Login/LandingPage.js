import React from "react";
import Video from "app/components/common/media/Video";
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView, Image, } from 'react-native';
import VideoUrl from 'assets/videos/video.mp4';
import {signUpUser} from 'actions/login';


export default class LandingPage extends React.Component {
  constructor(props) {
    super(props)
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
        onPress={() => signUpUser()}/>
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
