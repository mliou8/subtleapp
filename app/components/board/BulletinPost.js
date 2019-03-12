import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
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
  Footer,
  Right,
  Fab
} from 'native-base';
import { Avatar } from 'app/components/image';
import { sendReaction } from 'db/common/index';
import ReactionsBar from './ReactionsBar';
import BulletinComments from './BulletinComments';
const PikaSrc = 'assets/images/reactions/pika.png';
const UwuSrc = 'assets/images/reactions/uwu.png';

export default class BulletinPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      showReactions: false,
      showComments: false,
      comments: 10,
      like: 0,
      pika: 0,
      uwu: 0
    };
    this.toggleComments = this.toggleComments.bind(this);
    this.toggleReaction = this.toggleReaction.bind(this);
  }

  componentDidMount() {
    const infoPost = this.props.postInfo;
    this.setState({
      author: infoPost.author,
      comments: infoPost.comments.length,
      like: infoPost.reactions.likes,
      title: infoPost.title,
      text: infoPost.text,
      datePosted: infoPost.datePosted,
      topic: infoPost.topic,
      userAvatar: infoPost.avatar,
      photoRef: infoPost.photoRef[0]
    });
    console.log('info posts -------', infoPost);
  }

  toggleComments() {
    const prevState = this.state.showComments;
    this.setState({ showComments: !prevState });
  }

  toggleReaction = reaction => {
    const hardCodedPostID = '21432';
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
          sendReaction(hardCodedPostID, reaction)
        );
      }
    } else {
      this.setState({ [reaction]: this.state[reaction] - 1 }, () =>
        sendReaction(hardCodedPostID, reaction)
      );
    }
    this.setState({ [`user${reaction}`]: !this.state[`user${reaction}`] });
  };

  render() {
    return (
      <View>
        <Card fullWidth style={{ marginLeft: 5, marginRight: 5 }}>
          <CardItem>
            <Left>
              <Avatar
                size={50}
                styles={styles.avatar}
                src={this.state.userAvatar}
              />
              <Body>
                <Text style={{ fontFamily: 'poppins' }}>
                  @{this.state.author}
                </Text>
                <Text note style={{ fontFamily: 'poppins', fontSize: 12 }}>
                  {this.state.datePosted}
                </Text>
              </Body>
            </Left>
            <Right>
              <Button rounded light>
                <Text style={{ fontFamily: 'poppins' }}>
                  {this.state.topic}
                </Text>
              </Button>
            </Right>
          </CardItem>

          <CardItem
            style={{
              display: 'flex',
              width: null,
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                fontFamily: 'poppins',
                justifyContent: 'center'
              }}
            >
              {this.state.title}
            </Text>
          </CardItem>
          {this.state.photoRef ? (
            <CardItem cardBody style={{ justifyContent: 'center' }}>
              <Image
                source={{ uri: this.props.postInfo.photoRef[0] }}
                style={{
                  width: 176,
                  height: 230,
                  resizeMode: 'contain'
                }}
              />
            </CardItem>
          ) : null}
          <CardItem
            style={{
              display: 'flex',
              width: null,
              flex: 1,
              alignContent: 'center'
            }}
          >
            <Text style={{ fontSize: 15, fontFamily: 'poppinsLight' }}>
              {this.state.text}
            </Text>
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
                width: 75
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
                {' '}
                {this.state.pika}{' '}
              </Text>
            </Button>
            <Button
              light
              onPress={() => this.toggleReaction('uwu')}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: 75
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
                {' '}
                {this.state.uwu}{' '}
              </Text>
            </Button>
            <Button
              light
              onPress={() => this.toggleReaction('like')}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: 75
              }}
            >
              <Icon
                style={{ fontSize: 18, marginRight: -5 }}
                active={true}
                name={`${this.state.userlike ? 'heart' : 'heart-o'}`}
                type="FontAwesome"
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
                width: 75
              }}
            >
              <Icon
                style={{ fontSize: 18, marginRight: -5 }}
                active
                name="comment"
                type="FontAwesome"
              />
              <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                {' '}
                {this.state.comments}{' '}
              </Text>
            </Button>
          </CardItem>
          {this.state.showReactions ? (
            <CardItem>
              <ReactionsBar />
            </CardItem>
          ) : null}
          {this.state.showComments ? (
            <CardItem>
              <BulletinComments />
            </CardItem>
          ) : null}
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    display: 'flex',
    width: 174,
    height: 225,
    borderRadius: 7,
    marginBottom: 10
  }
});
