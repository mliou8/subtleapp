import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class SubmitDating extends Component {
    static navigationOptions = {
        headerTitle: 'Dating',
    };

    render() {
        return <View style={styles.container} />;
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
