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
  Left,
  Spinner
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
    fetchPosts().then(posts => {
      this.setState({ posts: posts });
    });
  }

  renderPosts() {
    let counter = 1;
    return this.state.posts.map(item => (
      <BulletinPost key={counter++} postInfo={item} />
    ));
  }

  render() {
    console.log('this state bullet posts', this.state);
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.posts.length >= 1 ? (
            this.renderPosts()
          ) : (
            <Spinner color="white" />
          )}
          {/* <BulletinPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/dog'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/bunny'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/cat'} /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: '#242424'
  }
});
