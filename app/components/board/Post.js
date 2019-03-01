import React from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
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
  Right,
  Fab
} from 'native-base';
import ReactionsBar from './ReactionsBar';

export default class Post extends React.Component {
  constructor() {
    super();
    this.state = { active: 'false', showReactions: false };
  }
  toggleReactions() {
    this.setState({ showReactions: !this.state.showReactions });
  }
  render() {
    return (
      <View>
        <Card style={styles.post}>
          <CardItem>
            <Left>
              <Thumbnail small source={{ uri: this.props.imageSrc }} />
              <Body>
                <Text note>@PostAuthor</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: this.props.imageSrc }}
              style={{
                display: 'flex',
                height: 120,
                width: 160,
                alignContent: 'center'
              }}
            />
          </CardItem>

          <CardItem>
            <Left>
              <Button small transparent>
                <Icon
                  style={{ fontSize: 15, color: 'black' }}
                  active={true}
                  name="heart-o"
                  type="FontAwesome"
                >
                  <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>0</Text>
                </Icon>
              </Button>
            </Left>
            <Body>
              <Button small transparent>
                <Icon
                  style={{ color: '#fcc21b', fontSize: 15 }}
                  active
                  name="smiley"
                  type="Octicons"
                >
                  <Icon
                    style={{ color: '#fcc21b', fontSize: 15 }}
                    active
                    name="ios-add"
                    type="Ionicons"
                  />
                  <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                    12
                  </Text>
                </Icon>
              </Button>
            </Body>
            <Right>
              <Button small transparent>
                <Icon
                  style={{ fontSize: 15, color: 'black' }}
                  active
                  name="commenting"
                  type="FontAwesome"
                >
                  <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                    12
                  </Text>
                </Icon>
              </Button>
            </Right>
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
