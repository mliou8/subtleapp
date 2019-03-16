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
import { addComment } from 'db/common/index';
import moment from 'moment';

import Emoji from 'react-native-emoji';

class AddCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', openForm: false, showForm: true };
    this.addComment = this.addComment.bind(this);
    this.updateTextInput = this.updateTextInput.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.postId
    });
  }
  addComment() {
    const author = this.props.userInfo.displayName;
    const avatar = this.props.userInfo.photoURL;
    const datePosted = Date.now();
    const content = this.state.text;
    const commentDetails = { author, avatar, datePosted, content };
    const postId = this.state.id;

    addComment(postId, commentDetails);
    this.setState({ text: '', openForm: false, showForm: false });

    // this.props.navigation.navigate('Home');
  }
  updateTextInput(input) {
    this.setState({ text: input });
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
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
              />

              <CardItem style={{ justifyContent: 'center' }}>
                <Button
                  style={{ backgroundColor: '#242424' }}
                  rounded
                  onPress={this.addComment}
                >
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
