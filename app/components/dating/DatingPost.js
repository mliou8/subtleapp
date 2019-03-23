import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Body,
  Icon,
  Left,
  Right
} from 'native-base';
import { Avatar } from 'app/components/image';
import { sendReaction } from 'db/common/index';
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
      fire: 0
    };
    this.renderImage = this.renderImage.bind(this);
    this.toggleReaction = this.toggleReaction.bind(this);
    this.renderText = this.renderText.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
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
    this.props.navigation.navigate('OtherUsersProfile', {
      userToDisplay: this.props.data.authorId,
      name: this.props.data.author
    });
  }

  renderImage() {
    if (this.props.data.photoRef) {
      return this.props.data.photoRef.map((photo, idx) => {
        if (idx === 1) {
          return (
            <Image key={idx} source={{ uri: photo }} style={styles.cardImage} />
          );
        }
      });
    }
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

  render() {
    const { title = '', location = {}, text = '' } = this.props.data;
    return (
      <View>
        <Card fullWidth style={{ marginLeft: 5, marginRight: 5 }}>
          <CardItem>
            <Left>
              <Avatar
                size={50}
                styles={styles.avatar}
                src={'https://loremflickr.com/176/230/cat'}
                onPress={this.viewProfile}
              />
              <Text style={{ fontSize: 15, fontFamily: 'poppins' }}>
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
            <Image
              source={{ uri: this.props.data.photoRef[0] }}
              style={styles.cardImage}
            />
            <Button
              light
              rounded
              style={{
                position: 'absolute',
                top: 20,
                left: 18,
                height: 28,
                backgroundColor: '#D3D3D3'
              }}
            >
              <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                Seattle, WA
              </Text>
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
                4 days
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
              onPress={() => this.toggleReaction('kiss')}
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
  },
  cardImage: {
    resizeMode: 'cover',
    height: 210,
    width: 170,
    flex: 1
  }
});
