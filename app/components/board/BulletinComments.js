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
import { deleteComment } from 'db/common/index';

class BulletinComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], total: 0, openForm: false, showForm: false };
    this.renderComments = this.renderComments.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }
  componentDidMount() {
    const postComments = this.props.comments;

    this.setState({
      comments: postComments,
      id: this.props.postId
    });
  }
  removeComment(commentInfo) {
    const newComments = this.state.comments.filter(item => {
      return item !== commentInfo;
    });

    this.setState({ comments: newComments });
    const postId = this.state.id;
    deleteComment(postId, commentInfo);
    this.props.updateComments(newComments);
  }

  renderComments() {
    return this.state.comments.map((item, index) => (
      <Card key={index}>
        <CardItem fullWidth>
          <Left>
            <Avatar size={35} styles={styles.avatar} src={item.avatar} />
            <Text style={{ fontFamily: 'poppins', fontSize: 15 }}>
              {item.author}
            </Text>
          </Left>
          <Right style={{ flexWrap: 'wrap' }}>
            <Text style={{ fontFamily: 'poppins', fontSize: 10 }}>
              {moment(item.date).format('MMMM Do, h:mm a')}
            </Text>
          </Right>
        </CardItem>
        <CardItem>
          <Text style={{ fontFamily: 'poppins', fontSize: 15 }}>
            {item.content}
          </Text>
        </CardItem>
        {item.author === this.props.userInfo.displayName ? (
          <CardItem style={{ justifyContent: 'flex-end' }}>
            <Button
              small
              rounded
              style={{
                backgroundColor: '#242424'
              }}
              onPress={() => this.removeComment(item)}
            >
              <Icon
                style={{ color: 'white', fontSize: 15 }}
                name="remove"
                type="FontAwesome"
              />
            </Button>
          </CardItem>
        ) : null}
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
            <AddCommentForm
              postId={this.state.id}
              navigation={this.props.navigation}
              // updateComments={this.props.updateComments}
              addNewComment={this.props.addNewComment}
            />
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    userInfo: state.login.userInfo
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     newComment: (postData, currUserInfo) => {
//       dispatch(newComment(postData, currUserInfo));
//     }
//   };
// };

export default connect(
  mapStateToProps,
  null
  // mapDispatchToProps
)(BulletinComments);
