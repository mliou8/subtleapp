import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Footer,
  Right,
  Textarea,
  Fab,
  Text,
  Form,
  Item,
  Input,
  Label
} from 'native-base';
import { Avatar } from '../../components/image';
import { connect } from 'react-redux';
import moment from 'moment';

import Emoji from 'react-native-emoji';

const testComments = [
  {
    author: 'kristin',
    avatar: 'https://loremflickr.com/176/230/cat',
    date: Date.now(),
    content: 'this is a test'
  }
];

class AddCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', openForm: false, showForm: true };
    this.addComment = this.addComment.bind(this);
    this.updateTextInput = this.updateTextInput.bind(this);
  }

  addComment() {
    const author = this.props.userInfo.displayName;
    const avatar = this.props.userInfo.photoURL;
    const datePosted = Date.now();
    const content = this.state.text;
    const postDetails = { author, avatar, datePosted, content };
    //postID needs to be on here too!
    //pass in as params?
    // this.props.newComment(postDetails,postId);
    //add this function to store.
    //redirect nav to ? post?
  }
  updateTextInput(input) {
    this.setState({ text: input });
    console.log('this state is after updated', this.state);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView>
          <View>
            <Card transparent>
              <Textarea
                style={{ fontFamily: 'poppins' }}
                bordered
                placeholder="...."
              />

              <CardItem style={{ justifyContent: 'center' }}>
                <Button style={{ backgroundColor: '#242424' }} rounded>
                  <Icon
                    style={{ color: 'white', fontSize: 20 }}
                    active
                    name="ios-add"
                    type="Ionicons"
                  >
                    <Text style={{ fontFamily: 'poppins', color: 'white' }}>
                      {' '}
                      send{' '}
                    </Text>
                  </Icon>
                </Button>
              </CardItem>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    newComment: (postData, postId) => {
      dispatch(newComment(postData, PostId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentForm);
