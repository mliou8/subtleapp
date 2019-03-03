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
    this.renderImage = this.renderImage.bind(this)
  }

  renderImage () {
    if (this.props.data.photoRef) {
      return this.props.data.photoRef.map((photo, idx) => {
        console.log("IDX is ", idx)
        if (idx === 1) {
        return (
          <Image
            key={idx}
            source={{uri: photo}}
            style={styles.cardImage}
            />
        )
        }
      })
    }
  }

  render() {
    const { title = '', text = '', expiryDate = '', photoRef = ''} = this.props.data;
    const { propStyles = {} } = this.props;
    const photoUrl = photoRef[0];
    console.log("this image has trouble rendering !", photoUrl);
    return (
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DatingFullScreen', {post: this.props.data}) }
            >
          <Card style={{paddingTop: 0}}>
            <CardItem
              style={styles.post}>
                { this.renderImage() }
                <Text style={styles.title}>{title}</Text>
                <Text numberOfLines={3} style={styles.text}>
                  {text.replace(/"/g,"")}
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
  },
  cardImage: {
    resizeMode: 'cover',
    height: 210,
    width: 170,
    flex: 1
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
  text: {
    fontSize: 11,
    alignSelf: "flex-start"
  },
  caption: {
    fontSize: 12,
    overflow: "hidden",
    marginBottom: 10,
  }
});
