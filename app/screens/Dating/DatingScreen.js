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
          <View style={styles.container}>
            <Post navigation={this.props.navigation}/>
            <Post navigation={this.props.navigation}/>
            <Post navigation={this.props.navigation}/>
            <Post navigation={this.props.navigation}/>
            <Post navigation={this.props.navigation}/>
            <Post navigation={this.props.navigation}/>
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
      paddingLeft: 7,
      paddingRight: 7,
      justifyContent: 'space-between',
    },
});
