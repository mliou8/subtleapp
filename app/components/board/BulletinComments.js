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
import moment from 'moment';
import AddCommentForm from './AddCommentForm';

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
    this.renderComments = this.renderComments.bind(this);
  }

  renderComments() {
    return testComments.map((item, index) => (
      <Card key={index}>
        <CardItem fullWidth>
          <Left>
            <Avatar size={35} styles={styles.avatar} src={item.avatar} />
            <Text style={{ fontFamily: 'poppins', fontSize: 15 }}>
              @{item.author}
            </Text>
          </Left>

          <Right style={{ flexWrap: 'wrap' }}>
            <Text style={{ fontFamily: 'poppins', fontSize: 10 }}>
              {moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          </Right>
        </CardItem>
        <CardItem>
          <Text style={{ fontFamily: 'poppins', fontSize: 15 }}>
            {item.content}
          </Text>
        </CardItem>
      </Card>
    ));
  }

  render() {
    return (
      <ScrollView>
        <View>
          {this.renderComments()}

          <Card>
            {/* <CardItem>
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
            </CardItem> */}
            <AddCommentForm />
          </Card>
        </View>
      </ScrollView>
    );
  }
}
