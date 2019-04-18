import React from 'react';
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import timeout from '../../util/timeout';
import firebase from 'db/firebase';
import db from 'db/firestore';
import { newGeneralPost } from 'actions/posts/index';
import { StackActions, NavigationActions } from 'react-navigation';
import moment from 'moment';
import { connect } from 'react-redux';

import {
  Thumbnail,
  Text,
  Button,
  Icon,
  Form,
  Item,
  Input,
  Label
} from 'native-base';
import SelfieFeed from './SelfieFeed';

class SelfiesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Selfies',
      headerStyle: {
        backgroundColor: '#242424',
        height: 80,
        shadowColor: 'transparent'
      },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 20
      },
      headerLeftContainerStyle: {
        marginLeft: 10,
        marginTop: 15
      },
      headerRightContainerStyle: {
        marginRight: 10,
        marginTop: 15
      },
      headerRight: (
        <Button transparent onPress={() => navigation.navigate('Messages')}>
          <Icon
            type="Octicons"
            name="mail-read"
            style={{ color: 'white', fontSize: 30, marginRight: 20 }}
          />
        </Button>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      height: 250,
      modalVisible: false,
      uploads: '',
      caption: '',
      downloadURL: ''
    };
    this.uploadImageAsync = this.uploadImageAsync.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.validatePost = this.validatePost.bind(this);
    this.validPost = this.validPost.bind(this);
  }

  validatePost() {
    if (this.state.caption.length > 50) {
      Alert.alert(`Captions must be 50 characters or less`);
      return false;
    }
    if (!this.state.uploads.length) {
      Alert.alert(`Oops! Did you forget to select a photo?`);
      return false;
    }
    return true;
  }

  validPost() {
    if (this.state.caption.length < 5) {
      return false;
    }
    if (!this.state.downloadURL) {
      return false;
    }
    return true;
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
      .ref('images/')
      .child(`${filename}`);
    const snapshot = await ref.put(blob);
    blob.close();
    const downloadURL = await snapshot.ref.getDownloadURL();
    this.setState({ downloadURL: downloadURL });

    console.log('this.state ', this.state);
  }

  toggleModal = visible => {
    this.setState({ modalVisible: visible });
  };

  updateCaptionInput(caption) {
    this.setState({ caption });
  }

  updateSize = height => {
    let newHeight = height < 250 ? 250 : height;
    this.setState({
      height: newHeight
    });
  };

  async submitSelfie() {
    if (this.validatePost()) {
      const expiryDate = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      );
      const author = this.props.userInfo.displayName;
      const currentTime = Date.now();
      const datePosted = moment(currentTime).format('MMMM Do YYYY, h:mm:ss a');
      const textToSend = JSON.stringify(this.state.caption);

      const addPostRef = await db.collection('posts').add({
        photoRef: this.state.downloadURL,
        datePosted,
        expiryDate,
        caption: textToSend,
        author,
        comments: [],
        reactions: {},
        type: 'selfie'
      });
      const newPostID = addPostRef.id;
      const postData = { id: newPostID, datePosted, type: 'selfie' };
      this.addPostToUser(postData);
      this.props.navigation.navigate('Home');
    }
  }

  addPostToUser(postData) {
    const currUserInfo = this.props.userInfo;
    console.log('postData ', postData);
    console.log('currUserInfo ', currUserInfo);
    this.props.newGeneralPost(postData, currUserInfo);
    this.props.navigation.navigate('Selfies');

    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: 'Selfies' })]
    // });

    // this.props.navigation.dispatch(resetAction);
  }

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
            uploads: uri
          };
        });
        this.uploadImageAsync(uri);
      }
    } catch (e) {
      console.error('Could not get image from camera roll', e);
    }
  };

  removeImage = uri => {
    this.setState({ uploads: [], downloadURL: '' });
  };

  render() {
    return (
      <View style={{ backgroundColor: '#242424', flex: 1 }}>
        <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View
            style={{
              height: 150,
              backgroundColor: '#242424',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start'
            }}
          >
            <Thumbnail
              style={{ borderWidth: 3, borderColor: 'white' }}
              large
              source={{ uri: this.props.userInfo.photoURL }}
            />
            <Form>
              <Item
                style={{
                  borderColor: 'transparent',
                  width: 250
                }}
                floatingLabel
              >
                <Label style={{ fontFamily: 'poppins', color: 'white' }}>
                  Appeal yourself
                </Label>
                <Input
                  style={{ fontFamily: 'poppins', color: 'white' }}
                  onChangeText={caption => this.updateCaptionInput(caption)}
                  value={this.state.caption}
                />
                <View />
              </Item>
            </Form>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-around'
          }}
        >
          {!this.state.downloadURL ? (
            <Button
              iconLeft
              style={{ backgroundColor: '#242424' }}
              onPress={this.pickImageFromCameraRoll}
            >
              <Icon name="ios-camera" style={{ color: 'white' }} />
              <Text>Photos</Text>
            </Button>
          ) : (
            <Button
              iconLeft
              style={{ backgroundColor: '#242424' }}
              onPress={this.removeImage}
            >
              <Icon name="md-close-circle-outline" style={{ color: 'red' }} />
              <Text>Photo Uploaded</Text>
            </Button>
          )}
          <Button
            style={{
              width: 200,
              backgroundColor: `${this.validPost() ? '#FF8C00' : '#242424'}`
            }}
            block
            onPress={() => this.submitSelfie()}
          >
            <Text style={{ fontFamily: 'poppins', color: 'white' }}>
              Submit
            </Text>
          </Button>
        </View>
          <SelfieFeed navigation={this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
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
)(SelfiesScreen);
