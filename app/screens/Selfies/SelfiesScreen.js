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

import { newGeneralPost } from 'actions/posts/index';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';
import { connect } from 'react-redux';

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Spinner,
  Form,
  Item,
  Input,
  Label
} from 'native-base';

class SelfiesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Selfies',
      headerStyle: { backgroundColor: '#242424', height: 80 },
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
      title: this.state.title,
      text: textToSend,
      author,
      location: { city: '', country: '' },
      comments: [],
      reactions: { likes: 0, LOLs: 0 },
      type: 'selfie'
    });
    const newPostID = addPostRef.id;
    const postData = { id: newPostID, datePosted, type: 'selfie' };
    this.addPostToUser(postData);
  }

  addPostToUser(postData) {
    const currUserInfo = this.props.userInfo;
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ backgroundColor: '#242424' }}>
          {/* {this.props.userInfo.uid ? ( */}
          <View>
            <View
              style={{
                height: 150,
                backgroundColor: '#242424',
                display: 'flex'
              }}
            >
              <Thumbnail large source={{ uri: this.props.userInfo.photoURL }} />
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
                <Card style={{ padding: 3 }}>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: 'https://loremflickr.com/176/230/cat' }}
                      style={{ height: 300, width: null, flex: 1 }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 16,
                        fontFamily: 'poppins',
                        color: 'white'
                      }}
                    >
                      {' '}
                      testing{' '}
                    </Text>
                  </CardItem>
                </Card>
                <Card style={{ padding: 3 }}>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: 'https://loremflickr.com/176/230/cat' }}
                      style={{ height: 300, width: null, flex: 1 }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 16,
                        fontFamily: 'poppins',
                        color: 'white'
                      }}
                    >
                      {' '}
                      testing title on image 2
                    </Text>
                  </CardItem>
                </Card>
                <Card style={{ padding: 3 }}>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: 'https://loremflickr.com/176/230/cat' }}
                      style={{ height: 300, width: null, flex: 1 }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 16,
                        fontFamily: 'poppins',
                        color: 'white'
                      }}
                    >
                      {' '}
                      testing title on image 3
                    </Text>
                  </CardItem>
                </Card>
              </View>
            </ScrollView>
          </View>
          {/* ) : (
            <Spinner color="blue" />
          )} */}
        </View>
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
)(SelfiesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7.6,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'flex-end',
    width: '100%'
  },
  profile: {
    display: 'flex',
    alignContent: 'flex-start',
    flex: 1
  }
});
