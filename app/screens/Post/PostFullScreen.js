import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native';
import Video from 'app/components/common/media/Video';
const videoUrl = "https://ak7.picdn.net/shutterstock/videos/1008125017/preview/stock-footage-a-cartoon-man-in-the-office-wants-to-eat-orders-the-food-on-web-site-the-cook-prepares-food-the.webm"

export default class PostFullScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Video></Video>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
