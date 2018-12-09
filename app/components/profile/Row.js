import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Row extends React.Component {
  render() {
    return (
      <View>
        <View style={this.props.label !== 'Bio' ? styles.container : styles.bioContainer}>
          <Text style={styles.label}>{this.props.label}</Text>
          <Text style={this.props.label !== 'Bio' ? styles.content: styles.bioContent}>
          {this.props.content}</Text>
          </View>
          <View style={styles.divider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  bioContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
  content: {
    fontSize: 17,
    color: '#696969',
  },
  bioContent: {
    fontSize: 17,
    color: '#696969',
    marginTop: 10,
  }
})