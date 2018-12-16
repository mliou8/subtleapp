import { Video } from "expo";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.props.videoStyle || styles.defaultStyle}>
        <Video
          source={{
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
          }}
          rate={1.0}
          muted={true}
          resizeMode="cover"
          shouldPlay
          isLooping={this.props.loop || false}
          style={this.props.videoStyle || styles.defaultStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  defaultStyle: {
    width: 300,
    height: 300,
  }
})