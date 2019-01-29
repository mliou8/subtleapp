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
  Icon,
  Left,
} from "native-base";

import { fetchPost } from 'db/dating/index';


import {
  MaterialIcons,
} from '@expo/vector-icons';


export default class DatingFullScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      post: {}
    }
    this.renderTextPost = this.renderTextPost.bind(this);
  }

  componentDidMount() {
    const hardCodedID = "JvDf92I7AbkQEt4MXLxe";
    fetchPost(hardCodedID).then((post) => {
      this.setState({post: post});
    })
  }

  renderTextPost() {
    if (this.state.post.text) {
      const splitString = this.state.post.text.split('\\n');
      return splitString.map(function(item, idx) {
        return (
          <Text key={idx}>
            {item}{"\n"}
          </Text>
        )
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.mainText}>
            { this.renderTextPost() }
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: 'https://placeimg.com/100/100/people'}}
              style={styles.cardImage}
            />
            <Image
              source={{uri: 'https://placeimg.com/100/100/people'}}
              style={styles.cardImage}
            />
            <Image
              source={{uri: 'https://placeimg.com/100/100/people'}}
              style={styles.cardImage}
            />
            <Image
              source={{uri: 'https://placeimg.com/100/100/people'}}
              style={styles.cardImage}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  mainText: {
    display: "flex",
  },
  cardImage: {
    height: 300,
    width: 300,
    marginBottom: 15,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
});
