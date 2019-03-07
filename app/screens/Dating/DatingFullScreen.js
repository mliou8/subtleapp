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

import {
  MaterialIcons,
} from '@expo/vector-icons';


export default class DatingFullScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderTextPost = this.renderTextPost.bind(this);
    this.renderImages = this.renderImages.bind(this);
  }

  renderTextPost() {
    const post = this.props.navigation.getParam('post');
    if (post.text) {
      const formatStr = post.text.slice(1, post.text.length - 1);
      const splitString = formatStr.split('\\n');
      return splitString.map(function(item, idx) {
        return (
          <Text key={idx}>
            {item}{"\n"}
          </Text>
        )
      })
    }
  }

  renderImages() {
    const post = this.props.navigation.getParam('post');
    if (post.photoRef) {
      return post.photoRef.map((photo, idx) => {
        return (
          <Image
            key={idx}
            source={{uri: photo}}
            style={styles.cardImage}
            />
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
            { this.renderImages() }
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
