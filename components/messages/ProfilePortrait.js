import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Message extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.portrait} source={{uri:this.props.imageSrc}} alt="Avatar"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  portrait: {
    borderRadius: 30,
    width: 60,
    height: 60,
  }
})