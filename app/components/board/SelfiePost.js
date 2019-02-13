import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Card, CardItem, Text, Button, Icon } from 'native-base';

export default class SelfiePost extends React.Component {
  render() {
    return (
      <View>
        <Card style={{ padding: 3 }}>
          <CardItem cardBody>
            <Image
              source={{ uri: this.props.imageSrc }}
              style={{ height: 300, width: null, flex: 1 }}
            />
            <Text
              style={{
                position: 'absolute',
                bottom: 8,
                left: 16,
                fontFamily: 'poppins',
                color: 'white'
              }}
            >
              {this.props.caption}
            </Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}
