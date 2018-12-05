import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Row from './Row';

const BioInfo = [
  {label: 'Bio', content: 'This is the bio content its longer form than usual'}
]
export default class Bio extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      {
        BioInfo.map((row, idx) => {
          return (
            <Row key={idx} label={row.label} content={row.content}/>
          )
        })
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  bioTitle: {
    fontSize: 17, 
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
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