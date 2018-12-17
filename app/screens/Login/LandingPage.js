import React from "react";
import Video from "app/components/common/media/Video";
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  Image
} from "react-native";
import VideoUrl from "assets/videos/video.mp4";
import FacebookLoginButton from "components/login/FacebookLoginButton";
import {
  testFB,
  facebookSignup,
  facebookAuth,
  facebookLogin
} from "actions/login";
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
  Spinner
} from "native-base";
// import { Entypo } from "@expo/vector-icons";

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const str = "some string";
    return (
      <View style={styles.container}>
        <Video
          videoSrc={VideoUrl}
          loop={true}
          videoStyle={styles.backgroundVideo}
        />
        <Button
          transparent
          rounded
          bordered
          light
          color="black"
          onPress={() => facebookLogin()}
        >
          <Icon
            type="Entypo"
            name="facebook-with-circle"
            size={64}
            color="black"
            onPress={() => facebookLogin()}
            // style={styles.fbIcon}
          />
          <Text>Login </Text>
        </Button>
        <Button
          transparent
          rounded
          bordered
          light
          color="black"
          onPress={() => facebookLogin()}
        >
          <Icon
            type="Entypo"
            name="facebook-with-circle"
            size={64}
            color="black"
            onPress={() => facebookLogin()}
            style={styles.fbIcon}
          />
          <Text>Login </Text>
        </Button>
        {/* <Entypo
          name="facebook-with-circle"
          size={64}
          color="black"
          onPress={() => facebookLogin()}
          style={styles.fbIcon}
        /> */}
        <Button
          large
          rounded
          style={{ backgroundColor: "white" }}
          title="Just take me in with no sign in"
          onPress={() => this.props.navigation.navigate("MainScreen")}
        >
          <Text
            style={{
              color: "black"
            }}
          >
            Just take me in with no sign in
          </Text>
        </Button>
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
