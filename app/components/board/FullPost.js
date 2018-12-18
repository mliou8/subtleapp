import React from "react";
import { Image, StyleSheet, View } from "react-native";
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
  Right
} from "native-base";

export default class FullPost extends React.Component {
  render() {
    return (
      <View>
        <Card fullWidth style={{ marginLeft: 5, marginRight: 5 }}>
          <CardItem cardBody style={{ justifyContent: "center" }}>
            <Image
              source={{ uri: this.props.imageSrc }}
              style={{
                width: 176,
                height: 230,
                resizeMode: "contain"
              }}
            />
          </CardItem>
          <CardItem
            style={{
              display: "flex",
              height: 100,
              width: null,
              flex: 1,
              alignContent: "center"
            }}
          >
            <Body
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap"
              }}
            >
              <Text style={{ fontSize: 15 }}>
                some quote about the text above [...(clickable)]
              </Text>
              <Text style={{ fontSize: 20, color: "coral" }}>@postAuthor</Text>
            </Body>
            <Right>
              <Button small transparent>
                <Icon
                  style={{ fontSize: 25, color: "coral" }}
                  active
                  name="chatbubbles"
                >
                  <Text style={{ fontSize: 10 }}> 4 </Text>
                </Icon>
              </Button>
              <Button small transparent>
                <Icon
                  style={{ fontSize: 25, color: "magenta" }}
                  active
                  name="thumbs-up"
                >
                  <Text style={{ fontSize: 10 }}> 12 </Text>
                </Icon>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    display: "flex",
    width: 174,
    height: 225,
    borderRadius: 7,
    marginBottom: 10
  }
});
