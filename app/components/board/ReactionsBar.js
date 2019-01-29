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

export default class ReactionsBar extends React.Component {
  constructor(props) {
    super(props);
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
              <CardItem>
                <Button light>
                  <Emoji name="joy" style={{ fontSize: 20 }} />
                  <Text style={{ fontSize: 10, fontFamily: 'poppins' }}>0</Text>
                </Button>
              </CardItem>
              <CardItem>
                <Button light>
                  <Emoji name="heart_eyes" style={{ fontSize: 20 }} />
                  <Text style={{ fontSize: 10, fontFamily: 'poppins' }}>0</Text>
                </Button>
              </CardItem>

              <CardItem>
                <Button light>
                  <Emoji name="sob" style={{ fontSize: 20 }} />
                  <Text style={{ fontSize: 10, fontFamily: 'poppins' }}>0</Text>
                </Button>
              </CardItem>
              <CardItem>
                <Button light>
                  <Emoji name="rage" style={{ fontSize: 20 }} />
                  <Text style={{ fontSize: 10, fontFamily: 'poppins' }}>0</Text>
                </Button>
              </CardItem>
              <CardItem>
                <Button light>
                  <Emoji name="open_mouth" style={{ fontSize: 20 }} />
                  <Text style={{ fontSize: 10, fontFamily: 'poppins' }}>0</Text>
                </Button>
              </CardItem>
              <CardItem>
                <Button light>
                  <Emoji name="fire" style={{ fontSize: 20 }} />
                  <Text style={{ fontSize: 10, fontFamily: 'poppins' }}>0</Text>
                </Button>
              </CardItem>
              <CardItem>
                <Button light>
                  <Emoji name="+1" style={{ fontSize: 20 }} />
                  <Text style={{ fontSize: 10, fontFamily: 'poppins' }}>0</Text>
                </Button>
              </CardItem>
              <CardItem>
                <Button light>
                  <Emoji name="100" style={{ fontSize: 20 }} />
                  <Text style={{ fontSize: 10, fontFamily: 'poppins' }}>0</Text>
                </Button>
              </CardItem>
              <CardItem>
                <Button light>
                  <Emoji name="clap" style={{ fontSize: 20 }} />
                  <Text style={{ fontSize: 10, fontFamily: 'poppins' }}>0</Text>
                </Button>
              </CardItem>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}
