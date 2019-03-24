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
              {this.props.caption.slice(1, this.props.caption.length - 1)}
            </Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}
// this.removePost = this.removePost.bind(this);
// removePost() {
//   const postId = this.state.id;
//   deletePost(postId);
//   this.props.navigation.navigate('Home');
// }
// {item.author === this.props.userInfo.displayName ? (
//   <CardItem style={{ justifyContent: 'flex-end' }}>
//     <Button
//       small
//       rounded
//       style={{
//         backgroundColor: '#242424'
//       }}
//       onPress={() => this.removeComment(item)}
//     >
//       <Icon
//         style={{ color: 'white', fontSize: 15 }}
//         name="remove"
//         type="FontAwesome"
//       />
//     </Button>
//   </CardItem>
// ) : null}
