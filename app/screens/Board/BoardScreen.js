import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Icon } from "expo";
import Post from "app/components/board/Post";
import BoardHeader from "app/components/board/BoardHeader";
import LandingPage from "app/screens/Login/LandingPage";

const post = {};

export default class BoardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Subtle Asian App",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
          <Icon.Entypo
            name={"mail-with-circle"}
            size={30}
            style={{ marginRight: 3 }}
            title="messages"
          />
        </TouchableOpacity>
      )
    };
  };
  
  constructor(props) {
    super(props);
    this.state = {
      showChallenge: false,
      filterType: "popular",
      loggedIn: false
    };
    
    this._showChallenge = this._showChallenge.bind(this);
    this.filterContent = this.filterContent.bind(this);
    this.navigateToFullPost = this.navigateToFullPost.bind(this);
    this.showLoggedIn = this.showLoggedIn.bind(this);
  }
  
  componentDidMount() {
    this.props.navigation.setParams({ showChallenge: this._showChallenge });
  }

  _showChallenge = () => {
    this.setState({ showChallenge: !this.state.showChallenge });
  };

  navigateToFullPost = post => {
    this.props.navigation.navigate("Post", { post: post });
  };

  filterContent = filter => {
    this.setState({ filterType: filter });
  };
  
  showLoggedIn () {
    if (this.props.authenticated) {
      Alert.alert("You are logged in");
    } else {
      Alert.alert("You are not logged in");
    }
  }

  render() {
      return (
        <View style={styles.container}>
          <BoardHeader setFilter={this.filterContent} />
          { this.showLoggedIn() }
          <ScrollView contentContainerStyle={styles.postContainer}>
            <TouchableOpacity onPress={() => this.navigateToFullPost(post)}>
              <Post imageSrc={"https://loremflickr.com/176/230/cat"} />
            </TouchableOpacity>
            <Post imageSrc={"https://loremflickr.com/176/230/cat"} />
            <Post imageSrc={"https://loremflickr.com/176/230/cat"} />
            <Post imageSrc={"https://loremflickr.com/176/230/cat"} />
            <Post imageSrc={"https://loremflickr.com/176/230/cat"} />
            <Post imageSrc={"https://loremflickr.com/176/230/cat"} />
            <Post imageSrc={"https://loremflickr.com/176/230/cat"} />
            <Post imageSrc={"https://loremflickr.com/176/230/cat"} />
          </ScrollView>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  postContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});
