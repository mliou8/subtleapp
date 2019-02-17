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
  Button
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
    fetchPosts().then((posts) => {
      this.setState({posts: posts})
      console.log("This state is ", this.state.posts)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <SelfiePost
            imageSrc={'https://loremflickr.com/176/230/cat'}
            caption={'testing'}
          />
          <SelfiePost
            imageSrc={'https://loremflickr.com/176/230/cat'}
            caption={'testing'}
          />
          <SelfiePost
            imageSrc={'https://loremflickr.com/176/230/cat'}
            caption={'testing'}
          />
          <SelfiePost
            imageSrc={'https://loremflickr.com/176/230/cat'}
            caption={'testing'}
          />
          <SelfiePost
            imageSrc={'https://loremflickr.com/176/230/cat'}
            caption={'testing'}
          />
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
  },
  postContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
});
