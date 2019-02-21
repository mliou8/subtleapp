import React from "react";
import { Image, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
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
  Icon,
  Left,
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
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DatingFullScreen') }
            style={styles.post}>
          <Card>
            <CardItem
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Image
                source={{uri: 'https://loremflickr.com/160/180/cat'}}
                style={styles.cardImage}
              />
                  <Text style={styles.handle}>Title</Text>
                  <Text
                    style={styles.caption}
                    numberOfLines={3}>
                    Caption and text / OK ATTENTION everyone this is a
                    beautiful person and blah blah blah blah blah
                  </Text>
            </CardItem>
            <CardItem
                style={{
                  display: 'flex',
                  flex: 1,
                }}>
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
          </Card>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    flexDirection: "column",
    width: 170,
  },
  cardImage: {
    height: 180,
    width: 160,
    resizeMode: "stretch"
  },
  cardItem: {
    display: "flex",
    flexDirection: "column",
  },
  cardText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "left",
  },
  actionIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderTopWidth: .5,
    borderTopColor: 'lightgrey',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    fontSize: 20,
    color: "black",
    margin: 0,
  },
  handle: {
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: 2,
  },
  caption: {
    fontSize: 12,
    overflow: "hidden",
    marginBottom: 10,
  }
});
