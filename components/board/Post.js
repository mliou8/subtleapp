import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Message extends React.Component {
  render() {
    return (
        <Image style={styles.post} source={{uri:this.props.imageSrc}} alt="Post"/>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    display: 'flex',
    width: 174,
    height: 225,
    borderRadius: 7,
    marginBottom: 10,
  }
})