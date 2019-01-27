import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
} from 'native-base';

import Post from 'app/components/dating/Post';

export default class DatingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handlePress = this.handlePress.bind(this)
  }

  fetchDatingStuff() {
    // url
    // ig handle
    // Text
    // like count
    // comments and comment count
  }

  handlePress() {
    console.log("this.props ", this.props.navigation)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('DatingFullScreen')
          }
          >
          <Post/>
        </TouchableOpacity>
          <Post></Post>
          <Post></Post>
          <Post></Post>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    }
});
