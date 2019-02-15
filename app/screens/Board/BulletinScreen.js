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
import { fetchPosts } from 'db/bulletin/index';

export default class BulletinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: ''
    };
  }

  componentDidMount() {
    fetchPosts().then((posts) => {
      this.setState({posts: posts})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/dog'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/bunny'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/cat'} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingLeft: 3,
    paddingRight: 3,
  }
});
