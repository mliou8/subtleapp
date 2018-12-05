'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Card extends React.Component {
  render() {
    const { handle = '', type = '', followCount = '', images} = this.props;
    return (
      <View style={styles.card}>
       <Image style={styles.thumbnail} source={{uri: images[0]}} />
       <View style={styles.bioContainer}>
        <Text style={styles.handle}>{handle}</Text>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.followCount}>Followers: {followCount}</Text>
       </View>
     </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  bioContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  handle: {
    fontSize: 15,
  },
  type: {
    fontSize: 15,
  },
  followCount: {
    fontSize: 15,
  },
})