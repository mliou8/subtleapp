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


import {
  MaterialIcons,
} from '@expo/vector-icons';


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
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DatingFullScreen', {post: this.props.data})}
            >
          <Card style={{paddingTop: 0}}>
            <CardItem
              style={styles.post}>
                { this.renderImage() }
                <Text style={styles.title}>{title}</Text>
                <Text numberOfLines={2} style={styles.text}>
                  {text.replace(/"/g,"")}
                </Text>
             </CardItem>
            <CardItem style={styles.actionIcons}>
              <Button light onPress={() => this.toggleReaction('uwu')}  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: 30, height: 25}}>
                <Image
                    style={{ resizeMode:"contain", width: 20, height: 25, marginLeft: 10 }}
                    source={require(UwuSrc)}
                  />
                  <Text style={{ fontSize: 8, fontFamily: 'poppins' }}> {this.state.uwu} </Text>
              </Button>
              <Button light onPress={() => this.toggleReaction('like')} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: 30, height: 25}}>
                  <Icon
                    style={{ fontSize: 18, marginRight: -5 }}
                    active={true}
                    name={`${this.state.userlike ? 'heart' : 'heart-o'}`}
                    type="FontAwesome"
                  />
                  <Text style={{ fontSize: 12, fontFamily: 'poppins'}}>{this.state.like}</Text>
                </Button>
            </CardItem>
          </Card>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    flexDirection: "column",
    width: 170,
    paddingTop: 0,
    height: 280,
  },
  cardImage: {
    resizeMode: 'cover',
    height: 210,
    width: 170,
    flex: 1
  },
  cardItem: {
    display: "flex",
    flexDirection: "column",
  },
  cardText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "left",
  },
  actionIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderStyle: 'solid',
    borderTopWidth: .5,
    borderTopColor: 'lightgrey',
  },
  icon: {
    fontSize: 20,
    color: "black",
    margin: 0,
  },
  title: {
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },
  text: {
    fontSize: 11,
    alignSelf: "flex-start"
  },
  caption: {
    fontSize: 12,
    overflow: "hidden",
    marginBottom: 10,
  }
});
