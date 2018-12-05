// Load the module
 
import Video from 'react-native-video';
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

export default class MatchScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <View>
       <Video source={{uri:"https://ak7.picdn.net/shutterstock/videos/1008125017/preview/stock-footage-a-cartoon-man-in-the-office-wants-to-eat-orders-the-food-on-web-site-the-cook-prepares-food-the.webm"}}  
              ref={(ref) => {
                this.player = ref
              }}                                     
              style={styles.backgroundVideo} />
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
