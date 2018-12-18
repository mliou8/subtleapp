import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  // Text,
  TouchableOpacity,
  View
} from "react-native";
// import { Icon } from "expo";
import Post from "app/components/board/Post";
import BoardHeader from "app/components/board/BoardHeader";
import LandingPage from "app/screens/Login/LandingPage";
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
} from "native-base";

const post = {};
const catArr = [
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat",
  "https://loremflickr.com/176/230/cat"
];

export default class BoardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Subtle Asian App",
      headerRight: (
        <Button transparent onPress={() => navigation.navigate("Messages")}>
          <Icon
            type="Entypo"
            name="mail-with-circle"
            style={{ color: "black", fontSize: 30 }}
          />
        </Button>
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
    this._login = this._login.bind(this);
  }
  componentDidMount() {
    this.props.navigation.setParams({ showChallenge: this._showChallenge });
  }

  _login() {
    this.setState({ loggedIn: true });
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

  render() {
    return (
      <View style={styles.container}>
        <BoardHeader setFilter={this.filterContent} />
        {/* <ScrollView contentContainerStyle={styles.postContainer}> */}
        <ScrollView>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Mosaic", { cats: catArr })
            }
          >
            {/* //onPress={() => this.navigateToFullPost(post)}> */}
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
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },

  postContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});
