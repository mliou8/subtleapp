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
import { Avatar } from '../../components/image';
import Emoji from 'react-native-emoji';
import ReactionsBar from './ReactionsBar';
import BulletinComments from './BulletinComments';

export default class BulletinPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      showReactions: false,
      showComments: false,
      likes: 0,
      LOLs: 0,
      comments: 10,
      userLiked: false,
      userLOLed: false
    };
    this.toggleComments = this.toggleComments.bind(this);
    this.toggleReactions = this.toggleReactions.bind(this);
    this.incrementLike = this.incrementLike.bind(this);
    this.decrementLike = this.decrementLike.bind(this);
    this.incrementLOL = this.incrementLOL.bind(this);
    this.decrementLOL = this.decrementLOL.bind(this);
  }
  toggleReactions() {
    const prevState = this.state.showReactions;
    this.setState({ showReactions: !prevState });
  }
  toggleComments() {
    const prevState = this.state.showComments;
    this.setState({ showComments: !prevState });
  }
  incrementLike() {
    const prevLikes = this.state.likes++;
    this.setState({ userLiked: true, likes: this.state.likes++ });
  }
  decrementLike() {
    const prevLiked = this.state.likes--;
    this.setState({ userLiked: false, likes: this.state.likes-- });
  }
  incrementLOL() {
    this.setState({ userLOLed: true, LOLs: this.state.LOLs++ });
  }
  decrementLOL() {
    this.setState({ userLOLed: false, LOLs: this.state.LOLs-- });
  }
  render() {
    return (
      <View>
        <Card fullWidth style={{ marginLeft: 5, marginRight: 5 }}>
          <CardItem>
            <Left>
              <Avatar
                size={50}
                styles={styles.avatar}
                src={'https://loremflickr.com/176/230/cat'}
              />
              <Text style={{ fontSize: 15, fontFamily: 'poppins' }}>
                @postAuthor
              </Text>
            </Left>

            <Right>
              <Button rounded light onPress={() => this.toggleReactions()}>
                <Text style={{ fontFamily: 'poppins' }}>location</Text>
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
                fontSize: 15,
                fontFamily: 'poppins',
                justifyContent: 'center'
              }}
            >
              Title: This is where the title of the bulletin post would go
            </Text>
          </CardItem>
          <CardItem
            style={{
              display: 'flex',
              width: null,
              flex: 1,
              alignContent: 'center'
            }}
          >
            <Text style={{ fontSize: 15, fontFamily: 'poppinsLight' }}>
              some text that they'd enter. For people to read. Maybe related to
              the title? I don't know!
            </Text>
          </CardItem>

          <CardItem bordered footer>
            <Left>
              {this.state.userLiked ? (
                <Button light onPress={this.decrementLike}>
                  <Icon
                    style={{ fontSize: 20 }}
                    active={true}
                    name="heart"
                    type="FontAwesome"
                  >
                    <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                      {this.state.likes}
                    </Text>
                  </Icon>
                </Button>
              ) : (
                <Button light onPress={this.incrementLike}>
                  <Icon
                    style={{ fontSize: 20 }}
                    active={true}
                    name="heart-o"
                    type="FontAwesome"
                  >
                    <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                      {this.state.likes}
                    </Text>
                  </Icon>
                </Button>
              )}
            </Left>
            <Body>
              {this.state.userLOLed ? (
                <Button
                  light
                  // onPress={() =>
                  //   this.setState({ showReactions: !this.state.showReactions })
                  // }
                  onPress={this.decrementLOL}
                >
                  <Icon
                    style={{ color: '#fcc21b', fontSize: 25 }}
                    active
                    name="ios-happy"
                    type="Ionicons"
                  >
                    <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                      {this.state.LOLs}
                    </Text>
                  </Icon>
                </Button>
              ) : (
                <Button
                  light
                  // onPress={() =>
                  //   this.setState({ showReactions: !this.state.showReactions })
                  // }
                  onPress={this.incrementLOL}
                >
                  <Icon
                    style={{ color: '#fcc21b', fontSize: 20 }}
                    active
                    name="smiley"
                    type="Octicons"
                  >
                    <Icon
                      style={{ color: '#fcc21b', fontSize: 20 }}
                      active
                      name="ios-add"
                      type="Ionicons"
                    />
                    <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                      {this.state.LOLs}
                    </Text>
                  </Icon>
                </Button>
              )}
            </Body>
            <Right>
              <Button light onPress={this.toggleComments}>
                <Icon
                  style={{ fontSize: 20 }}
                  active
                  name="commenting"
                  type="FontAwesome"
                >
                  <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                    {this.state.comments}
                  </Text>
                </Icon>
              </Button>
            </Right>
          </CardItem>
          <CardItem>
            {this.state.showReactions ? <ReactionsBar /> : null}
          </CardItem>
          <CardItem>
            {this.state.showComments ? <BulletinComments /> : null}
          </CardItem>
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
