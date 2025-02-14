import React from 'react';
import { Image, StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { WebBrowser, MailComposer } from 'expo';
import Carousel from 'app/components/common/Carousel';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Footer,
  Right,
  Fab
} from 'native-base';
import { Icon } from 'react-native-elements';
import { Avatar } from 'app/components/image';
import { connect } from 'react-redux';
import { sendReaction } from 'db/common/index';
import { deletePost, reportPost } from 'db/common/index';
import ReactionsBar from './ReactionsBar';
import BulletinComments from './BulletinComments';
import ParsedText from 'react-native-parsed-text';
const PikaSrc = 'assets/images/reactions/pika.png';
const UwuSrc = 'assets/images/reactions/uwu.png';

class BulletinPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      showComments: false,
      like: 0,
      pika: 0,
      uwu: 0,
      author: this.props.postInfo.author,
      authorId: this.props.postInfo.authorId,
      comments: this.props.postInfo.comments,
      title: this.props.postInfo.title,
      text: this.props.postInfo.text,
      datePosted: this.props.postInfo.datePosted,
      topic: this.props.postInfo.topic,
      userAvatar: this.props.postInfo.avatar,
      photoRef: this.props.postInfo.photoRef[0],
      id: this.props.postInfo.id
    };
    this.toggleComments = this.toggleComments.bind(this);
    this.toggleReaction = this.toggleReaction.bind(this);
    this.removePost = this.removePost.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.confirmReport = this.confirmReport.bind(this);
    this.renderText = this.renderText.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
  }

  confirmDelete() {
    Alert.alert(
      'Delete Confirmation',
      'are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.removePost() }
      ],
      { cancelable: false }
    );
  }

  confirmReport() {
    Alert.alert(
      'Report Confirmation',
      'are you sure you want to report this post?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.handleReport() }
      ],
      { cancelable: false }
    );
  }

  removePost() {
    const postId = this.state.id;
    deletePost(postId);
    this.props.navigation.navigate('Home');
  }

  handleReport() {
    const postId = this.state.id;
    reportPost(postId);
    this.props.navigation.navigate('Home');
  }

  updateComments(newComments) {
    this.setState({ comments: newComments, showComments: false });
  }

  viewProfile() {
    const userToDisplay = {
      uid: this.state.authorId,
      displayName: this.state.author,
      photoURL: this.state.userAvatar
    };
    this.props.navigation.navigate('OtherUsersProfile', {
      userToDisplay,
      name: this.state.author
    });
  }
  addNewComment(newComment) {
    const prevComments = this.state.comments;
    const newCommentAdded = [...prevComments, newComment];
    this.setState({ comments: newCommentAdded, showComments: false });
  }

  toggleComments() {
    const prevState = this.state.showComments;
    this.setState({ showComments: !prevState });
  }

  toggleReaction = reaction => {
    const postID = this.state.id;
    this.setState({
      userpika: false,
      useruwu: false,
      userlike: false,
      like: 0,
      pika: 0,
      uwu: 0
    });

    if (!this.state[`user${reaction}`]) {
      if (!this.state[reaction]) {
        this.setState({ [reaction]: 1 });
      } else {
        this.setState({ [reaction]: this.state[reaction] + 1 }, () =>
          sendReaction(postID, reaction)
        );
      }
    } else {
      this.setState({ [reaction]: this.state[reaction] - 1 }, () =>
        sendReaction(postID, reaction)
      );
    }
    this.setState({ [`user${reaction}`]: !this.state[`user${reaction}`] });
  };

  renderText() {
    const formatStr = this.state.text.slice(1, this.state.text.length - 1);
    const splitString = formatStr.split('\\n');
    return splitString.map(function(item, idx) {
      return (
        <Text key={idx}>
          {item}
          {'\n'}
        </Text>
      );
    });
  }

  render() {
    return (
      <View>
        <Card fullWidth style={{ marginLeft: 5, marginRight: 5 }}>
          <CardItem>
            <Left>
              <TouchableOpacity onPress={this.viewProfile}>
                <Avatar
                  size={50}
                  styles={styles.avatar}
                  src={this.state.userAvatar}
                />
              </TouchableOpacity>
              <Body>
                <Text
                  style={{
                    fontFamily: 'poppins',
                    fontSize: 14,
                    fontWeight: 'bold'
                  }}
                >
                  {this.state.author}
                </Text>
              </Body>
            </Left>
            <Button
              small
              rounded
              light
              style={{ position: 'absolute', top: 19, right: 14, height: 33 }}
            >
              <Text style={{ fontFamily: 'poppins', fontSize: 14 }}>
                {this.state.topic}
              </Text>
            </Button>
          </CardItem>
          <CardItem>
            <Left>
              <Text
                style={{
                  fontFamily: 'poppins',
                  fontSize: 20
                }}
              >
                {this.state.title}
              </Text>
            </Left>
          </CardItem>
          {this.state.photoRef ? (
            <CardItem cardBody>
              <Carousel
                entries={this.props.postInfo.photoRef}
                activeSlide={0}
              />
            </CardItem>
          ) : null}
          <CardItem
            style={{
              display: 'flex',
              flex: 1,
              alignContent: 'center'
            }}
          >
            <Left>
              <Text style={{ fontSize: 15, fontFamily: 'poppinsLight' }}>
                {this.renderText()}
              </Text>
            </Left>
          </CardItem>
          <CardItem style={{ justifyContent: 'center' }}>
            <View style={styles.divider} />
          </CardItem>

          <CardItem
            header
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <Button
              light
              onPress={() => this.toggleReaction('pika')}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: 73
              }}
            >
              <Image
                style={{
                  resizeMode: 'contain',
                  width: 35,
                  height: 38,
                  marginLeft: 10
                }}
                source={require(PikaSrc)}
              />
              <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                {this.state.pika}
              </Text>
            </Button>
            <Button
              light
              onPress={() => this.toggleReaction('uwu')}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: 73
              }}
            >
              <Image
                style={{
                  resizeMode: 'contain',
                  width: 30,
                  height: 38,
                  marginLeft: 5
                }}
                source={require(UwuSrc)}
              />
              <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                {this.state.uwu}
              </Text>
            </Button>
            <Button
              light
              onPress={() => this.toggleReaction('like')}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: 73
              }}
            >
              <Icon
                size={22}
                name="heart"
                type="font-awesome"
                color={`${this.state.userlike ? '#f50' : '#D3D3D3'}`}
              />
              <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                {this.state.like}
              </Text>
            </Button>
            <Button
              light
              onPress={this.toggleComments}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: 73
              }}
            >
              <Icon size={22} active name="comment" type="FontAwesome" />
              <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                {this.state.comments.length}
              </Text>
            </Button>
          </CardItem>

          {this.state.showComments ? (
            <CardItem>
              <BulletinComments
                comments={this.state.comments}
                postId={this.state.id}
                navigation={this.props.navigation}
                updateComments={this.updateComments}
                addNewComment={this.addNewComment}
              />
            </CardItem>
          ) : null}
          {this.state.author === this.props.userInfo.displayName ? (
            <CardItem style={{ justifyContent: 'center' }}>
              <Button
                small
                rounded
                style={{
                  backgroundColor: '#242424'
                }}
                onPress={this.confirmDelete}
              >
                <Icon
                  iconStyle={{ marginLeft: 10 }}
                  size={15}
                  name="remove"
                  color="white"
                  type="font-awesome"
                />
                <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>Remove this post</Text>
              </Button>
            </CardItem>
          ) : (
            <CardItem style={{ justifyContent: 'center' }}>
              <Button
                small
                rounded
                style={{
                  backgroundColor: '#242424'
                }}
                onPress={this.confirmReport}
              >
                <Icon
                  iconStyle={{ marginLeft: 10 }}
                  size={15}
                  name="remove"
                  color="white"
                  type="font-awesome"
                />
                <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>Report this post</Text>
              </Button>
            </CardItem>
          )
        }
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    userInfo: state.login.userInfo
  };
};

export default connect(
  mapStateToProps,
  null
)(BulletinPost);

const styles = StyleSheet.create({
  post: {
    display: 'flex',
    width: 174,
    height: 225,
    borderRadius: 7,
    marginBottom: 10
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
