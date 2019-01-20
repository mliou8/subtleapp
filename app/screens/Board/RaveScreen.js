import React from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
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
} from 'native-base';

export default class RaveScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Subtle Asian App',
      headerRight: (
        <Button transparent onPress={() => navigation.navigate('Messages')}>
          <Icon
            type="Entypo"
            name="mail-with-circle"
            style={{ color: 'black', fontSize: 30 }}
          />
        </Button>
      ),
      headerLeft: (
        <Icon
          type="FontAwesome"
          name="align-left"
          style={{ marginLeft: 10 }}
        />
        )
    };
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
      	<Text>Set up Rave Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
