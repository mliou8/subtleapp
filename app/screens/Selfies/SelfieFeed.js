import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import SelfiePost from 'app/components/board/SelfiePost';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Spinner
} from 'native-base';
import { fetchPosts } from 'db/selfies/index';

export default class SelfieFeed extends React.Component {
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
      <SelfiePost
        key={counter++}
        imageSrc={`${item.photoRef}`}
        caption={item.caption}
      />
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.posts.length >= 1 ? (
            this.renderPosts()
          ) : (
            <Spinner color="white" />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
});
