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
import PikaSrc from 'assets/images/reactions/pika.png';
import UwuSrc from 'assets/images/reactions/uwu.png';

export default class BulletinPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      showReactions: false,
      showComments: false,
      comments: 10,
      like: 0
    };
    this.toggleComments = this.toggleComments.bind(this);
    this.toggleReaction = this.toggleReaction.bind(this);
  }

  toggleComments() {
    const prevState = this.state.showComments;
    this.setState({ showComments: !prevState });
  }

  toggleReaction = (reaction) => {
    if (!this.state[`user${reaction}`]) {
      if (!this.state[reaction]) {
        this.setState({[reaction]: 1})
      } else {
        this.setState({[reaction]: this.state[reaction] + 1});
      }
    } else {
      this.setState({[reaction]: this.state[reaction] - 1});
    }
    this.setState({[`user${reaction}`]: !this.state[`user${reaction}`]});
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
              <Button rounded light>
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
          <CardItem header>
            <Button light onPress={() => this.toggleReaction('like')} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: -5}}>
                <Icon
                  style={{ fontSize: 18, marginRight: -5 }}
                  active={true}
                  name={`${this.state.userlike ? 'heart' : 'heart-o'}`}
                  type="FontAwesome"
                />
                <Text style={{ fontSize: 12, fontFamily: 'poppins'}}>{this.state.like}</Text>
            </Button>
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
          {this.state.showReactions ? 
          (<CardItem>
            <ReactionsBar /> 
          </CardItem>) : null}
          {this.state.showComments ?
          (<CardItem>
             <BulletinComments /> 
          </CardItem>) : null}        
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
