import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Message extends React.Component {
  render() {
    this.state = {
      hometown: 'Seattle, WA',
      cities: ['LA', 'Seoul', 'Tokyo'],
      bio: 'Hi! I\'m checking out this space',
    }
    return (
      <View style={styles.container}>
        <Text>Hometown: {this.state.hometown}</Text>
        <Text style={styles.cityContainer}>Where to find me: {
          this.state.cities.map((city, idx) => {
            return (
              <Text key={idx} style={styles.city}>#{city}</Text>
            )
          })
        }
        </Text>
        <Text style={styles.bio}>Bio: {this.state.bio}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  cityContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    color: 'blue',
    display: 'flex',
    marginRight: 5,
  },
  city: {
    display: 'flex',
    marginRight: 5,
  }
})