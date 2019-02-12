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
      postType: "initial",
      topic: "offtopic",
    };

    this.submitPost = this.submitPost.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.setPostType = this.setPostType.bind(this);
    this.setTopic = this.setTopic.bind(this);
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

  renderForm() {
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
    const overlay = <View style={styles.overlay} />;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={styles.container}>
            <SubmitHeader
              setType={this.setPostType}
              setTopic={this.setTopic}
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
