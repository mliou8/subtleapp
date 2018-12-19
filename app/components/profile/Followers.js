import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import { Icon } from "expo";

export default class Followers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      following: this.props.following
    };
    // this.resetState = this.resetState.bind(this);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> Followers: 500 </Text>
        <Text> Following: 400 </Text>
        <TouchableOpacity style={{ paddingLeft: 10 }}>
          <Icon.Ionicons
            style={{ justifyContent: "flex-end" }}
            name={"ios-send"}
            size={15}
            title="messages"
          >
            <Text> Message User </Text>
          </Icon.Ionicons>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ justifyContent: "center" }}> */}
        <View style={{ justifyContent: "center" }}>
          {this.state.following ? (
            <TouchableOpacity
              onPress={() => console.log("make the yellow go away")}
              style={{ borderRadius: 8, backgroundColor: "dodgerblue" }}
            >
              <Icon.Ionicons
                name={"ios-add-circle"}
                size={15}
                title="follow"
                style={{ color: "white" }}
              >
                <Text style={{ color: "white" }}> Start Following </Text>
              </Icon.Ionicons>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => console.log("make the yellow go away")}
              style={{
                borderRadius: 8,
                flexDirection: "row",
                padding: 1
              }}
            >
              <Text> Following: </Text>
              <Icon.FontAwesome
                name={"check-circle"}
                size={15}
                title="messages"
                style={{ color: "dodgerblue" }}
              />
            </TouchableOpacity>
          )}
          {/* </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  button: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#D3D3D3",
    marginRight: 8
  }
});
