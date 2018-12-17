import React, { Component } from 'react';
import { Keyboard, View, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImagePicker, Permissions } from 'expo';

import { Avatar, Image } from '../../components/image';
import { Input } from '../../components/form';
import { Text } from '../../components/text';
import styles from './SubmitContent.styles';

export default class SubmitContent extends Component {
    static navigationOptions = {
        headerTitle: 'Create post',
        headerRight: <Button title="Submit" />,
    };

    state = {
        height: 40,
        modalVisible: false,
        upload: '',
    };

    updateSize = height => {
        let newHeight = height < 40 ? 40 : height;
        this.setState({
            height: newHeight,
        });
    };

    toggleModal = visible => {
        this.setState({ modalVisible: visible });
    };

    pickImageFromCameraRoll = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        try {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.cancelled) {
                this.setState({ upload: result.uri, modalVisible: false });
            }
        } catch (e) {
            console.error('Could not get image from camera roll');
        }
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Modal
                        avoidKeyboard
                        onBackdropPress={() => this.toggleModal(false)}
                        onBackButtonPress={() => this.toggleModal(false)}
                        isVisible={this.state.modalVisible}
                    >
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={() => null} style={styles.modalButton}>
                                <Icon size={30} name="camera" style={styles.modalIcon} />
                                <Text>Take photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.pickImageFromCameraRoll}
                                style={styles.modalButton}
                            >
                                <Icon size={30} name="image" style={styles.modalIcon} />
                                <Text>Choose photo from gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <View style={styles.profile}>
                        <Avatar size={65} styles={styles.avatar} src="http://i.pravatar.cc/100" />
                        <Text style={styles.name}>David Martin</Text>
                    </View>
                    <View style={styles.form}>
                        <Input
                            multiline
                            placeholder="What's up?"
                            style={[styles.input, { height: this.state.height }]}
                            onContentSizeChange={e =>
                                this.updateSize(e.nativeEvent.contentSize.height)
                            }
                            maxLength={200}
                        />
                        <TouchableOpacity
                            onPress={() => this.toggleModal(true)}
                            style={styles.touchable}
                        >
                            <Icon name="camera" size={20} style={styles.icon} />
                            <Text style={styles.add}>Add photo</Text>
                        </TouchableOpacity>
                        <View style={styles.images}>
                            {this.state.upload ? (
                                <Image style={styles.upload} source={{ uri: this.state.upload }} />
                            ) : null}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
