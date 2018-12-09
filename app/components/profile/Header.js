import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Header extends React.Component {
  render() {
    this.state = {
      type: 'Instagrammer',
      handle: '@heyitsmmike',
      followCount: '700',
    }
    return (
      <View style={styles.container}>
        <Text style={styles.handle}>{this.state.handle}</Text>
        <Text style={styles.type}>{this.state.type}</Text>
        <Text>Follow Count: {this.state.followCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  handle: {
    color: 'red',
  },
  type: {
    fontWeight: 'bold',
  }
})