import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'expo';

export default class SubmitScreen extends Component {
    navigate = screen => {
        this.props.navigation.navigate(screen);
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.navigate('SubmitContent')}
                >
                    <Icon.MaterialIcons name={'add-a-photo'} size={55} />
                    <Text>Post Content</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.navigate('SubmitDating')}
                >
                    <Icon.MaterialCommunityIcons name={'account-heart'} size={55} />
                    <Text>Hot Stunna</Text>
                </TouchableOpacity>
            </View>
        );
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
