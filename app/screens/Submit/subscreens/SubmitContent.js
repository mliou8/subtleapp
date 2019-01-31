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
  Label,
  Text
} from 'native-base';
import SingleInput from 'app/components/form/SingleInput';
import { connect } from 'react-redux';
import { Avatar, Image } from 'app/components/image';
import timeout from 'app/util/timeout';
import styles from './SubmitContent.styles';
import { newGeneralPost } from 'actions/posts/index';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';

export default class SubmitContent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Post',
      headerStyle: { backgroundColor: '#242424', height: 120 },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 20
      },
      headerRight: (
        <Button
          rounded
          style={{ backgroundColor: 'white' }}
          onPress={() => this.uploadPhoto()}
        >
          <Text style={{ color: 'black', fontFamily: 'poppins' }}>POST</Text>
        </Button>
      ),
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" style={{ color: 'white', fontSize: 25 }} />
        </Button>
      )
    };
  };

  constructor() {
    super();
    this.state = {
      height: 250,
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
    let newHeight = height < 250 ? 250 : height;
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
    const author = this.props.userInfo.displayName;
    const currentTime = Date.now();
    const datePosted = moment(currentTime).format('MMMM Do YYYY, h:mm:ss a');
    const textToSend = JSON.stringify(this.state.text)
    console.log("TexttoSend ", textToSend);
    const addPostRef = await db.collection('posts').add({
      photoRef: downloadURL,
      datePosted,
      expiryDate,
      title: this.state.title,
      text: textToSend,
      author,
      location: { city: '', country: '' },
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
        <ScrollView style={{ backgroundColor: 'white' }}>
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
              <SingleInput
                multiline
                placeholder="What's up?"
                style={[styles.input, { height: this.state.height }]}
                onContentSizeChange={e =>
                  this.updateSize(e.nativeEvent.contentSize.height)
                }
                onChangeText={text => this.updateTextInput(text)}
                maxLength={3000}
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

            <Button
              block
              style={{ backgroundColor: 'black' }}
              onPress={() => this.uploadPhoto()}
            >
              <Text
                color="white"
                style={{
                  fontFamily: 'poppinsBold'
                }}
              >
                Submit
              </Text>
            </Button>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
