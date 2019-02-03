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


export default class SubmitBase extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Post',
      headerStyle: { backgroundColor: 'black', height: 80 },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 18,
      },
    };
  };

  constructor() {
    super();
    this.state = {
      height: 250,
      uploads: [],
      postAuthor: {},
      postType: "bulletin"
    };

    this.submitPost = this.submitPost.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.setPostType = this.setPostType.bind(this);
  }

  setPostType (idx, value) {
    this.setState({ postType: value })
  }

  submitPost() {

  }

  renderForm () {
    if (this.state.postType === "dating") {
      return (
        <SubmitDating/>
      )
    } else {
      return (
        <SubmitContent/>
      )
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={styles.container}>
            <SubmitHeader
              setType={this.setPostType}
              />
            { this.renderForm() }
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
