import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class ProfilePortrait extends React.Component {
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
    borderRadius: 47,
    width: 94,
    height: 94,
  }
})