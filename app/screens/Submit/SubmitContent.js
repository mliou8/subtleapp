import React, { Component } from 'react';
import {
    Keyboard,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Button,
    ScrollView,
    ImageBackground,
    Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImagePicker, Permissions } from 'expo';

import { Avatar, Image } from '../../components/image';
import { Input } from '../../components/form';
import { Text } from '../../components/text';
import timeout from '../../util/timeout';
import styles from './SubmitContent.styles';

export default class SubmitContent extends Component {
    static navigationOptions = {
        headerTitle: 'Create post',
        headerRight: <Button onPress={() => console.log('submit')} title="Submit" />,
    };

    state = {
        height: 40,
        modalVisible: false,
        uploads: [],
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

    takePicture = async () => {
        this.toggleModal(false);
        await timeout(500); // let modal transition complete

        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);

        try {
            let { uri, cancelled } = await ImagePicker.launchCameraAsync();
            if (!cancelled) {
                this.setState(state => {
                    return {
                        ...state,
                        uploads: [...state.uploads, uri],
                    };
                });
            }
        } catch (e) {
            console.error('Could not take picture', e);
        }
    };

    pickImageFromCameraRoll = async () => {
        this.toggleModal(false);
        await timeout(500); // let modal transition complete

        await Permissions.askAsync(Permissions.CAMERA_ROLL);

        try {
            let { uri, cancelled } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });
            if (!cancelled) {
                this.setState(state => {
                    return {
                        uploads: [...state.uploads, uri],
                    };
                });
            }
        } catch (e) {
            console.error('Could not get image from camera roll', e);
        }
    };

    removeImage = uri => {
        Alert.alert('', 'Are you sure you want to remove this picture from your post?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    this.setState(state => {
                        return {
                            uploads: state.uploads.filter(upload => upload !== uri),
                        };
                    });
                },
            },
        ]);
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView>
                    <View style={styles.container}>
                        <Modal
                            avoidKeyboard
                            onBackdropPress={() => this.toggleModal(false)}
                            onBackButtonPress={() => this.toggleModal(false)}
                            isVisible={this.state.modalVisible}
                        >
                            <View style={styles.modalContainer}>
                                <TouchableOpacity
                                    onPress={this.takePicture}
                                    style={styles.modalButton}
                                >
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
                            <Avatar
                                size={65}
                                styles={styles.avatar}
                                src={this.props.user.photoURL || 'http://i.pravatar.cc/100'}
                            />
                            <Text style={styles.name}>{this.props.user.displayName || 'You'}</Text>
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
                                <Text style={styles.add}>
                                    {this.state.uploads.length ? 'Add more photos' : 'Add photos'}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.images}>
                                {this.state.uploads.length
                                    ? this.state.uploads.map(uri => {
                                          return (
                                              <ImageBackground
                                                  key={uri}
                                                  style={styles.upload}
                                                  source={{ uri }}
                                              >
                                                  <TouchableOpacity
                                                      onPress={() => this.removeImage(uri)}
                                                  >
                                                      <Icon
                                                          size={25}
                                                          name="close"
                                                          style={styles.delete}
                                                      />
                                                  </TouchableOpacity>
                                              </ImageBackground>
                                          );
                                      })
                                    : null}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}
