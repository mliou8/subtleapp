import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native';
import Video from '../../components/common/media/Video';
import VideoUrl from '../../assets/videos/video.mp4';


export default class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the log in page</Text>
        <Video 
          videoSrc={videoUrl}
          isLooping={true}
        />
      <Button
        title={'Log into Facebook'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
