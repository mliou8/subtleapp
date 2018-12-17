import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'expo';

import SubmitDating from './SubmitDating';
import SubmitContent from './SubmitContent';

export default class SubmitScreen extends Component {
    state = {
        display: 'initial',
    };

    resetState = () => {
        this.setState({ display: 'initial' });
    };

    render() {
        const display = this.state.display;
        let view;
        if (display === 'initial') {
            view = (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            this.setState({ display: 'SubmitContent' });
                        }}
                    >
                        <Icon.MaterialIcons name={'add-a-photo'} size={55} />
                        <Text>Post Content</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            this.setState({ display: 'Dating' });
                        }}
                    >
                        <Icon.MaterialCommunityIcons name={'account-heart'} size={55} />
                        <Text>Hot Stunna</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (display === 'SubmitContent') {
            view = <SubmitContent resetState={this.resetState} />;
        } else {
            view = <SubmitDating resetState={this.resetState} />;
        }
        return <View style={styles.container}>{view}</View>;
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
    buttonContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
