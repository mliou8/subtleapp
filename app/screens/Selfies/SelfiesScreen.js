import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Picker,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert
} from 'react-native';
import Modal from 'react-native-modal';
import { ImagePicker, Permissions } from 'expo';
import timeout from '../../util/timeout';
import firebase from 'db/firebase';
import db from 'db/firestore';
import { newGeneralPost } from 'actions/posts/index';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Content,
  Thumbnail,
  Text,
  Button,
  Icon,
  Form,
  Item,
  Input,
  Label
} from 'native-base';
import SelfiePost from 'app/components/board/SelfiePost';
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
    this.state = { height: 250, modalVisible: false, uploads: [], post: {} };
  }
  async uploadPhoto() {
    const uri = this.state.uploads[0];
    if (this.state.caption.length > 50) {
      Alert.alert(`Captions must be 50 characters or less`);
    }
    if (!this.state.uploads.length) {
      Alert.alert(`Oops! Did you forget to select a photo?`);
    } else {
      this.uploadImageAsync(uri);
    }
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
    blob.close();
    const downloadURL = await snapshot.ref.getDownloadURL();
    this.createPost(downloadURL);
    this.props.navigation.navigate('Home');
    //once we have the selfies fetching from the database,
    //we will change the redirect back to the selfies page
    //it should update and user should see their own photo in the feed
    // this.props.navigation.navigate('Selfies');
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
  async createPost(downloadURL) {
    const expiryDate = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    );
    const currUserInfo = this.props.userInfo;
    const author = this.props.userInfo.displayName;
    const currentTime = Date.now();
    const datePosted = moment(currentTime).format('MMMM Do YYYY, h:mm:ss a');
    const textToSend = JSON.stringify(this.state.caption);

    const addPostRef = await db.collection('posts').add({
      photoRef: downloadURL,
      datePosted,
      expiryDate,
      caption: textToSend,
      author,
      location: { city: '', country: '' },
      comments: [],
      reactions: { likes: 0, LOLs: 0 },
      type: 'selfie'
    });
    const newPostID = addPostRef.id;
    const postData = { id: newPostID, datePosted, type: 'selfie' };
    this.addPostToUser(postData, currUserInfo);
  }

  addPostToUser(postData, currUserInfo) {
    this.props.newGeneralPost(postData, currUserInfo);
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
      <View style={{ backgroundColor: '#242424' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View
            style={{
              height: 150,
              backgroundColor: '#242424',
              display: 'flex'
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
                  borderColor: 'transparent'
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
          <Button
            iconLeft
            style={{ backgroundColor: '#242424' }}
            onPress={this.pickImageFromCameraRoll}
          >
            <Icon name="ios-camera" style={{ color: 'white' }} />
            <Text>Photos</Text>
          </Button>
          <Button
            iconLeft
            style={{ backgroundColor: '#242424' }}
            onPress={() => this.uploadPhoto()}
          >
            <Icon name="plus" type="Feather" style={{ color: 'white' }} />
            <Text style={{ fontFamily: 'poppins', color: 'white' }}>
              Submit
            </Text>
          </Button>
        </View>
        <ScrollView>
          <View>
            <SelfieFeed />
          </View>
        </ScrollView>
      </View>
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
)(SelfiesScreen);
