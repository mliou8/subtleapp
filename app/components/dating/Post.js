import React from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";
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
  Fab
} from "native-base";

export default class Post extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Card style={styles.post}>
        <CardItem>
          <Left>
            <Thumbnail small source={{ uri: this.props.imageSrc }} />
            <Body>
              <Text>@PostAuthor</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{ uri: this.props.imageSrc }}
            style={{
              display: "flex",
              height: 120,
              width: 160,
              alignContent: "center"
            }}
          />
        </CardItem>

        <CardItem>
          <Left>
            <Button small transparent>
              <Icon active style={{ fontSize: 15 }} name="thumbs-up" />
              <Text style={{ fontSize: 6 }}>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button small transparent>
              <Icon active style={{ fontSize: 15 }} name="chatbubbles" />
              <Text style={{ fontSize: 6 }}>4 Comments </Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    display: "flex",
    width: 80,
    height: 130,
    borderRadius: 7,
  }
});
