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
  constructor() {
    super();
  }
  render() {
    return (
        <Card style={styles.post}>
          <Text>Dating Full Screen</Text>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    display: "flex",
  }
});
