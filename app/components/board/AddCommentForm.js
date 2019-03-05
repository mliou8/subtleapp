import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
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
    this.state = { text: '' };
    this.addComment = this.addComment.bind(this);
    this.updateTextInput = this.updateTextInput.bind(this);
  }

  addComment() {}
  updateTextInput(input) {
    this.setState({ text: input });
  }

  render() {
    return (
      <ScrollView>
        <View>
          <KeyboardAvoidingView behavior="padding" enabled>
            <Card>
              <Avatar small src={this.props.userInfo.photoURL} />
              {/* <Form> */}
              {/* <Item
                  style={{
                    borderColor: 'transparent'
                  }}
                  floatingLabel
                > */}
              <Input
                style={{ fontFamily: 'poppins' }}
                onChangeText={text => this.updateTextInput(text)}
                value={this.state.text}
              />
              {/* </Item> */}
              {/* </Form> */}

              <CardItem>
                <Button light>
                  <Icon
                    style={{ color: '#fcc21b', fontSize: 20 }}
                    active
                    name="ios-add"
                    type="Ionicons"
                  />
                </Button>
              </CardItem>
            </Card>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
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
    newComment: (postData, currUserInfo) => {
      dispatch(newComment(postData, currUserInfo));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentForm);
