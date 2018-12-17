import React, { Component } from 'react';
import { Keyboard, View, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Avatar } from '../../components/image';
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

    pickImage = () => {};

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Modal
                        avoidKeyboard
                        onBackdropPress={() => this.setState({ modalVisible: false })}
                        onBackButtonPress={() => this.setState({ modalVisible: false })}
                        isVisible={this.state.modalVisible}
                    >
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={() => null} style={styles.modalButton}>
                                <Icon size={30} name="camera" style={styles.modalIcon} />
                                <Text>Take photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => null} style={styles.modalButton}>
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
                            onPress={() => this.setState({ modalVisible: true })}
                            style={styles.touchable}
                        >
                            <Icon name="camera" size={20} style={styles.icon} />
                            <Text style={styles.add}>Add photo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
