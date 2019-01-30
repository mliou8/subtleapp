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
import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-material-dropdown';
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
import timeout from '../../util/timeout';
import styles from './SubmitContent.styles';
import { newGeneralPost } from 'actions/posts/index';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';

const data = [
  { value: "bulletin" },
  { value: "dating" },
];

class SubmitBase extends Component {
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
      uploads: [],
      postAuthor: {},
      postType: "general"
    };

    this.submitPost.bind(this);
  }

  submitPost() {

  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={styles.container}>
          <Dropdown
            label='Choose Post Type'
            data={data}
            animationDuration={0}
            dropdownOffset={{top:50, left: 0}}
          />
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
)(SubmitBase);
