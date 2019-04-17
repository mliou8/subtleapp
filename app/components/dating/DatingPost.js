import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Button,
  Left,
} from 'native-base';
import { Avatar } from 'app/components/image';
import { sendReaction } from 'db/common/index';
import { Icon } from 'react-native-elements';
import Carousel from 'app/components/common/Carousel';
const UwuSrc = 'assets/images/reactions/uwu.png';
const KissSrc = 'assets/images/reactions/kissface.png';
const FireSrc = 'assets/images/reactions/fire.png';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      like: 0,
      uwu: 0,
      kiss: 0,
      fire: 0,
      userAvatar: this.props.data.avatar,
      author: this.props.data.author,
      authorId: this.props.data.authorId
    };
    this.toggleReaction = this.toggleReaction.bind(this);
    this.renderText = this.renderText.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
  }

  toggleReaction = reaction => {
    const hardCodedPostID = 'ee';
    this.setState({
      userfire: false,
      useruwu: false,
      userkiss: false,
      userlike: false,
      fire: 0,
      uwu: 0,
      kiss: 0,
      like: 0
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

  viewProfile() {
    const userToDisplay = {
      uid: this.state.authorId,
      displayName: this.props.data.author,
      photoURL: this.state.userAvatar
    };
    this.props.navigation.navigate('OtherUsersProfile', {
      userToDisplay,
      name: this.props.data.author
    });
  }

  renderText() {
    const formatStr = this.props.data.text.slice(
      1,
      this.props.data.text.length - 1
    );
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


  calculateTime() {
    const date = Date.now();
    const seconds = (this.props.data.expiryDate - date);
    if (seconds > 0) {
      const days = `${Math.ceil(seconds / (86400000))} days`
      return days;
    } else {
      return false;
    }
  }

  render() {
    const { title = '', location = {}, text = ''} = this.props.data
    if (this.calculateTime()) {
    return (
      <View>
        <Card fullWidth style={{ marginLeft: 5, marginRight: 5 }}>
          <CardItem>
            <Left>
              <Avatar
                size={50}
                styles={styles.avatar}
                src={this.state.userAvatar}
                onPress={this.viewProfile}
              />
              <Text style={{ fontSize: 20, fontFamily: 'poppins' }}>
                {title}
              </Text>
            </Left>
          </CardItem>
          <CardItem
            style={{
              display: 'flex',
              width: null,
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <Carousel
              entries={this.props.data.photoRef}
              activeSlide={0}
            />
            <Button light rounded style={{position: 'absolute', top: 20, left: 18, height: 28, backgroundColor: '#D3D3D3'}}>
              <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>{location ? location : 'Some Location'}</Text>
            </Button>
            <Button
              light
              rounded
              style={{
                position: 'absolute',
                top: 20,
                right: 18,
                height: 28,
                backgroundColor: '#FFD700'
              }}
            >
              <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                {this.calculateTime()}
              </Text>
            </Button>
          </CardItem>
          <CardItem
            style={{
              display: 'flex',
              width: null,
              flex: 1,
              alignContent: 'center'
            }}
          >
            <Text
              numberOfLines={2}
              style={{ fontSize: 15, fontFamily: 'poppinsLight' }}
            >
              {this.renderText()}
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
              onPress={() => this.toggleReaction('fire')}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: 70
              }}
            >
              <Image
                style={{
                  resizeMode: 'contain',
                  width: 35,
                  height: 38,
                  marginLeft: 10
                }}
                source={require(FireSrc)}
              />
              <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                {' '}
                {this.state.fire}{' '}
              </Text>
            </Button>
            <Button
              light
              onPress={() => this.toggleReaction('uwu')}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: 70
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
              onPress={() => this.toggleReaction('kiss')}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: 70
              }}
            >
              <Image
                style={{
                  resizeMode: 'contain',
                  width: 30,
                  height: 38,
                  marginLeft: 5
                }}
                source={require(KissSrc)}
              />
              <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                {' '}
                {this.state.kiss}{' '}
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
          </CardItem>
        </Card>
      </View>
    );
   } else {
     return (
        <View></View>
     )
   }
  }
}

const styles = StyleSheet.create({
  post: {
    display: 'flex',
    width: 174,
    height: 225,
    borderRadius: 7,
    marginBottom: 10
  },
  cardImage: {
    resizeMode: 'cover',
    height: 210,
    width: 170,
    flex: 1
  }
});
