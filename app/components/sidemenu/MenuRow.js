import React, { Component } from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    Dimensions,
    View,
} from 'react-native';

import {
    Icon
} from 'native-base';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class MenuRow extends Component {
    render() {
        return (
            <TouchableHighlight
                onPress={() => {
                    this.props.onToggleMenu()
                }}
                >
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <Icon
                            type="FontAwesome"
                            name={this.props.icon}
                            style={styles.icon}
                        />
                    </View>
                    <Text>{this.props.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {

  }
});

