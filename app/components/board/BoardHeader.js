import React from 'react';
import {StyleSheet, Text, View, Image, Button, TouchableOpacity} from 'react-native'; 

const filterOptions = {
  new: "new",
  popular: "popular",
  random: "random",
}

export default class BoardHeader extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.navButton}>
            <Text
              style={styles.navText}
              onPress={() => this.props.setFilter(filterOptions.new)}
              >New
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.navButton}>
            <Text
              style={styles.navText}
              onPress={() => this.props.setFilter(filterOptions.popular)}
              >Popular
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.navButton}>
            <Text
              style={styles.navText}
              onPress={() => this.props.setFilter(filterOptions.random)}
              >Random
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'stretch',
    alignContent: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.25,
    marginBottom: 15,
    marginTop: 8,
    paddingLeft: 15,
    paddingRight: 15,
  },
  navButton: {
    display: 'flex',
    borderBottomColor: '#FF689A',
    borderBottomWidth: 4,
  },
  navText: {
    fontSize: 18,
    marginBottom: 6,
    color: 'black',
  }
})