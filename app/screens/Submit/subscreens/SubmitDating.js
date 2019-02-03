import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Dropdown from 'app/components/common/Dropdown';

export default class SubmitDating extends Component {
    static navigationOptions = {
        headerTitle: 'Dating',
    };

    render() {
        return (
            <View style={styles.container}>
              <Text> Dating </Text>
              <Dropdown/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'center',
    },
});
