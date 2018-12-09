import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Post from '../../components/board/Post';
import BoardHeader from '../../components/board/BoardHeader';
const post = {};

export default class BoardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Subtle Asian App',
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      showChallenge: false,
      filterType: 'popular',
      loggedIn: "false",
    }  
    this._showChallenge = this._showChallenge.bind(this);
    this.filterContent = this.filterContent.bind(this);
    this.navigateToFullPost = this.navigateToFullPost.bind(this);
  }
  componentDidMount() {
    this.props.navigation.setParams({ showChallenge: this._showChallenge });
  }
  
  _showChallenge = () => {
    this.setState({showChallenge: !this.state.showChallenge});
  }
  
  navigateToFullPost = (post) => {
    this.props.navigation.navigate('Post', { post: post })
  }

  filterContent = (filter) => {
    this.setState({filterType: filter});
  }
  
  render() {
    if (this.state.loggedIn) {
      return (
        <LandingPage></LandingPage>
      )
    } else {      
      return (
        <View style={styles.container}>
        <BoardHeader setFilter={this.filterContent} />
        <ScrollView
          contentContainerStyle={styles.postContainer}>
          <TouchableOpacity
            onPress={()=> this.navigateToFullPost(post)}>
              <Post 
                imageSrc={'https://loremflickr.com/176/230/cat'}
                /> 
            </TouchableOpacity>
          <Post
            imageSrc={'https://loremflickr.com/176/230/cat'}
            />
          <Post
            imageSrc={'https://loremflickr.com/176/230/cat'}
            />
          <Post
            imageSrc={'https://loremflickr.com/176/230/cat'}
            />
            <Post
              imageSrc={'https://loremflickr.com/176/230/cat'}
              />
            <Post
              imageSrc={'https://loremflickr.com/176/230/cat'}
              />
              <Post
                imageSrc={'https://loremflickr.com/176/230/cat'}
                />
              <Post
                imageSrc={'https://loremflickr.com/176/230/cat'}
                />
            </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  postContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
