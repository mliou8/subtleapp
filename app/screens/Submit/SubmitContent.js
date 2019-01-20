import React, { Component } from 'react';
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImagePicker, Permissions } from 'expo';
import {
  Container,
  Header,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label
} from 'native-base';
import { SingleLineInput } from '../../components/form';
import { connect } from 'react-redux';
import { Avatar, Image } from '../../components/image';
import { InputBody } from '../../components/form';
import { Text } from '../../components/text';
import timeout from '../../util/timeout';
import styles from './SubmitContent.styles';
import { newGeneralPost } from 'actions/posts/index';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';

class SubmitContent extends Component {
  static navigationOptions = {
    headerTitle: 'Create post'
  };

  constructor() {
    super();
    this.state = {
      height: 40,
      modalVisible: false,
      uploads: [],
      post: {}
    };
  }

  async uploadPhoto() {
    const uri = this.state.uploads[0];

    this.uploadImageAsync(uri);
  }
  async uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref('test/')
      .child(`${filename}`);

    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    const downloadURL = await snapshot.ref.getDownloadURL();

    this.createPost(downloadURL);
    this.props.navigation.navigate('Home');
  }

  updateSize = height => {
    let newHeight = height < 40 ? 40 : height;
    this.setState({
      height: newHeight
    });
  };

  updateTextInput(text) {
    this.setState({ text });
  }
  updateTitleInput(title) {
    this.setState({ title });
  }

  toggleModal = visible => {
    this.setState({ modalVisible: visible });
  };

  async createPost(downloadURL) {
    const expiryDate = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    );
    const currUserInfo = this.props.userInfo;
    const Author = this.props.userInfo.displayName;
    const currentTime = Date.now();
    const datePosted = moment(currentTime).format('MMMM Do YYYY, h:mm:ss a');

    const addPostRef = await db.collection('posts').add({
      photoRef: downloadURL,
      datePosted,
      expiryDate,
      Title: this.state.title,
      Text: this.state.text,
      Author,
      Location: { city: '', country: '' },
      comments: [],
      reactions: { likes: 0, LOLs: 0 },
      type: 'general'
    });
    const newPostID = addPostRef.id;
    const postData = { id: newPostID, datePosted, type: 'general' };
    this.addPostToUser(postData, currUserInfo);
  }

  addPostToUser(postData) {
    const currUserInfo = this.props.userInfo;
    this.props.newGeneralPost(postData, currUserInfo);
  }

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
            uploads: [...state.uploads, uri]
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
        quality: 0.3,
        allowsEditing: true
      });
      if (!cancelled) {
        this.setState(state => {
          return {
            uploads: [...state.uploads, uri]
          };
        });
      }
    } catch (e) {
      console.error('Could not get image from camera roll', e);
    }
  };

  removeImage = uri => {
    Alert.alert(
      '',
      'Are you sure you want to remove this picture from your post?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            this.setState(state => {
              return {
                uploads: state.uploads.filter(upload => upload !== uri)
              };
            });
          }
        }
      ]
    );
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
              <Text style={styles.name}>
                {this.props.user.displayName || 'You'}
              </Text>
            </View>
            <View style={styles.form}>
              <Form>
                <Item floatingLabel>
                  <Label>Title</Label>
                  <Input
                    onChangeText={text => this.updateTitleInput(text)}
                    value={this.state.title}
                  />
                </Item>
              </Form>
              <InputBody
                multiline
                placeholder="What's up?"
                style={[styles.input, { height: this.state.height }]}
                onContentSizeChange={e =>
                  this.updateSize(e.nativeEvent.contentSize.height)
                }
                maxLength={200}
                onChangeText={text => this.updateTextInput(text)}
                value={this.state.text}
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

            <Button block primary onPress={() => this.uploadPhoto()}>
              <Text color="white" styles={{ fontSize: 40, fontWeight: 'bold' }}>
                Submit
              </Text>
            </Button>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    userInfo: state.login.userInfo,
    profile: state.profile,
    login: state.login
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    newGeneralPost: (postData, currUserInfo) => {
      dispatch(newGeneralPost(postData, currUserInfo));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitContent);
