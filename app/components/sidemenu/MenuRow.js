import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';

import { Icon } from 'native-base';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class MenuRow extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(this.props.screen);
        }}
      >
        <View style={styles.container}>
          <View style={styles.icon}>
            <Icon
              type="FontAwesome"
              name={this.props.icon}
              style={styles.icon}
            />
          </View>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 20,
    marginTop: 20,
    marginBottom: 20
  },
  icon: { fontSize: 20, color: 'white' },
  text: {
    fontSize: 15,
    fontFamily: 'poppins',
    color: 'white'
  }
});
