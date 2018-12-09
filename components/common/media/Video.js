import { Video } from 'expo';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class VideoExtension extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <View>
       <Video source={{uri: this.props.videoSrc}}                            
              rate={1.0}
              muted={true}
              resizeMode="cover"
              shouldPlay
              isLooping={this.props.loop || false}
        />
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
