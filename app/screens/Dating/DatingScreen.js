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
import { fetchPosts } from 'db/dating/index';

export default class DatingScreen extends React.Component {
  static navigationOptions = {
       header: null
   }

  constructor(props) {
    super(props);
    this.state = {
      posts: ''
    };

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
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('DatingFullScreen') }
          style={styles.post}>
          <Post/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('DatingFullScreen') }
          style={styles.post}>
          <Post/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('DatingFullScreen') }
          style={styles.post}>
          <Post/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('DatingFullScreen') }
          style={styles.post}>
          <Post/>
        </TouchableOpacity>
        </ScrollView>
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
      paddingLeft: 3,
      paddingRight: 3,
    },
    post: {
      display: "flex",
      width: 174,
      height: 225,
    }
});
