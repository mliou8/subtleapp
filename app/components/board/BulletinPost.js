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
  Right
} from 'native-base';
import { Avatar } from '../../components/image';

export default class BulletinPost extends React.Component {
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
            </Left>
            <Body>
              <Text
                style={{ fontSize: 15, color: 'coral', fontFamily: 'poppins' }}
              >
                @postAuthor
              </Text>
            </Body>
            <Right>
              <Button
                rounded
                light
                onPress={() =>
                  console.log('add an on press event to location button')
                }
              >
                <Text style={{ fontFamily: 'poppins' }}>location</Text>
              </Button>
            </Right>
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
            <Text style={{ fontSize: 18, fontFamily: 'poppinsBold' }}>
              title{`\n`}
            </Text>
            <Text style={{ fontSize: 15, fontFamily: 'poppins' }}>
              some quote about the text above
            </Text>
          </CardItem>

          <CardItem footer bordered>
            <Left>
              <Button transparent>
                <Icon
                  style={{ color: 'magenta', fontSize: 25 }}
                  active
                  name="smile-o"
                  type="FontAwesome"
                >
                  <Text style={{ fontSize: 10 }}> 4 </Text>
                </Icon>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon
                  style={{ color: 'magenta', fontSize: 25 }}
                  active
                  name="heart-o"
                  type="FontAwesome"
                >
                  <Text style={{ fontSize: 10 }}> 12 </Text>
                </Icon>
              </Button>
            </Body>
            <Right>
              <Button transparent>
                <Icon
                  style={{ color: 'coral', fontSize: 25 }}
                  active
                  name="comments"
                  type="FontAwesome"
                >
                  <Text style={{ fontSize: 10 }}> 12 </Text>
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
