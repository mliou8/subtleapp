import React from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";

export default class DatingPhoto extends React.Component {
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
            source={"https://placeimg.com/120/160/people"}
            style={styles.cardImage}
          />
        </CardItem>
        <CardItem>
          <Text>@Handle</Text>
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
    width: 250,
    height: 150,
    borderRadius: 7,
  }
});
