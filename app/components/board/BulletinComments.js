import React from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
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
  Fab,
  Text
} from 'native-base';
import { Avatar } from '../../components/image';

import Emoji from 'react-native-emoji';

const testComments = [
  {
    author: 'kristin',
    avatar: 'https://loremflickr.com/176/230/cat',
    date: Date.now(),
    content: 'this is a test'
  }
];

export default class BulletinComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], total: 0 };
  }

  renderComments() {
    return testComments.map((item, index) => (
      <Card key={index}>
        <CardItem>
          <Left>
            <Avatar
              size={30}
              // styles={styles.avatar}
              src={item.avatar}
            />
            <Text> item.author</Text>
          </Left>
          <Right>
            <Text>item.date</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Text>item.content</Text>
        </CardItem>
      </Card>
    ));
  }

  render() {
    return (
      <View>
        <ScrollView horizontal={true} c>
          <View>
            <Card
              fullWidth
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
              }}
              transparent
            >
              {this.renderComments}
              <CardItem>
                <Button light>
                  <Icon
                    style={{ color: '#fcc21b', fontSize: 20 }}
                    active
                    name="commenting"
                    type="FontAwesome"
                  >
                    <Icon
                      style={{ color: '#fcc21b', fontSize: 20 }}
                      active
                      name="ios-add"
                      type="Ionicons"
                    />
                  </Icon>
                </Button>
              </CardItem>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}
