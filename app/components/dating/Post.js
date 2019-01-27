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

import {
  MaterialIcons,
} from '@expo/vector-icons';


export default class Post extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
        <Card style={styles.post}>
          <CardItem cardBody style={styles.cardItem}>
            <Image
              source={{uri: 'https://placeimg.com/180/200/people'}}
              style={styles.cardImage}
            />
            <CardItem style={styles.cardItem}>
              <Text style={styles.handle}>@Handle</Text>
              <Text style={styles.caption}>Caption and text / OK ATTENTION everyone this is a
              beautiful person and blah blah blah blah blah </Text>
            </CardItem>
          <CardItem style={styles.actionIcons}>
            <Button small transparent style={{paddingBottom: 0}}>
              <MaterialIcons
                style={styles.icon}
                color="black"
                name="chat"
                />
            </Button>
            <Button small transparent style={{paddingBottom: 0}}>
              <Icon
                style={styles.icon}
                type="FontAwesome"
                name="heart-o"
                />
            </Button>
          </CardItem>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    display: "flex",
    flexDirection: "column",
    width: 190,
    marginBottom: 20,
    paddingBottom: 5,
  },
  cardImage: {
    height: 160,
    width: 190,
    resizeMode: "stretch"
  },
  cardItem: {
    display: "flex",
    flexDirection: "column",
  },
  actionIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderTopWidth: .5,
    borderTopColor: 'lightgrey',
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    fontSize: 20,
    color: "black",
    margin: 0,
  },
  handle: {
    fontSize: 12,
  },
  caption: {
    fontSize: 12,
  }
});
