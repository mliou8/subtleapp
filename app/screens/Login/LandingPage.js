import React from "react";
import Video from "app/components/common/media/Video";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Alert
} from "react-native";
import VideoUrl from "assets/videos/video.mp4";
import { Entypo } from "@expo/vector-icons";
import dbObj from "db/firebase";
const { firebase } = dbObj;

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        Alert.alert(`user name is ${user.displayName}`);
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
        <Entypo
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
        />
      </View>
    );
  }
}

{
  /* <Button
style={{
  marginTop: 2
}}
onPress={() =>
  this.props.navigation.navigate("AddSocialNetwork")
}
>
<Icon type="FontAwesome" name="plus-circle" />
</Button> */
}
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
