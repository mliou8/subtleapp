import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native';


export default class Achievements extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <View style={styles.container}>
          <Text> This is so far the Achievements View </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'flex-end',
    width: '100%',
  },

});
