import React from "react";
import { Image, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
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
} from "native-base";
const UwuSrc = 'assets/images/reactions/uwu.png';
const KissSrc = 'assets/images/reactions/kissface.png';
const PikaSrc = 'assets/images/reactions/pika.png';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      like: 0,
      uwu: 0,
    }
    this.renderImage = this.renderImage.bind(this);
    this.toggleReaction = this.toggleReaction.bind(this);
  }

  renderImage () {
    if (this.props.data.photoRef) {
      return this.props.data.photoRef.map((photo, idx) => {
        if (idx === 1) {
        return (
          <Image
            key={idx}
            source={{uri: photo}}
            style={styles.cardImage}
            />
          )
        }
      })
    }
  }

  toggleReaction = (reaction) => {
    console.log("this.props.data ", this.props.data);
    const hardCodedPostID = "ee";
    if (!this.state[`user${reaction}`]) {
      if (!this.state[reaction]) {
        this.setState({[reaction]: 1})
      } else {
        this.setState({[reaction]: this.state[reaction] + 1},
          () => sendReaction(hardCodedPostID, reaction));
      }
    } else {
      this.setState({[reaction]: this.state[reaction] - 1},
        () => sendReaction(hardCodedPostID, reaction));
    }
    this.setState({[`user${reaction}`]: !this.state[`user${reaction}`]});
  }


  render() {
    const { title = '', text = '', expiryDate = ''} = this.props.data;
    const { propStyles = {} } = this.props;
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
          <CardItem header style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button light onPress={() => this.toggleReaction('pika')}  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: 75}}>
              <Image
                  style={{ resizeMode:"contain", width: 35, height: 38, marginLeft: 10 }}
                  source={require(PikaSrc)}
                />
                <Text style={{ fontSize: 12, fontFamily: 'poppins' }}> {this.state.pika} </Text>
            </Button>
            <Button light onPress={() => this.toggleReaction('uwu')}  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: 75}}>
              <Image
                  style={{ resizeMode:"contain", width: 30, height: 38, marginLeft: 5 }}
                  source={require(UwuSrc)}
                />
                <Text style={{ fontSize: 12, fontFamily: 'poppins' }}> {this.state.uwu} </Text>
            </Button>
            <Button light onPress={() => this.toggleReaction('like')} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: 75}}>
                <Icon
                  style={{ fontSize: 18, marginRight: -5 }}
                  active={true}
                  name={`${this.state.userlike ? 'heart' : 'heart-o'}`}
                  type="FontAwesome"
                />
                <Text style={{ fontSize: 12, fontFamily: 'poppins'}}>{this.state.like}</Text>
            </Button>
            <Button light onPress={() => this.toggleReaction('kiss')}  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: 75}}>
              <Image
                  style={{ resizeMode:"contain", width: 30, height: 38, marginLeft: 5 }}
                  source={require(KissSrc)}
                />
                <Text style={{ fontSize: 12, fontFamily: 'poppins' }}> {this.state.uwu} </Text>
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
  }
});
