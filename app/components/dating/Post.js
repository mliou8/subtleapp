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
  Body,
  Icon
} from "native-base";

export default class Post extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Card style={styles.post}>
        <CardItem>
            <Thumbnail small source={{ uri: this.props.imageSrc }} />
            <Body>
              <Text>@PostAuthor</Text>
            </Body>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{uri: 'https://placeimg.com/120/160/people'}}
            style={styles.cardImage}
          />
        </CardItem>
        <CardItem>
            <Text>@Handle</Text>
        </CardItem>
        <CardItem>
            <Text>Caption and text / OK ATTENTION everyone this is a
            beautiful person and blah blah blah blah blah </Text>
        </CardItem>
        <CardItem style={styles.actionIcons}>
          <Button small transparent style={{paddingBottom: 0}}>
            <Icon style={styles.icon} name="chatbubbles" />
          </Button>
          <Button small transparent style={{paddingBottom: 0}}>
            <Icon style={styles.icon} name="heart" />
          </Button>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    display: "flex",
    width: 200,
    height: 300,
    borderRadius: 7,
  },
  actionIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 0,
  },
  icon: {
    fontSize: 25,
    color: "black",
  }
});
