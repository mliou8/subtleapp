import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SwipeCard from '../components/matches/SwipeCard.js';

export default class MatchScreen extends React.Component {
  static navigationOptions = {
    title: 'Matches',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <SwipeCard style={styles.card} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    margin: "auto",
  },
  card: {
    width: 700,
    height: 700,
  }
});

