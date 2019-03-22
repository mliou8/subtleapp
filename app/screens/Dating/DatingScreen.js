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

import DatingPost from 'app/components/dating/DatingPost';

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
  }

  renderPosts() {
    if (!this.props.posts) {
        return <View />
    } else {
        return this.props.posts.map((post, idx) => {
          return (
            <DatingPost
              key={idx}
              data={post}
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
        <ScrollView>
          {this.renderPosts()}
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
      backgroundColor: '#DCDCDC'
    },
});
