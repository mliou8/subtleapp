import React from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
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
  Left
} from 'native-base';
import BulletinPost from 'app/components/board/BulletinPost';

export default class BulletinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/dog'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/bunny'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/cat'} />

          <View />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
