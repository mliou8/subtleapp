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
                bottom: 17,
                left: 30,
                paddingLeft: 5,
                paddingRight: 5,
                fontFamily: 'poppinsLight',
                fontSize: 18,
                color: 'white',
                backgroundColor: '#505050',
              }}
            >
              {this.props.caption.slice(1, this.props.caption.length - 1)}
            </Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}
