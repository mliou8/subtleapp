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
      <View>
      	<Text>Set up Dating Screen</Text>
        <Post></Post>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
