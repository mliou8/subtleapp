import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';

export default class Followers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      following: this.props.following,
    }  
    this.resetState = this.resetState.bind(this);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Followers</Text>
        <Text>500</Text>
        <Text>Following</Text>
        <Text>400</Text>
        <TouchableOpacity style={styles.tagContainer}>
          {
            if (this.state.following) {
              return (<Button>Follow</Button>)
            } else {
              return (<Button>Message</Button>)
            }
          }
        </TouchableOpacity>
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
  button: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#D3D3D3',
    marginRight: 8,
  },
})