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

import Post from 'app/components/dating/DatingPost';
import DatingRow from 'app/components/dating/DatingRow';

import { fetchPosts } from 'db/dating/index';

export default class DatingScreen extends React.Component {
  static navigationOptions = {
      header: null
   }

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.renderPosts = this.renderPosts.bind(this);
    this.constructPosts = this.constructPosts.bind(this);
  }

  constructPosts() {
    if (this.state.posts.length > 0) {
      const posts = this.state.posts;
      let arr = []
      for (let i = 0; i < posts.length; i += 2) {
        if (i == posts.length - 1) {
          arr.push([posts[i]]);
        } else {
          let postRow = [posts[i], posts[i + 1]];
          arr.push(postRow);
       }
     }
     return this.renderPosts(arr);
   }
  }

  renderPosts(postArr) {
    return postArr.map((posts, idx) => {
      return (
        <DatingRow
          key={idx}
          posts={posts}
          navigation={this.props.navigation}
          style={{alignSelf: 'stretch'}}
        />);
    })
  }

  componentDidMount() {
    fetchPosts().then((posts) => {
      this.setState({posts: posts})
    })
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            {this.constructPosts()}
          </View>
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
      paddingLeft: 4,
      paddingRight: 4,
      justifyContent: 'space-around',
      alignItems:'stretch'
    },
});
