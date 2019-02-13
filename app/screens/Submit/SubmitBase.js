import React, { Component } from 'react';
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './SubmitBase.styles';
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
import SubmitContent from './subscreens/SubmitContent';
import SubmitDating from './subscreens/SubmitDating';
import SubmitHeader from 'app/components/submit/SubmitHeader';
import { newGeneralPost } from 'actions/posts/index';

export default class SubmitBase extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create a New Post',
      headerStyle: { backgroundColor: 'black', height: 80, borderBottomColor: 'black' },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 20,
      },
    };
  };

  constructor() {
    super();
    this.state = {
      height: 250,
      uploads: [],
      postAuthor: {},
      title: '',
      text: '',
      postType: "initial",
      topic: "offtopic",
      duration: 'infinite',
      modalVisible: "false",
    };

    this.submitPost = this.submitPost.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.setPostType = this.setPostType.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.setTopic = this.setTopic.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.uploadImageAsync = this.uploadImageAsync.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.updateTextInput = this.updateTextInput.bind(this);
    this.updateTitleInput = this.updateTitleInput.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.createPost = this.createPost.bind(this);
    this.addPostToUser = this.addPostToUser.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.pickImageFromCameraRoll = this.pickImageFromCameraRoll.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  submitPost() {
    console.log("This will submit a post");
  }

  setPostType (idx, value) {
    const lowerCase = value.toLowerCase();
    this.setState({ postType: lowerCase });
  }

  setTopic(idx, value) {
    const lowerCase = value.toLowerCase();
    this.setState({ topic: value });
  }

  setDuration(idx, value) {
    if (value === "Disappear in 3 days") {
      this.setState({ duration: 3})
    } else if (value === "Disappear in 5 days") {
      this.setState({ duration: 5})
    } else {
      this.setState({ duration: 7})
    }
  }

  renderForm() {
    if (this.state.postType === "dating") {
      return (
        <SubmitDating
          toggleModal={this.toggleModal}
          modalVisible={this.state.modalVisible}
          takePicture={this.takePicture}
          pickImageFromCameraRoll={this.pickImageFromCameraRoll}
          updateTitleInput={this.updateTitleInput}
          updateSize={this.updateSize}
          text={this.state.text}
          title={this.state.title}
          updateTextInput={this.updateTextInput}
          uploads={this.state.uploads}
          removeImage={this.removeImage}
          uploadPhoto={this.uploadPhoto}
          height={this.state.height}
        />
      )
    } else {
        return (
          <SubmitContent
            toggleModal={this.toggleModal}
            modalVisible={this.state.modalVisible}
            takePicture={this.takePicture}
            pickImageFromCameraRoll={this.pickImageFromCameraRoll}
            updateTitleInput={this.updateTitleInput}
            updateSize={this.updateSize}
            text={this.state.text}
            updateTextInput={this.updateTextInput}
            uploads={this.state.uploads}
            removeImage={this.removeImage}
            uploadPhoto={this.uploadPhoto}
            height={this.state.height}
          />
        )
    }
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
    const overlay = <View style={styles.overlay} />;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={styles.container}>
            <SubmitHeader
              setType={this.setPostType}
              setTopic={this.setTopic}
              setDuration={this.setDuration}
              postType={this.state.postType}
            />
              { /*this.state.postType === "initial" ? overlay : null */ }
              { this.renderForm() }
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
