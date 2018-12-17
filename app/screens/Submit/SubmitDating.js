import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class SubmitDating extends React.Component {
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
