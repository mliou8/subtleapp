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
  Right
} from 'native-base';
import { Avatar } from 'app/components/image';
import ReactionsBar from './ReactionsBar';

export default class FullPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false, showReactions: false };
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
      photoRef: infoPost.photoRef[0],
      userAvatar: infoPost.avatar
    });
  }
  toggleReactions() {
    this.setState({ showReactions: !this.state.showReactions });
  }
  render() {
    console.log('info posts in full post is this ---- -------', this.state);
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
                <Text note style={{ fontFamily: 'poppins' }}>
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
          <CardItem>
            <Body
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <Text style={{ fontSize: 18 }}>{this.state.title}</Text>
            </Body>
          </CardItem>
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

          <CardItem>
            <Body
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              <Text style={{ fontFamily: 'poppins' }}>{this.state.text}</Text>
            </Body>
          </CardItem>
          <CardItem bordered footer>
            <Left>
              <Button light>
                <Icon
                  style={{ fontSize: 20 }}
                  active={true}
                  name="heart-o"
                  type="FontAwesome"
                >
                  <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                    {' '}
                    0{' '}
                  </Text>
                </Icon>
              </Button>
            </Left>
            <Body>
              <Button
                light
                onPress={() =>
                  this.setState({ showReactions: !this.state.showReactions })
                }
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
                    {' '}
                    12{' '}
                  </Text>
                </Icon>
              </Button>
            </Body>
            <Right>
              <Button light>
                <Icon
                  style={{ fontSize: 20 }}
                  active
                  name="commenting"
                  type="FontAwesome"
                >
                  <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                    {' '}
                    12{' '}
                  </Text>
                </Icon>
              </Button>
            </Right>
          </CardItem>
          <CardItem>
            {this.state.showReactions ? <ReactionsBar /> : null}
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
