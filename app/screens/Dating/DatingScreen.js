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
    if (this.props.posts) {
      const posts = this.props.posts;
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
    if (!this.props.posts) {
        return <View />
    } else {
        return postArr.map((posts, idx) => {
          return (
            <DatingRow
              key={idx}
              posts={posts}
              navigation={this.props.navigation}
              />);
            })
    }
  }

  async componentDidMount() {
    const dating = 'dating';
    await this.props.fetchPosts(dating);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
          {this.constructPosts()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      paddingLeft: 6,
      paddingRight: 6,
    },
});
