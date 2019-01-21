import React, { Component } from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class MenuOverlay extends Component {
    render() {
        return (
            <TouchableHighlight
                onPress={() => {
                    this.props.onToggleMenu()
                }}
                style={styles.overlay}>
                <Text></Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position : 'absolute',
    left: 0,
    top: 0,
    width : width,
    height : height,
    paddingTop : 10,
    paddingLeft : 10,
    paddingRight : 10,
    paddingBottom : 10
  },
});

