import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
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

export default class ReactionsBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Card
          fullWidth
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <CardItem>
            <Button transparent>
              <Emoji name="joy" style={{ fontSize: 20 }} />
            </Button>
          </CardItem>
          <CardItem>
            <Button transparent>
              <Emoji name="heart_eyes" style={{ fontSize: 20 }} />
            </Button>
          </CardItem>

          <CardItem>
            <Button transparent>
              <Emoji name="sob" style={{ fontSize: 20 }} />
            </Button>
          </CardItem>
          <CardItem>
            <Button transparent>
              <Emoji name="fire" style={{ fontSize: 20 }} />
            </Button>
          </CardItem>
          <CardItem>
            <Button transparent>
              <Emoji name="+1" style={{ fontSize: 20 }} />
            </Button>
          </CardItem>
          <CardItem>
            <Button transparent>
              <Emoji name="100" style={{ fontSize: 20 }} />
            </Button>
            <Button transparent>
              <Emoji name="clap" style={{ fontSize: 20 }} />
            </Button>
          </CardItem>
        </Card>
      </View>
    );
  }
}
