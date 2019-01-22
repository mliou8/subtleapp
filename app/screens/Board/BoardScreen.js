import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

import Post from 'app/components/board/Post';
import FullPost from 'app/components/board/FullPost';
import BoardHeader from 'app/components/board/BoardHeader';
import LandingPage from 'app/screens/Login/LandingPage';

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
  Body,
  Right,
  Spinner,
  Badge
} from 'native-base';
import { LinearGradient } from 'expo';

const post = {};
const catArr = [
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat',
  'https://loremflickr.com/176/230/cat'
];

export class BoardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChallenge: false,
      filterType: 'popular',
      loggedIn: false
    };

    this._showChallenge = this._showChallenge.bind(this);
    this.filterContent = this.filterContent.bind(this);
    this.navigateToFullPost = this.navigateToFullPost.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ showChallenge: this._showChallenge });
  }

  _showChallenge = () => {
    this.setState({ showChallenge: !this.state.showChallenge });
  };

  navigateToFullPost = post => {
    this.props.navigation.navigate('Post', { post: post });
  };

  filterContent = filter => {
    this.setState({ filterType: filter });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Mosaic', { cats: catArr })
            }
          >
            {/* //onPress={() => this.navigateToFullPost(post)}> */}
            <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          </TouchableOpacity>
          <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
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
