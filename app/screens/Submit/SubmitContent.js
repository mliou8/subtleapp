import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ImagePicker } from 'expo';
import { Camera, Permissions } from 'expo';

export default class SubmitContent extends Component {
    static navigationOptions = {
        headerTitle: 'Create post'
    }

    state = {

    };

    componentDidMount() {
    }

    _pickImage = async () => {
        const { rollstatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: rollstatus === 'granted' });
        if (this.state.hasCameraRollPermission) {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
        }
    };

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignContent: 'space-between',
        justifyContent: 'center',
    },
});
