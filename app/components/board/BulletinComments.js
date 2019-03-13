import React from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
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
  Text
} from 'native-base';
import { Avatar } from '../../components/image';
import { connect } from 'react-redux';
import moment from 'moment';
import AddCommentForm from './AddCommentForm';

import Emoji from 'react-native-emoji';

const testComments = [
  {
    author: 'kristin',
    avatar: 'https://loremflickr.com/176/230/cat',
    date: Date.now(),
    content: 'this is a test'
  },
  {
    author: 'Bailey',
    avatar: 'https://loremflickr.com/176/230/cat',
    date: Date.now(),
    content: 'bad human! my computer!'
  },
  {
    author: 'SadCat',
    avatar: 'https://loremflickr.com/176/230/cat',
    date: Date.now(),
    content: 'life is hard'
  },
  {
    author: 'Berkley',
    avatar: 'https://loremflickr.com/176/230/cat',
    date: Date.now(),
    content: 'i like to bite people '
  }
];

class BulletinComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], total: 0, openForm: false, showForm: false };
    this.renderComments = this.renderComments.bind(this);
  }
  componentDidMount() {
    const postComments = this.props.comments;

    this.setState({
      comments: postComments,
      id: this.props.postId
    });
  }

  renderComments() {
    return this.state.comments.map((item, index) => (
      <Card key={index}>
        <CardItem fullWidth>
          <Left>
            <Avatar size={35} styles={styles.avatar} src={item.avatar} />
            <Text style={{ fontFamily: 'poppins', fontSize: 15 }}>
              @{item.author}
            </Text>
          </Left>

          <Right style={{ flexWrap: 'wrap' }}>
            <Text style={{ fontFamily: 'poppins', fontSize: 10 }}>
              {moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          </Right>
        </CardItem>
        <CardItem>
          <Text style={{ fontFamily: 'poppins', fontSize: 15 }}>
            {item.content}
          </Text>
        </CardItem>
      </Card>
    ));
  }

  render() {
    return (
      <ScrollView>
        <View>
          {this.state.comments ? this.renderComments() : null}
          <Card transparent>
            <CardItem>
              <Left>
                <Avatar small src={this.props.userInfo.photoURL} />
              </Left>
              {this.state.openForm ? (
                <Button
                  style={{ backgroundColor: '#242424' }}
                  rounded
                  onPress={() =>
                    this.setState({ openForm: false, showForm: false })
                  }
                >
                  <Icon
                    style={{ color: 'white', fontSize: 20 }}
                    name="ios-remove"
                    type="Ionicons"
                  />
                </Button>
              ) : (
                <Button
                  style={{ backgroundColor: '#242424' }}
                  onPress={() =>
                    this.setState({ openForm: true, showForm: true })
                  }
                  rounded
                >
                  <Icon
                    style={{ color: 'white', fontSize: 20 }}
                    name="ios-add"
                    type="Ionicons"
                  />
                </Button>
              )}
            </CardItem>
          </Card>
          {this.state.showForm ? (
            <AddCommentForm postId={this.state.id} />
          ) : null}
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
)(BulletinComments);
