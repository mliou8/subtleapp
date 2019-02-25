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
  constructor(props) {
    super(props);
  }

  render() {
    const { title = '', text = '', expiryDate = ''} = this.props.data;
    return (
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DatingFullScreen') }
            style={styles.post}>
          <Card style={{paddingTop: 0}}>
            <CardItem
              style={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: 0,
                height: 250,
              }}>
              <Image
                source={{uri: 'https://loremflickr.com/165/180/cat'}}
                style={styles.cardImage}
              />
                  <Text style={styles.title}>{title}</Text>
                  <Text numberOfLines={3}>
                    {text}
                  </Text>
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
          </Card>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    flexDirection: "column",
    width: 170,
    paddingTop: 0,
    height: 280,
    marginRight: 5
  },
  cardImage: {
    height: 180,
    width: 165,
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
    paddingTop: 5,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  icon: {
    fontSize: 20,
    color: "black",
    margin: 0,
  },
  title: {
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },
  caption: {
    fontSize: 12,
    overflow: "hidden",
    marginBottom: 10,
  }
});
