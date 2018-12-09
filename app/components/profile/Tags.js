import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default class Tags extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {
          this.props.tags.map((tag, idx) => {
            return (
              <TouchableOpacity key={idx} style={styles.tagContainer}>
                <Text style={styles.tag}>{`#${tag}`}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagContainer: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#D3D3D3',
    marginRight: 8,
  },
  tag: {
    color: 'blue',
    display: 'flex',
    marginRight: 5,
    fontSize: 10,
  }
})