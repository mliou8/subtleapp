import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
//import { Icon } from 'expo';

import { Button, Icon, Text } from 'native-base';
export default class SubmitScreen extends Component {
  navigate = screen => {
    this.props.navigation.navigate(screen);
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Post',
      headerStyle: { backgroundColor: '#242424', height: 80 },

      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 20
      }
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.navigate('SubmitContent')}
        >
          <Icon name="add-a-photo" type="MaterialIcons" size={55} />
          <Text>Post Content</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.navigate('SubmitDating')}
        >
          <Icon name="account-heart" type="MaterialCommunityIcons" size={55} />
          <Text>Hot Stunna</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'center'
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
