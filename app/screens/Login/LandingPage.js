import React from "react";
import Video from "app/components/common/media/Video";
import {
  ScrollView,
  StyleSheet,
  // Text,
  View,
  // Button,
  SafeAreaView,
  Image,
  Alert
} from "react-native";
import VideoUrl from "assets/videos/video.mp4";
// import { Entypo } from "@expo/vector-icons";
import firebase from "db/firebase";
import { Button, Icon, Text } from "native-base";
import { connect } from "react-redux";

import db from "db/firestore";

import { facebookLogin } from "actions/login/index";
import { createUserProfile, fetchUser } from "actions/profile/index";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        Alert.alert(`user name is ${user.displayName}`);
        console.log("this  props blah store", this.props.profile);
        console.log("this  props login stuff blah store", this.props.login);

        this.props.fetchUser(user.uid);
        // const userInfo= await this.props.fetchUser(user.uid);
        this.props.navigation.navigate("MainScreen");
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Video
          videoSrc={VideoUrl}
          loop={true}
          videoStyle={styles.backgroundVideo}
          muted={true}
        />
        <Button
          rounded
          iconLeft
          bordered
          light
          color="white"
          onPress={() => this.props.facebookLogin()}
        >
          <Icon
            name="facebook-with-circle"
            type="Entypo"
            style={{ color: "white", fontSize: 30 }}
            // color="white"
          />
          <Text> Login with facebook </Text>
        </Button>
        <Button
          rounded
          iconLeft
          bordered
          light
          style={{ marginTop: 10 }}
          // onPress={() => this.props.facebookLogin()}
        >
          <Icon
            name="email"
            type="MaterialIcons"
            style={{ color: "white", fontSize: 30 }}
          />
          <Text> Login with email </Text>
        </Button>
        <Button
          rounded
          iconLeft
          bordered
          light
          title={"Just take me in with no sign in"}
          onPress={() => {
            this.props.testLogin();
            this.props.navigation.navigate("MainScreen");
          }}
          style={{ backgroundColor: "white", marginTop: 10 }}
        >
          <Text style={{ color: "black" }}>take me in without signing in </Text>
        </Button>
      </View>
    );
  }
}
{
  /* <Entypo
          name="facebook-with-circle"
          size={64}
          color="black"
          onPress={() => this.props.facebookLogin()}
          style={styles.fbIcon}
        />
        <Button
          title={"Just take me in with no sign in"}
          onPress={() => {
            this.props.testLogin();
            this.props.navigation.navigate("MainScreen");
          }}
        /> */
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    authenticated: state.login.authenticated,
    userRegistered: state.profile.userRegistered,
    userProfile: state.profile.userProfile,
    profile: state.profile,
    login: state.login
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: () => {
      dispatch(facebookLogin());
    },
    createUserProfile: userInfo => {
      dispatch(createUserProfile(userInfo));
    },
    fetchUser: uid => {
      dispatch(fetchUser(uid));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  fbIcon: {
    display: "flex",
    marginBottom: 30
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
