import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView
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
  }

  fetchDatingStuff() {
    // url
    // ig handle
    // Text
    // like count
    // comments and comment count
  }

  render() {
    return (
      <View style={styles.container}>
          <Post></Post>
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
