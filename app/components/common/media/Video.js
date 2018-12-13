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
      <View>
        <Video
          source={{
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
          }}
          rate={1.0}
          muted={true}
          resizeMode="cover"
          shouldPlay
          isLooping={this.props.loop || false}
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
