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
import ReactionsBar from './ReactionsBar';

export default class FullPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false, showReactions: false };
  }
  toggleReactions() {
    this.setState({ showReactions: !this.state.showReactions });
  }
  render() {
    return (
      <View>
        <Card fullWidth style={{ marginLeft: 5, marginRight: 5 }}>
          <CardItem cardBody style={{ justifyContent: 'center' }}>
            <Image
              source={{ uri: this.props.imageSrc }}
              style={{
                width: 176,
                height: 230,
                resizeMode: 'contain'
              }}
            />
          </CardItem>
          <CardItem
            style={{
              display: 'flex',
              height: 100,
              width: null,
              flex: 1,
              alignContent: 'center'
            }}
          >
            <Body
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              <Text style={{ fontSize: 15 }}>
                some quote about the text above [...(clickable)]
              </Text>
              <Text style={{ fontSize: 20, color: 'coral' }}>@postAuthor</Text>
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
